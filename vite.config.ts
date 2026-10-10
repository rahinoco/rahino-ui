import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));

function copyFontBuild() {
  return {
    name: 'copy-font-build',
    closeBundle() {
      const fromDir = path.resolve(root, 'src/styles/fonts');
      const toDir = path.resolve(root, 'dist/fonts');
      fs.mkdirSync(toDir, { recursive: true });
      for (const name of fs.readdirSync(fromDir)) {
        if (!name.endsWith('.woff2')) continue;
        fs.copyFileSync(path.join(fromDir, name), path.join(toDir, name));
      }
      fs.copyFileSync(path.resolve(root, 'src/styles/fonts.css'), path.resolve(root, 'dist/fonts.css'));
    },
  };
}

export default defineConfig({
  plugins: [react(), copyFontBuild()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(root, 'src/index.ts'),
      name: 'RahinoUI',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    sourcemap: true,
  },
});
