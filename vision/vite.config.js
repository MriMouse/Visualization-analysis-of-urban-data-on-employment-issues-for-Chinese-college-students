import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//var webpack = require('webpack')

// 使用 ES 模块导出配置对象
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8998, // 修改默认端口
    open: true, // 自动打开浏览器
  },
})
