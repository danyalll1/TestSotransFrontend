export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['nuxt-swiper'],
  css: [
    '~/assets/styles/base.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/abstracts.scss" as *;',
        },
      }
    }
  },
})
