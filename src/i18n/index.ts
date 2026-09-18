import {createI18n} from 'vue-i18n';

const messages = {
    'zh-CN': {
        ui: {
            placeholder: '请选择 .ea 或 .eap 目标文件',
            dropHint: '释放文件以读取',
            selectBtn: '浏览文件...',
            reselectBtn: '重新选择',
            copy: '复制结果',
            copied: '已复制',
            resultPlaceholder: '文件解析结果将显示于此...',
            loading: '正在读取并解析文件，请稍候...',
            readFailTitle: '文件读取失败',
            dropzoneTitle: '点击或拖拽 .ea / .eap 文件到此处',
            dropzoneSub: '自动读取解析版本及兼容性配置',
            visualView: '结构化视图',
            rawView: '原始数据',
            versionCodeTitle: '版本代码',
            ideRange: 'IDE 兼容范围',
            cmsRange: 'CMS 兼容范围',
            range: '起始 - 结束'
        },
        fields: {
            brand: '标识',
            mainVersionCode: 'IDE 主版本号',
            versionCode: 'IDE 版本号',
            versionName: 'IDE 版本名称',
            ideStart: 'IDE 兼容起始版本',
            ideEnd: 'IDE 兼容结束版本',
            cmsStart: 'CMS 兼容起始版本',
            cmsEnd: 'CMS 兼容结束版本'
        },
        errors: {
            invalidFileExt: '请拖入 .ea 或 .eap 格式的文件',
            jsonParseFail: 'JSON 解析失败：文件内容格式不合法。',
            errorInfo: '错误详情:',
            rawText: '原始内容:',
            ERR_HTTP_REQUEST: '请求失败: {msg}',
            ERR_PARSE_JSON: '解析 JSON 失败: {msg}',
            ERR_OPEN_FILE: '无法打开文件: {msg}',
            ERR_READ_FILE: '读取文件内容失败: {msg}',
            ERR_INIT_KEY: '解密密钥初始化失败: {msg}',
            ERR_DECRYPT: '数据解密失败: {msg}',
            ERR_UTF8: '无效的 UTF-8 编码: {msg}',
            ERR_OPEN_ZIP: '无法打开压缩包: {msg}',
            ERR_PARSE_ZIP: '解析 ZIP 文件异常: {msg}',
            ERR_FIND_PROJECT: '未找到目标工程文件: {msg}',
            ERR_READ_PROJECT: '读取工程文件内容失败: {msg}'
        }
    },
    'zh-TW': {
        ui: {
            placeholder: '請選擇 .ea 或 .eap 目標檔案',
            dropHint: '釋放檔案以讀取',
            selectBtn: '瀏覽檔案...',
            reselectBtn: '重新選擇',
            copy: '複製結果',
            copied: '已複製',
            resultPlaceholder: '檔案解析結果將顯示於此...',
            loading: '正在讀取並解析檔案，請稍候...',
            readFailTitle: '檔案讀取失敗',
            dropzoneTitle: '點擊或拖曳 .ea / .eap 檔案到此處',
            dropzoneSub: '自動讀取解析版本及相容性配置',
            visualView: '結構化檢視',
            rawView: '原始資料',
            versionCodeTitle: '版本代碼',
            ideRange: 'IDE 相容範圍',
            cmsRange: 'CMS 相容範圍',
            range: '起始 - 結束'
        },
        fields: {
            brand: '識別',
            mainVersionCode: 'IDE 主版本號',
            versionCode: 'IDE 版本號',
            versionName: 'IDE 版本名稱',
            ideStart: 'IDE 相容起始版本',
            ideEnd: 'IDE 相容結束版本',
            cmsStart: 'CMS 相容起始版本',
            cmsEnd: 'CMS 相容結束版本'
        },
        errors: {
            invalidFileExt: '請拖入 .ea 或 .eap 格式的檔案',
            jsonParseFail: 'JSON 解析失敗：檔案內容格式不合法。',
            errorInfo: '錯誤詳情:',
            rawText: '原始內容:',
            ERR_HTTP_REQUEST: '請求失敗: {msg}',
            ERR_PARSE_JSON: '解析 JSON 失敗: {msg}',
            ERR_OPEN_FILE: '無法開啟檔案: {msg}',
            ERR_READ_FILE: '讀取檔案內容失敗: {msg}',
            ERR_INIT_KEY: '解密金鑰初始化失敗: {msg}',
            ERR_DECRYPT: '資料解密失敗: {msg}',
            ERR_UTF8: '無效的 UTF-8 編碼: {msg}',
            ERR_OPEN_ZIP: '無法開啟壓縮檔: {msg}',
            ERR_PARSE_ZIP: '解析 ZIP 檔案異常: {msg}',
            ERR_FIND_PROJECT: '未找到目標專案檔案: {msg}',
            ERR_READ_PROJECT: '讀取專案檔案內容失敗: {msg}'
        }
    },
    'en': {
        ui: {
            placeholder: 'Select a target .ea or .eap file',
            dropHint: 'Drop file here to read',
            selectBtn: 'Browse...',
            reselectBtn: 'Reselect',
            copy: 'Copy Result',
            copied: 'Copied',
            resultPlaceholder: 'File parsing results will be displayed here...',
            loading: 'Reading and parsing file, please wait...',
            readFailTitle: 'File Read Error',
            dropzoneTitle: 'Click or drag .ea / .eap files here',
            dropzoneSub: 'Automatically read and parse version & compatibility configs',
            visualView: 'Visual View',
            rawView: 'Raw Data',
            versionCodeTitle: 'Version Code',
            ideRange: 'IDE Compatibility',
            cmsRange: 'CMS Compatibility',
            range: 'Start - End'
        },
        fields: {
            brand: 'Identifier',
            mainVersionCode: 'IDE Main Version Code',
            versionCode: 'IDE Version Code',
            versionName: 'IDE Version Name',
            ideStart: 'IDE Compatible Start Code',
            ideEnd: 'IDE Compatible End Code',
            cmsStart: 'CMS Compatible Start Code',
            cmsEnd: 'CMS Compatible End Code'
        },
        errors: {
            invalidFileExt: 'Please drop a .ea or .eap file',
            jsonParseFail: 'JSON parsing failed: Invalid file content format.',
            errorInfo: 'Error Details:',
            rawText: 'Raw Content:',
            ERR_HTTP_REQUEST: 'Request failed: {msg}',
            ERR_PARSE_JSON: 'Failed to parse JSON: {msg}',
            ERR_OPEN_FILE: 'Unable to open file: {msg}',
            ERR_READ_FILE: 'Failed to read file content: {msg}',
            ERR_INIT_KEY: 'Decryption key initialization failed: {msg}',
            ERR_DECRYPT: 'Data decryption failed: {msg}',
            ERR_UTF8: 'Invalid UTF-8 encoding: {msg}',
            ERR_OPEN_ZIP: 'Unable to open ZIP archive: {msg}',
            ERR_PARSE_ZIP: 'ZIP parsing error: {msg}',
            ERR_FIND_PROJECT: 'Target project file not found: {msg}',
            ERR_READ_PROJECT: 'Failed to read project file content: {msg}'
        }
    },
    'ja': {
        ui: {
            placeholder: '.ea または .eap ファイルを選択してください',
            dropHint: 'ファイルをドロップして読み込み',
            selectBtn: '参照...',
            reselectBtn: '再選択',
            copy: '結果をコピー',
            copied: 'コピーしました',
            resultPlaceholder: '解析結果がここに表示されます...',
            loading: 'ファイルを読み込み・解析中、少々お待ちください...',
            readFailTitle: 'ファイル読み込み失敗',
            dropzoneTitle: 'ここに .ea / .eap ファイルをクリックまたはドラッグ',
            dropzoneSub: 'バージョンと互換性設定を自動で読み込み・解析します',
            visualView: '構造化ビュー',
            rawView: '生データ',
            versionCodeTitle: 'バージョンコード',
            ideRange: 'IDE 互換範囲',
            cmsRange: 'CMS 互換範囲',
            range: '開始 - 終了'
        },
        fields: {
            brand: '識別子',
            mainVersionCode: 'IDE メインバージョンコード',
            versionCode: 'IDE バージョンコード',
            versionName: 'IDE バージョン名',
            ideStart: 'IDE 互換開始バージョン',
            ideEnd: 'IDE 互換終了バージョン',
            cmsStart: 'CMS 互換開始バージョン',
            cmsEnd: 'CMS 互換終了バージョン'
        },
        errors: {
            invalidFileExt: '.ea または .eap 形式のファイルをドロップしてください',
            jsonParseFail: 'JSON 解析失敗：ファイル内容の形式が無効です。',
            errorInfo: 'エラー詳細:',
            rawText: '元のコンテンツ:',
            ERR_HTTP_REQUEST: 'リクエスト失敗: {msg}',
            ERR_PARSE_JSON: 'JSON 解析失敗: {msg}',
            ERR_OPEN_FILE: 'ファイルを開けません: {msg}',
            ERR_READ_FILE: 'ファイルの読み込み失敗: {msg}',
            ERR_INIT_KEY: '暗号解読キーの初期化失敗: {msg}',
            ERR_DECRYPT: 'データ復号失敗: {msg}',
            ERR_UTF8: '無効な UTF-8 エンコーディング: {msg}',
            ERR_OPEN_ZIP: 'ZIP アーカイブを開けません: {msg}',
            ERR_PARSE_ZIP: 'ZIP 解析エラー: {msg}',
            ERR_FIND_PROJECT: '対象プロジェクトファイルが見つかりません: {msg}',
            ERR_READ_PROJECT: 'プロジェクトファイルの読み込み失敗: {msg}'
        }
    },
    'ko': {
        ui: {
            placeholder: '.ea 또는 .eap 대상 파일을 선택하세요',
            dropHint: '파일을 여기에 놓아 읽기',
            selectBtn: '찾아보기...',
            reselectBtn: '다시 선택',
            copy: '결과 복사',
            copied: '복사됨',
            resultPlaceholder: '파일 파싱 결과가 여기에 표시됩니다...',
            loading: '파일을 읽고 파싱하는 중입니다. 잠시만 기다려 주세요...',
            readFailTitle: '파일 읽기 실패',
            dropzoneTitle: '여기를 클릭하거나 .ea / .eap 파일을 드래그하세요',
            dropzoneSub: '버전 및 호환성 구성을 자동으로 읽고 파싱합니다',
            visualView: '구조화된 뷰',
            rawView: '원시 데이터',
            versionCodeTitle: '버전 코드',
            ideRange: 'IDE 호환 범위',
            cmsRange: 'CMS 호환 범위',
            range: '시작 - 종료'
        },
        fields: {
            brand: '식별자',
            mainVersionCode: 'IDE 주 버전 코드',
            versionCode: 'IDE 버전 코드',
            versionName: 'IDE 버전 이름',
            ideStart: 'IDE 호환 시작 버전',
            ideEnd: 'IDE 호환 종료 버전',
            cmsStart: 'CMS 호환 시작 버전',
            cmsEnd: 'CMS 호환 종료 버전'
        },
        errors: {
            invalidFileExt: '.ea 또는 .eap 형식의 파일을 드롭하세요',
            jsonParseFail: 'JSON 파싱 실패: 파일 내용 형식이 올바르지 않습니다.',
            errorInfo: '오류 상세 정보:',
            rawText: '원본 내용:',
            ERR_HTTP_REQUEST: '요청 실패: {msg}',
            ERR_PARSE_JSON: 'JSON 파싱 실패: {msg}',
            ERR_OPEN_FILE: '파일을 열 수 없습니다: {msg}',
            ERR_READ_FILE: '파일 내용 읽기 실패: {msg}',
            ERR_INIT_KEY: '복호화 키 초기화 실패: {msg}',
            ERR_DECRYPT: '데이터 복호화 실패: {msg}',
            ERR_UTF8: '유효하지 않은 UTF-8 인코딩: {msg}',
            ERR_OPEN_ZIP: 'ZIP 압축 파일을 열 수 없습니다: {msg}',
            ERR_PARSE_ZIP: 'ZIP 파일 파싱 예외: {msg}',
            ERR_FIND_PROJECT: '대상 프로젝트 파일을 찾을 수 없습니다: {msg}',
            ERR_READ_PROJECT: '프로젝트 파일 내용 읽기 실패: {msg}'
        }
    },
    'de': {
        ui: {
            placeholder: 'Bitte wählen Sie eine .ea- oder .eap-Zieldatei aus',
            dropHint: 'Datei zum Lesen hier ablegen',
            selectBtn: 'Durchsuchen...',
            reselectBtn: 'Neu auswählen',
            copy: 'Ergebnis kopieren',
            copied: 'Kopiert',
            resultPlaceholder: 'Datei-Analyseergebnisse werden hier angezeigt...',
            loading: 'Datei wird gelesen und analysiert, bitte warten...',
            readFailTitle: 'Fehler beim Lesen der Datei',
            dropzoneTitle: 'Klicken oder ziehen Sie .ea / .eap Dateien hierher',
            dropzoneSub: 'Liest und analysiert automatisch Version und Kompatibilitätskonfigurationen',
            visualView: 'Strukturansicht',
            rawView: 'Rohdaten',
            versionCodeTitle: 'Versionscode',
            ideRange: 'IDE-Kompatibilität',
            cmsRange: 'CMS-Kompatibilität',
            range: 'Start - Ende'
        },
        fields: {
            brand: 'Kennung',
            mainVersionCode: 'IDE-Hauptversionscode',
            versionCode: 'IDE-Versionscode',
            versionName: 'IDE-Versionsname',
            ideStart: 'IDE-kompatibler Startcode',
            ideEnd: 'IDE-kompatibler Endcode',
            cmsStart: 'CMS-kompatibler Startcode',
            cmsEnd: 'CMS-kompatibler Endcode'
        },
        errors: {
            invalidFileExt: 'Bitte ziehen Sie eine .ea- oder .eap-Datei hierher',
            jsonParseFail: 'JSON-Parsing fehlgeschlagen: Ungültiges Dateiformat.',
            errorInfo: 'Fehlerdetails:',
            rawText: 'Rohinhalt:',
            ERR_HTTP_REQUEST: 'Anfrage fehlgeschlagen: {msg}',
            ERR_PARSE_JSON: 'Fehler beim Parsen von JSON: {msg}',
            ERR_OPEN_FILE: 'Datei kann nicht geöffnet werden: {msg}',
            ERR_READ_FILE: 'Fehler beim Lesen des Dateiinhalts: {msg}',
            ERR_INIT_KEY: 'Entschlüsselungsschlüssel konnte nicht initialisiert werden: {msg}',
            ERR_DECRYPT: 'Datenentschlüsselung fehlgeschlagen: {msg}',
            ERR_UTF8: 'Ungültige UTF-8-Kodierung: {msg}',
            ERR_OPEN_ZIP: 'ZIP-Archiv kann nicht geöffnet werden: {msg}',
            ERR_PARSE_ZIP: 'Fehler beim Parsen der ZIP-Datei: {msg}',
            ERR_FIND_PROJECT: 'Zielprojektdatei nicht gefunden: {msg}',
            ERR_READ_PROJECT: 'Fehler beim Lesen des Projektdateiinhalts: {msg}'
        }
    },
    'fr': {
        ui: {
            placeholder: 'Veuillez sélectionner un fichier cible .ea ou .eap',
            dropHint: 'Déposez le fichier ici pour le lire',
            selectBtn: 'Parcourir...',
            reselectBtn: 'Resélectionner',
            copy: 'Copier le résultat',
            copied: 'Copié',
            resultPlaceholder: 'Les résultats de l\'analyse s\'afficheront ici...',
            loading: 'Lecture et analyse du fichier en cours, veuillez patienter...',
            readFailTitle: 'Échec de la lecture du fichier',
            dropzoneTitle: 'Cliquez ou glissez les fichiers .ea / .eap ici',
            dropzoneSub: 'Lit et analyse automatiquement la version et les configurations de compatibilité',
            visualView: 'Vue structurée',
            rawView: 'Données brutes',
            versionCodeTitle: 'Code de version',
            ideRange: 'Compatibilité IDE',
            cmsRange: 'Compatibilité CMS',
            range: 'Début - Fin'
        },
        fields: {
            brand: 'Identifiant',
            mainVersionCode: 'Code de version principale de l\'IDE',
            versionCode: 'Code de version de l\'IDE',
            versionName: 'Nom de version de l\'IDE',
            ideStart: 'Code de début compatible IDE',
            ideEnd: 'Code de fin compatible IDE',
            cmsStart: 'Code de début compatible CMS',
            cmsEnd: 'Code de fin compatible CMS'
        },
        errors: {
            invalidFileExt: 'Veuillez déposer un fichier .ea ou .eap',
            jsonParseFail: 'Échec de l\'analyse JSON : Format de fichier invalide.',
            errorInfo: 'Détails de l\'erreur :',
            rawText: 'Contenu brut :',
            ERR_HTTP_REQUEST: 'Échec de la requête : {msg}',
            ERR_PARSE_JSON: 'Échec de l\'analyse JSON : {msg}',
            ERR_OPEN_FILE: 'Impossible d\'ouvrir le fichier : {msg}',
            ERR_READ_FILE: 'Échec de la lecture du contenu du fichier : {msg}',
            ERR_INIT_KEY: 'Échec de l\'initialisation de la clé de déchiffrement : {msg}',
            ERR_DECRYPT: 'Échec du déchiffrement des données : {msg}',
            ERR_UTF8: 'Encodage UTF-8 invalide : {msg}',
            ERR_OPEN_ZIP: 'Impossible d\'ouvrir l\'archive ZIP : {msg}',
            ERR_PARSE_ZIP: 'Erreur d\'analyse du fichier ZIP : {msg}',
            ERR_FIND_PROJECT: 'Fichier de projet cible non trouvé : {msg}',
            ERR_READ_PROJECT: 'Échec de la lecture du contenu du fichier de projet : {msg}'
        }
    },
    'es': {
        ui: {
            placeholder: 'Seleccione un archivo de destino .ea o .eap',
            dropHint: 'Suelte el archivo aquí para leerlo',
            selectBtn: 'Examinar...',
            reselectBtn: 'Volver a seleccionar',
            copy: 'Copiar resultado',
            copied: 'Copiado',
            resultPlaceholder: 'Los resultados del análisis se mostrarán aquí...',
            loading: 'Leyendo y analizando archivo, por favor espere...',
            readFailTitle: 'Error al leer el archivo',
            dropzoneTitle: 'Haga clic o arrastre archivos .ea / .eap aquí',
            dropzoneSub: 'Lee y analiza automáticamente la versión y las configuraciones de compatibilidad',
            visualView: 'Vista estructurada',
            rawView: 'Datos sin procesar',
            versionCodeTitle: 'Código de versión',
            ideRange: 'Compatibilidad IDE',
            cmsRange: 'Compatibilidad CMS',
            range: 'Inicio - Fin'
        },
        fields: {
            brand: 'Identificador',
            mainVersionCode: 'Código de versión principal del IDE',
            versionCode: 'Código de versión del IDE',
            versionName: 'Nombre de versión del IDE',
            ideStart: 'Código de inicio compatible con IDE',
            ideEnd: 'Código de fin compatible con IDE',
            cmsStart: 'Código de inicio compatible con CMS',
            cmsEnd: 'Código de fin compatible con CMS'
        },
        errors: {
            invalidFileExt: 'Por favor, suelte un archivo .ea o .eap',
            jsonParseFail: 'Error al analizar JSON: Formato de archivo no válido.',
            errorInfo: 'Detalles del error:',
            rawText: 'Contenido sin formato:',
            ERR_HTTP_REQUEST: 'Error en la solicitud: {msg}',
            ERR_PARSE_JSON: 'Error al analizar JSON: {msg}',
            ERR_OPEN_FILE: 'No se puede abrir el archivo: {msg}',
            ERR_READ_FILE: 'Error al leer el contenido del archivo: {msg}',
            ERR_INIT_KEY: 'Error al inicializar la clave de descifrado: {msg}',
            ERR_DECRYPT: 'Error al descifrar datos: {msg}',
            ERR_UTF8: 'Codificación UTF-8 no válida: {msg}',
            ERR_OPEN_ZIP: 'No se puede abrir el archivo ZIP: {msg}',
            ERR_PARSE_ZIP: 'Error al analizar el archivo ZIP: {msg}',
            ERR_FIND_PROJECT: 'Archivo de proyecto de destino no encontrado: {msg}',
            ERR_READ_PROJECT: 'Error al leer el contenido del archivo de proyecto: {msg}'
        }
    }
};

const getSystemLanguage = (): string => {
    const lang = navigator.language || '';
    const lowerLang = lang.toLowerCase();

    if (lowerLang.startsWith('zh')) {
        if (
            lowerLang.includes('tw') ||
            lowerLang.includes('hk') ||
            lowerLang.includes('mo') ||
            lowerLang.includes('hant')
        ) {
            return 'zh-TW';
        }
        return 'zh-CN';
    }
    if (lowerLang.startsWith('ja')) return 'ja';
    if (lowerLang.startsWith('ko')) return 'ko';
    if (lowerLang.startsWith('de')) return 'de';
    if (lowerLang.startsWith('fr')) return 'fr';
    if (lowerLang.startsWith('es')) return 'es';
    if (lowerLang.startsWith('en')) return 'en';

    return 'en';
};

const i18n = createI18n({
    legacy: false,
    locale: getSystemLanguage(),
    fallbackLocale: 'en',
    messages,
});

export default i18n;