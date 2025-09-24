// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', // เพิ่มตรงนี้
  ],
  css: [
    '~/assets/css/main.css', // ไฟล์ CSS ที่มี Tailwind directives
  ],
})
