#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use aes::Aes128;
use cipher::{block_padding::Pkcs7, BlockModeDecrypt, KeyInit};
use ecb::Decryptor;
use indexmap::IndexMap;
use reqwest::header::{CACHE_CONTROL, PRAGMA};
use std::fs::{self, File};
use std::io::Read;
use std::path::PathBuf;
use std::time::{Duration, SystemTime, UNIX_EPOCH};
use tauri::async_runtime::{Mutex, RwLock};
use tauri::{command, Manager, State};

type Aes128EcbDec = Decryptor<Aes128>;
const FILE_ENCRYPT_KEY: &str = "4Ia&za01tcx8J3rR";
const ZIP_ENCRYPT_KEY: &str = "1VF$+4(>Ey";

pub struct AppState {
    client: reqwest::Client,
    cache: RwLock<IndexMap<String, String>>,
    fetch_lock: Mutex<()>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            client: reqwest::Client::builder()
                .pool_max_idle_per_host(5)
                .timeout(Duration::from_secs(10))
                .build()
                .unwrap_or_default(),
            cache: RwLock::new(IndexMap::new()),
            fetch_lock: Mutex::new(()),
        }
    }

    pub async fn init_cache(&self) {
        if let Some(map) = load_cache_from_file() {
            if !map.is_empty() {
                let mut cache = self.cache.write().await;
                *cache = map;
                return;
            }
        }

        let _lock = self.fetch_lock.lock().await;
        if let Ok(map) = fetch_versions(&self.client).await {
            save_cache_to_file(&map);
            let mut cache = self.cache.write().await;
            *cache = map;
        }
    }
}

fn get_cache_file_path() -> PathBuf {
    let mut path =
        PathBuf::from(std::env::var("LOCALAPPDATA").unwrap_or_else(|_| "C:\\".to_string()));
    path.push("VersionDetector"); // 自动在 Local 下创建的文件夹名
    fs::create_dir_all(&path).unwrap_or_default();
    path.push("versiondetector.json");
    path
}

fn load_cache_from_file() -> Option<IndexMap<String, String>> {
    let path = get_cache_file_path();
    if let Ok(content) = fs::read_to_string(path) {
        if let Ok(map) = serde_json::from_str(&content) {
            return Some(map);
        }
    }
    None
}

fn save_cache_to_file(map: &IndexMap<String, String>) {
    let path = get_cache_file_path();
    if let Ok(json) = serde_json::to_string(map) {
        fs::write(path, json).unwrap_or_default();
    }
}

async fn fetch_versions(client: &reqwest::Client) -> Result<IndexMap<String, String>, String> {
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| format!("ERR_HTTP_REQUEST|{}", e))?
        .as_millis();

    let url = format!(
        "https://version-detector-proxy.caijunlin1994.workers.dev/?t={}",
        timestamp
    );

    let map = client
        .get(&url)
        .header(CACHE_CONTROL, "no-cache, no-store, must-revalidate")
        .header(PRAGMA, "no-cache")
        .send()
        .await
        .map_err(|e| format!("ERR_HTTP_REQUEST|{}", e))?
        .json::<IndexMap<String, String>>()
        .await
        .map_err(|e| format!("ERR_PARSE_JSON|{}", e))?;

    Ok(map)
}

fn clean_result(val: String) -> String {
    let trimmed = val.trim();
    if trimmed.is_empty() || trimmed == "{}" || trimmed == "null" {
        "".to_string()
    } else {
        trimmed.to_string()
    }
}

#[command]
async fn get_version_name(
    version_code: String,
    state: State<'_, AppState>,
) -> Result<String, String> {
    {
        let cache = state.cache.read().await;
        if let Some(name) = cache.get(&version_code) {
            return Ok(clean_result(name.clone()));
        }
    }

    let _lock = state.fetch_lock.lock().await;

    {
        let cache = state.cache.read().await;
        if let Some(name) = cache.get(&version_code) {
            return Ok(clean_result(name.clone()));
        }
    }

    let map = fetch_versions(&state.client).await?;
    save_cache_to_file(&map);

    let name = map.get(&version_code).cloned().unwrap_or_default();
    {
        let mut cache = state.cache.write().await;
        *cache = map;
    }

    Ok(clean_result(name))
}

#[command]
async fn read_ea_file(file_path: String) -> Result<String, String> {
    let mut file = File::open(&file_path).map_err(|e| format!("ERR_OPEN_FILE|{}", e))?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)
        .map_err(|e| format!("ERR_READ_FILE|{}", e))?;

    let cipher = Aes128EcbDec::new_from_slice(FILE_ENCRYPT_KEY.as_bytes())
        .map_err(|e| format!("ERR_INIT_KEY|{}", e))?;

    let decrypted = cipher
        .decrypt_padded_vec::<Pkcs7>(&buffer)
        .map_err(|e| format!("ERR_DECRYPT|{}", e))?;
    let json_str = String::from_utf8(decrypted).map_err(|e| format!("ERR_UTF8|{}", e))?;

    Ok(json_str)
}

#[command]
async fn read_eap_file(file_path: String) -> Result<String, String> {
    let file = File::open(&file_path).map_err(|e| format!("ERR_OPEN_ZIP|{}", e))?;
    let mut archive = zip::ZipArchive::new(file).map_err(|e| format!("ERR_PARSE_ZIP|{}", e))?;

    let mut target_file = archive
        .by_name_decrypt("project", ZIP_ENCRYPT_KEY.as_bytes())
        .map_err(|e| format!("ERR_FIND_PROJECT|{}", e))?;

    let mut buffer = Vec::new();
    target_file
        .read_to_end(&mut buffer)
        .map_err(|e| format!("ERR_READ_PROJECT|{}", e))?;

    let json_str = String::from_utf8(buffer).map_err(|e| format!("ERR_UTF8|{}", e))?;
    Ok(json_str)
}

#[command]
fn show_window(window: tauri::Window) {
    let _ = window.show();
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            app.manage(AppState::new());
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                let state = handle.state::<AppState>();
                state.init_cache().await;
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_version_name,
            read_ea_file,
            read_eap_file,
            show_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
