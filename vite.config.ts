import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import process from "node:process";
import obfuscator from "vite-plugin-javascript-obfuscator";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(({command, mode}) => {
    const isProd = mode === "production" || command === "build";

    return {
        plugins: [
            vue(),
            isProd &&
            obfuscator({
                include: [/\.(jsx?|tsx?|vue|cjs|mjs)$/],
                exclude: [/node_modules/],
                options: {
                    compact: true,
                    controlFlowFlattening: false, // 必须关闭：避免破坏 Vue 响应式与异步流程
                    deadCodeInjection: false, // 必须关闭：避免注入代码导致运行异常
                    debugProtection: false, // 推荐关闭：Webview 中易触发卡死
                    selfDefending: false, // 必须关闭：Vite 打包机制会直接触发自我防御崩溃白屏
                    transformObjectKeys: false, // 必须关闭：否则 vue-i18n 及组件配置键名会被篡改
                    disableConsoleOutput: true, // 禁用 console.log
                    identifierNamesGenerator: "hexadecimal", // 变量名/函数名十六进制混淆 (_0x1a2b)
                    log: false,
                    renameGlobals: false,
                    simplify: true,
                    splitStrings: true, // 拆分字符串
                    splitStringsChunkLength: 5,
                    stringArray: true, // 提取字符串到数组
                    stringArrayCallsTransform: true,
                    stringArrayEncoding: ["base64"], // Base64 加密字符串（如 CDN URL、错误提示等）
                    stringArrayIndexShift: true,
                    stringArrayRotate: true,
                    stringArrayShuffle: true,
                    stringArrayThreshold: 0.8,
                    unicodeEscapeSequence: false,
                },
            }),
        ].filter(Boolean),

        clearScreen: false,
        server: {
            port: 18888,
            strictPort: true,
            host: host || false,
            hmr: host
                ? {
                    protocol: "ws",
                    host,
                }
                : undefined,
            watch: {
                ignored: ["**/src-tauri/**"],
            },
        },
    };
});
