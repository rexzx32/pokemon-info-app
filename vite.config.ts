// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://pokeapi.co',  // URL base de la PokéAPI
        changeOrigin: true,             // Cambia el origen de la solicitud al objetivo
        rewrite: (path) => path.replace(/^\/api/, ''),  // Reescribe la ruta de la solicitud
      },
    },
  },
});
