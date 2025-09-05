
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    host: '127.0.0.1',   // ★ IPv4 강제
    port: 8080,
    strictPort: false,
    hmr: {
      host: '127.0.0.1', // ★ HMR도 IPv4로 고정
      port: 8081,
      protocol: 'ws'
    }
  },
  preview: {
    host: '127.0.0.1',   // 미리보기도 같은 정책
    port: 8082
  }
});