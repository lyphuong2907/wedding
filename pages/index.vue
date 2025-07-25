<script lang="ts" setup>
import gsap from "gsap";

// const lenisRef = ref<any>(null);

// const onFrame = (time: number) => {
//   if (
//     lenisRef.value &&
//     lenisRef.value.instance &&
//     typeof lenisRef.value.instance.raf === "function"
//   ) {
//     lenisRef.value.instance.raf(time * 1000);
//   }
// };

// onMounted(() => {
//   gsap.ticker.add(onFrame);
// });

// onBeforeUnmount(() => {
//   // gsap.ticker.remove(onFrame);
// });
</script>
<template>
  <Lenis ref="lenisRef" :autoRaf="true" root>
    <main class="page">
      <div class="sticky-container">
        <HeroSection></HeroSection>
        <div id="about-section"></div>
      </div>
      <Gallery></Gallery>
      <ClientOnly>
        <Service></Service>

        <Partner
          :data="{
            description:
              '',
            title: ['To you,', 'always'],
          }"
        ></Partner>
        <Sircle></Sircle>
        <Faq></Faq>
        <Contact></Contact>
      </ClientOnly>
      <Note></Note>
    </main>
    <LayoutsFooter />
  </Lenis>
</template>
<style scoped>
.page {
  position: relative;
}
@media (max-width: 1023px) {
  .sticky-container {
    position: relative;
    z-index: var(--z-base);
  }
}
.hero {
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  -webkit-mask-image: url(/images/main/transition.webp),
    linear-gradient(#fff 0 0);
  mask-image: url(/images/main/transition.webp), linear-gradient(#fff 0, #fff 0);
  -webkit-mask-position: 50% calc(100% + 0.125rem), 0 0;
  mask-position: 50% calc(100% + 0.125rem), 0 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 0, 100%;
  mask-size: 100% 0, 100%;
  position: sticky;
  top: calc((100vh - var(--height)) * var(--height-calculated));
  top: calc((100lvh - var(--height)) * var(--height-calculated));
  will-change: mask-size;
  z-index: calc(var(--z-base) * 2);
}
</style>
