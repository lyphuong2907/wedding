<script lang="ts" setup>
import gsap from "gsap";

const hiddenPreload = ref(false);
const handleAnimationStart = () => {
  console.log("animation start");
};
const handlePreloaderDone = () => {
  hiddenPreload.value = true;
  const body = document.querySelector('body')
  if (body) {
    body.style.overflow = 'auto'
    body.style.touchAction = 'auto'
  }
};
useHead({
  title: "Duong & Diep",
  meta: [
    { name: "description", content: "D&D" },
 
    { property: "og:title", content: "Duong & Diep" },
    { property: "og:description", content: "D&D" },
    { property: "og:image", content: "http://dndwedding.co/og.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "http://dndwedding.co/" },  
   
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Duong & Diep" },
    { name: "twitter:description", content: "D&D" },
    { name: "twitter:image", content: "http://dndwedding.co/og.png" },
    { name: "twitter:image:alt", content: "Duong & Diep" },
  ],
});
</script>

<template>
  <Preload
    v-if="!hiddenPreload"
    @animation-start="handleAnimationStart"
    @preloader-done="handlePreloaderDone"
  />
  <LayoutsMediaWrap></LayoutsMediaWrap>
  <LayoutsHeader />
  <NuxtPage />

</template>

<style scoped></style>
