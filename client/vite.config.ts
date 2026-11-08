import { defineConfig } from 'vite';

// GitHub Pages alt yolda yayınlar (/depo-adi/). Actions bu değişkeni ayarlar.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  server: { port: 5173 },
});
