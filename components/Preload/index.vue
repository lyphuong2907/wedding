<script lang="ts" setup>
import gsap from "gsap";
import { useAnimations } from "~/composables/animations";
import { useScrollLock } from "~/composables/lockScroll";

const emit = defineEmits(["preloaderDone", "animationStart"]);
const { animateText, resetAnimation } = useAnimations();
const { lockScroll } = useScrollLock();
const { isMobile } = useDevice();

const preloaderRef = ref<any>(null);
const progress = ref(0);
const isClickable = ref(false);

const titleElement = computed(() =>
  preloaderRef.value?.querySelector(".title")
);
const preloaderPlayed = computed(() =>
  sessionStorage.getItem("preloaderPlayed")
);

async function startPreloader() {
  const wrapper = preloaderRef.value?.querySelector(".preloader-wrapper");
  if (!wrapper || !titleElement.value) return;

  wrapper.classList.remove("hidden");
  await nextTick(); // Giả định Bn là nextTick
  animateText({ el: titleElement.value, onScroll: false }); // Áp dụng animation cho tiêu đề

  await gsap.to(progress, {
    value: 100,
    roundProps: "value",
    duration: 4,
    onComplete: () => {
      isClickable.value = true;
    },
  });
}

function startAnimation() {
  if (!isClickable.value) return;
  const tickers:any = preloaderRef.value?.querySelectorAll(".ticker");
  if (!titleElement.value || !tickers?.length) return;

  emit("animationStart");
  // sessionStorage.setItem("preloaderPlayed", "true");

  // Tạm dừng animation CSS
  tickers.forEach((ticker:any) => {
    ticker.querySelectorAll(".ticker__item").forEach((item:any) => {
      item.style.animation = "none";
    });
  });

  const fadeOut = { autoAlpha: 0, duration: 1.5 };
  const timeline = gsap.timeline({
    onComplete: () => {
      timeline.kill();
      lockScroll(false);
      emit("preloaderDone");
    },
  });

  timeline.to(".preloader-anim", fadeOut);
  // Animate mỗi ticker theo hướng khác nhau
  tickers.forEach((ticker:any, index:any) => {  
    let animationProps = {};
    switch (index) {
      case 0: // Ticker 0: Sang trái
        animationProps = { xPercent: -100 };
        break;
      case 1: // Ticker 1: Sang phải
        animationProps = { xPercent: 100 };
        break;
      case 2: // Ticker 2: Lên trên
        animationProps = { yPercent: -100 };
        break;
      case 3: // Ticker 3: Xuống dưới
        animationProps = { yPercent: 100 };
        break;
    }
    //@ts-ignore
    timeline.to(
      ticker,
      {
        ...animationProps,
        ...fadeOut,
        delay: Math.random() * 0.3,
        onStart:
          index === 0
            ? () => resetAnimation({ el: titleElement.value, onScroll: false })
            : null,
      },
      0
    );
  });

  isClickable.value = false;    
}

onMounted(async () => {
  if (preloaderPlayed.value) {
    lockScroll(false);
    emit("animationStart");
    emit("preloaderDone");
  } else {
    await startPreloader();
  }
});
</script>

<template>
  <div
    ref="preloaderRef"
    class="preloader"
    :class="{ 'cursor-pointer': isClickable }"
    @click="startAnimation"
  >
    <div class="cover inset preloader-anim"></div>
    <div class="preloader-wrapper hidden">
      <PreloadClouds />
      <LayoutsLogo class="logo preloader-anim" />
      <div class="title-wrapper">
        <p class="title preloader-anim p0">A Day Made of Love</p>

        <div :class="{ cursor: true, show: isClickable }">
          <span class="l2 cursor-inner">{{
            isMobile ? "enter" : "click to enter"
          }}</span>
        </div>
      </div>
      <p class="l2 loading preloader-anim">{{ progress }}%</p>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  height: 100vh;
  height: 100lvh;
  margin-bottom: -100lvh;
  overflow: hidden;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 99999;
}
.preloader.cursor-pointer {
  cursor: pointer;
}
.preloader-wrapper {
  display: contents;
}
.preloader-wrapper.hidden {
  opacity: 0;
  visibility: hidden;
}
.cover {
  background-color: var(--c-bg);
}
.title-wrapper {
  display: contents;
}
@media (max-width: 1023px) {
  .title-wrapper {
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: var(--z-base);
  }
}
.title {
  color: var(--c-base-1000);
  left: 0;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: var(--z-base);
}
@media (max-width: 1023px) {
  .title {
    margin: 0 auto;
    max-width: 15rem;
    position: static;
    transform: none;
  }
}
.title.hidden {
  opacity: 0;
}
.loading {
  color: var(--c-base-1000);
  left: 50%;
  position: absolute;
  top: calc(100svh - var(--offset-32));
  transform: translate(-50%, -100%);
  z-index: var(--z-base);
}
.cursor {
  background-color: var(--c-base-1000);
  left: 50%;
  padding: 0.1875rem 0.5rem;
  position: fixed;
  top: 60%;
  transform: translate(-50%, -50%);
  transition-duration: 0.6s;
  transition-property: clip-path, opacity, visibility;
  transition-timing-function: var(--default-ease);
  z-index: calc(var(--z-base) * 3);
}
@media (min-width: 1024px) {
  .cursor {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
}
@media (max-width: 1023px) {
  .cursor {
    left: 50%;
    opacity: 0;
    position: absolute;
    top: calc(100% + 1.5rem);
    transform: translate(-50%);
    visibility: hidden;
  }
}
.cursor-inner {
  color: var(--c-bg);
  display: block;
  transition: transform 0.6s var(--default-ease);
}
@media (min-width: 1024px) {
  .cursor-inner {
    transform: translate(-50%);
  }
}
.cursor.show {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  opacity: 1;
  visibility: visible;
}
.cursor.show .cursor-inner {
  transform: translate(0);
}
</style>
