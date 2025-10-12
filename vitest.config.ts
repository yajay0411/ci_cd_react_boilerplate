import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: ['**/e2e/**', 'node_modules'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/**',
        '**/e2e/**',
        '**/*.d.ts',
        '**/types.ts',
        '**/index.ts',
        '**/*.stories.*',
        '**/*.test.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
