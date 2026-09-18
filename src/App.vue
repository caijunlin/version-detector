<template>
  <div class="app" :class="{ drag: dragging }" @contextmenu.prevent>
    <div v-if="dragging" class="overlay">
      <div class="hint">
        <div class="icon"></div>
        <span>{{ t('ui.dropHint') }}</span>
      </div>
    </div>

    <div class="head">
      <div class="wrapper">
        <input
            type="text"
            readonly
            v-model="path"
            :placeholder="t('ui.placeholder')"
            class="input"
        />
      </div>
      <button @click="browse" class="btn primary">
        {{ path ? (t('ui.reselectBtn')) : t('ui.selectBtn') }}
      </button>
      <button v-if="data" @click="copy" class="btn secondary">
        {{ copied ? (t('ui.copied')) : (t('ui.copy')) }}
      </button>
    </div>

    <div class="body">
      <div v-if="!path && !loading" class="dropzone" @click="browse">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
        <div class="title">{{ t('ui.dropzoneTitle') }}</div>
        <div class="sub">{{ t('ui.dropzoneSub') }}</div>
      </div>

      <div v-else-if="loading && !data" class="loader">
        <div class="spin"></div>
        <span>{{ t('ui.loading') }}</span>
      </div>

      <div v-else-if="data" class="result">
        <div class="tabs">
          <button
              :class="['tab', { active: view === 'visual' }]"
              @click="view = 'visual'"
          >
            {{ t('ui.visualView') }}
          </button>
          <button
              :class="['tab', { active: view === 'raw' }]"
              @click="view = 'raw'"
          >
            {{ t('ui.rawView') }}
          </button>
        </div>

        <div v-if="view === 'visual'" class="visual">
          <div class="card">
            <div class="item">
              <span class="label">{{ t('fields.brand') }}</span>
              <span class="value focus">{{ data[t('fields.brand')] || '-' }}</span>
            </div>
            <div class="item">
              <span class="label">{{ t('fields.versionName') }}</span>
              <span class="value badge">{{ data[t('fields.versionName')] || '-' }}</span>
            </div>
          </div>

          <div class="grid">
            <div class="detail">
              <div class="title">{{ t('ui.versionCodeTitle') }}</div>
              <div class="row">
                <span>{{ t('fields.mainVersionCode') }}:</span>
                <strong>{{ data[t('fields.mainVersionCode')] }}</strong>
              </div>
              <div class="row">
                <span>{{ t('fields.versionCode') }}:</span>
                <strong>{{ data[t('fields.versionCode')] }}</strong>
              </div>
            </div>

            <div class="detail">
              <div class="title">{{ t('ui.ideRange') }}</div>
              <div class="row">
                <span>{{ t('ui.range') }}:</span>
                <strong>
                  {{ data[t('fields.ideStart')] }} ~ {{ data[t('fields.ideEnd')] }}
                </strong>
              </div>
            </div>

            <div class="detail">
              <div class="title">{{ t('ui.cmsRange') }}</div>
              <div class="row">
                <span>{{ t('ui.range') }}:</span>
                <strong>
                  {{ data[t('fields.cmsStart')] }} ~ {{ data[t('fields.cmsEnd')] }}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="raw">
          <textarea readonly class="area" :value="json"></textarea>
        </div>
      </div>

      <div v-else-if="error" class="panel">
        <textarea readonly class="area error" :value="error"></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {invoke} from '@tauri-apps/api/core';
import {getCurrentWebviewWindow} from '@tauri-apps/api/webviewWindow';
import {message, open} from '@tauri-apps/plugin-dialog';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const path = ref('');
const data = ref<Record<string, any> | null>(null);
const error = ref('');
const loading = ref(false);
const dragging = ref(false);
const copied = ref(false);
const view = ref<'visual' | 'raw'>('visual');

let unlisten: (() => void) | null = null;

const json = computed(() => {
  return data.value ? JSON.stringify(data.value, null, 4) : '';
});

