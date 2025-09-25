
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
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/stores': path.resolve(__dirname, './src/stores'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@home': path.resolve(__dirname, './src/home'),
    },
  },
  server: {
    host: '127.0.0.1',   // ★ IPv4 강제
    port: 8080,
    strictPort: false,
    hmr: {
      host: '127.0.0.1', // ★ HMR도 IPv4로 고정
      port: 8081,
      protocol: 'ws'
    },
    allowedHosts: ['*.ngrok-free.app']
  },
  preview: {
    host: '127.0.0.1',   // 미리보기도 같은 정책
    port: 8082
  }
});