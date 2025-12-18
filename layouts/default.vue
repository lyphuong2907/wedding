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
  title: "Việt Phương & Thương Huyền - Save The Date",
  meta: [
    { name: "description", content: "Sự hiện diện của quý khách là vinh dự của gia đình chúng tôi" },
 
    { property: "og:title", content: "Việt Phương & Thương Huyền - Save The Date" },
    { property: "og:description", content: "Sự hiện diện của quý khách là vinh dự của gia đình chúng tôi" },
    { property: "og:image", content: "https://phuonghuyen.love/thumb.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: "website" },
     
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Việt Phương & Thương Huyền - Save The Date" },
    { name: "twitter:description", content: "Sự hiện diện của quý khách là vinh dự của gia đình chúng tôi" },
    { name: "twitter:image", content: "https://phuonghuyen.love/thumb.jpg" },
    { name: "twitter:image:alt", content: "Việt Phương & Thương Huyền - Save The Date" },
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