onMounted(async () => {
  try {
    await invoke('show_window');

    const win = getCurrentWebviewWindow();

    unlisten = await win.onDragDropEvent((event) => {
      const {type} = event.payload;
      if (type === 'enter' || type === 'over') {
        dragging.value = true;
      } else if (type === 'leave') {
        dragging.value = false;
      } else if (type === 'drop') {
        dragging.value = false;
        const paths = event.payload.paths;
        if (paths?.length) {
          drop(paths[0]);
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});

onUnmounted(() => {
  if (unlisten) unlisten();
});

const drop = async (file: string) => {
  const lower = file.toLowerCase();
  if (lower.endsWith('.ea') || lower.endsWith('.eap')) {
    await process(file);
  } else {
    await message(
        t('errors.invalidFileExt') || '请拖入 .ea 或 .eap 格式的文件',
        {title: t('ui.readFailTitle') || '文件格式不匹配', kind: 'warning'}
    );
  }
};

const version = async (code?: number | string): Promise<string> => {
  if (code == null) return '';
  return invoke<string>('get_version_name', {versionCode: String(code)})
      .catch(() => '');
};

const process = async (file: string) => {
  path.value = file;
  loading.value = true;
  error.value = '';

  try {
    const cmd = file.toLowerCase().endsWith('.ea') ? 'read_ea_file' : 'read_eap_file';
    const raw = await invoke<string>(cmd, {filePath: file});

    const obj = JSON.parse(raw);
    const code = obj.versionCode ?? 1;
    const name = await version(code);

    data.value = {
      [t('fields.brand')]: obj.brand ?? '',
      [t('fields.mainVersionCode')]: obj.mainVersionCode ?? 1,
      [t('fields.versionCode')]: code,
      [t('fields.versionName')]: name,
      [t('fields.ideStart')]: obj.ideCompatibleStartCode ?? 1,
      [t('fields.ideEnd')]: obj.ideCompatibleEndCode ?? 1,
      [t('fields.cmsStart')]: obj.cmsCompatibleStartCode ?? 1,
      [t('fields.cmsEnd')]: obj.cmsCompatibleEndCode ?? 1,
    };
  } catch (err) {
    data.value = null;
    const str = String(err);
    const [code, msg = ''] = str.includes('|') ? str.split('|') : ['UNKNOWN', str];
    const text = t(`errors.${code}`, {msg});

    error.value = `${t('errors.jsonParseFail') || '解析失败'}\n\n${text.includes('errors.') ? str : text}`;
  } finally {
    loading.value = false;
  }
};

const browse = async () => {
  try {
    const file = await open({
      multiple: false,
      filters: [{name: 'Detector', extensions: ['ea', 'eap']}]
    });

    if (typeof file === 'string') {
      await process(file);
    }
  } catch (err) {
    console.error(err);
  }
};

const copy = async () => {
  if (!json.value) return;
  await navigator.clipboard.writeText(json.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<style>
html, body {
  margin: 0 !important;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

<style scoped>
:host, .app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  user-select: none;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  padding: 16px;
  background-color: #f4f6f8;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 10px;
  background-color: rgba(24, 144, 255, 0.12);
  border: 2px dashed #1890ff;
  border-radius: 12px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  pointer-events: none;
}

.hint {
  text-align: center;
  color: #1890ff;
  font-weight: 600;
  font-size: 18px;
}

.overlay .icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.head {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 13px;
  color: #333;
  outline: none;
}

.btn {
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn.primary {
  background-color: #1890ff;
  color: white;
}

.btn.primary:hover {
  background-color: #40a9ff;
}

.btn.secondary {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.btn.secondary:hover {
  background-color: #bae7ff;
}

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.dropzone {
  flex: 1;
  border: 2px dashed #d9d9d9;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropzone:hover {
  border-color: #1890ff;
  background-color: #e6f7ff33;
}

.dropzone .icon {
  width: 44px;
  height: 44px;
  color: #1890ff;
  margin-bottom: 12px;
  transition: transform 0.2s ease, color 0.2s ease;
}

.dropzone .title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.dropzone .sub {
  font-size: 12px;
  color: #888;
}

.loader {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  gap: 12px;
}

.spin {
  width: 28px;
  height: 28px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.result {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.tab {
  padding: 6px 14px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.tab.active {
  background-color: #fff;
  color: #1890ff;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.visual {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

.card {
  background: linear-gradient(135deg, #1890ff, #096dd9);
  color: white;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item .label {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 4px;
}

.item .value.focus {
  font-size: 20px;
  font-weight: bold;
}

.badge {
  font-size: 18px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.detail {
  background-color: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #e8e8e8;
}

.detail .title {
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 4px;
}

.row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-top: 6px;
  color: #666;
}

.raw, .panel {
  flex: 1;
  display: flex;
  min-height: 0;
}

.area {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.5;
  resize: none;
  background-color: #1e1e1e;
  color: #d4d4d4;
  outline: none;
  box-sizing: border-box;
}

.area.error {
  background-color: #fff1f0;
  border-color: #ffa39e;
  color: #cf1322;
}
</style>