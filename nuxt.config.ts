// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // ✅ Tailwind module
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  // ✅ Global CSS
  css: [
    '~/assets/css/main.css',
  ],

  // ✅ Runtime Config (Supabase)
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
    },
  },
})
