import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tsconfigPaths(), checker({ typescript: true })],
    build: {
      outDir: 'build',
      sourcemap: true,
      target: 'es2019',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@context': fileURLToPath(new URL('./src/context', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@styles/fonts.scss" as *;
            @use "@styles/variables.scss" as *;
            @use "@styles/mixins.scss" as *;
          `,
        },
      },
    },
    define: {
      // inject envs into import.meta.env
      'import.meta.env': env,
    },
    server: {
      // port: 4200,
      // enable polling to detect SCSS changes reliably
      watch: {
        usePolling: true,
      },
      hmr: {
        overlay: true,
      },
    },
  };
});
