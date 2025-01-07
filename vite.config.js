import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Redirige las peticiones al backend
        changeOrigin: true, // Cambia el origen de la solicitud para evitar problemas con CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Opcional: Reescribe la ruta si es necesario
      },
      '/favicon.ico': {
        target: 'http://localhost:8080', // Asegura que el favicon se sirva desde el backend
        changeOrigin: true,
      },
    },
  },
});
