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
  title: "Phương & Huyền",
  meta: [
    { name: "description", content: "P&H" },
 
    { property: "og:title", content: "Phương & Huyền" },
    { property: "og:description", content: "P&H" },
    { property: "og:image", content: "https://hangloi.com/og.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://hangloi.com/" },
   
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Phương & Huyền" },
    { name: "twitter:description", content: "P&H" },
    { name: "twitter:image", content: "https://hangloi.com/og.png" },
    { name: "twitter:image:alt", content: "Phương & Huyền" },
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
