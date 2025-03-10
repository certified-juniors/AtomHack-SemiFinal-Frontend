import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    preview: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: ['0.0.0.0', 'ui.hack.noxly.ru'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
    publicDir: path.resolve(__dirname, 'public'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            external: ['**/*.d.ts'],
        },
    },
});
