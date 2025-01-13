/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
  },
  server: {
    port: 3000,
    /** 포트가 이미 사용 중일 때 다른 포트를 사용하게끔 설정 */
    strictPort: false,
  },
});
