<script lang="ts" setup>
import gsap from "gsap";

const hiddenPreload = ref(false);
const handleAnimationStart = () => {
  console.log("animation start");
};
const handlePreloaderDone = () => {
  hiddenPreload.value = true;
  const body = document.querySelector("body");
  if (body) {
    body.style.overflow = "auto";
    body.style.touchAction = "auto";
  }
};
useHead({
  title: "Phương & Huyền",
  meta: [
    { name: "description", content: "P&H" },
    // Open Graph meta tags
    { property: "og:title", content: "Phương & Huyền" },
    { property: "og:description", content: "P&H" },
    { property: "og:image", content: "/og.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://hangloi.com/" },
    // Twitter Card meta tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Phương & Huyền" },
    { name: "twitter:description", content: "P&H" },
    { name: "twitter:image", content: "/og.png" },
    { name: "twitter:image:alt", content: "Phương & Huyền" },
  ],
});
</script>

<template>
  <LayoutsMediaWrap></LayoutsMediaWrap>
  <LayoutsHeader />
  <div class="error-page">
    <p>Page Not Found</p>
    <button @click="navigateTo('/')">
        Back to home
    </button>
  </div>
</template>

<style scoped>
.error-page{
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    flex-direction: column;
    gap: 20px;
}
</style>
