// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  // ssr: false,
  css: ["~/assets/main.css"],
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/device",
    "@vueuse/nuxt",
    "nuxt3-lenis",
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          'Pinyon Script': true,
          'Alex Brush': true,
          'Playfair Display': {
            ital: [400, 500, 600, 700, 800, 900],
            wght: [400, 500, 600, 700, 800, 900]
          }
        },
      },
    ],
  ],
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    presets: {
      logo: {
        modifiers: {
          width: 150,
          height: 150,
        },
      },
    },
  },
  build: {
    transpile: ["gsap"],
  },
});
