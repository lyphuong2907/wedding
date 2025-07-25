<template>
  <div class="slider-wrapper">
    <div ref="sliderRef" class="slider">
      <div v-for="(item, index) in images" :key="index" class="slider-slide">
        <HeroSliderCard :photo="item" hide-data />
      </div>
    </div>
    <Cursor v-if="isDesktop && isSliderReady" text="drag" />
  </div>
</template>

<script lang="ts" setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Slider } from "~/utils/slider.js";

gsap.registerPlugin(ScrollTrigger);

const { isMobile, isDesktop } = useDevice();
const isSliderReady = ref(false);
const sliderRef = ref<any>(null);
const triggers: any[] = [];

// Hardcoded image data from HTML
const images = ref([
  {
    original: "/gallery/p_DSC08690.jpg",
    thumbnail: "/gallery/DSC08690.jpg",
    width: 500,
    height: 500,
  },
  {
    original: "/gallery/p_DSC07735.jpg",
    thumbnail: "/gallery/v_DSC07735.jpg",
    width: 500,
    height: 500,
  },

  {
    original: "/gallery/DSC08718.jpg",
    thumbnail: "/gallery/v_DSC08718.jpg",
    width: 500,
    height: 500,
  },
  {
    original: "/gallery/DSC07988.jpg",
    thumbnail: "/gallery/v_DSC07988.jpg",
    width: 500,
    height: 500,
  },
  {
    original: "/gallery/DSC07958.jpg",
    thumbnail: "/gallery/v_DSC07958.jpg",
    width: 500,
    height: 500,
  },
]);

// Initialize slider
const slider = new Slider({
  container: sliderRef,
  centeredSlides: true,
  margin: 0,
  autoScroll: isMobile,
  listeners: {
    drag: isDesktop,
    touch: isMobile,
  },
});

async function setupFirstSlideAnimation() {
  if (!sliderRef.value || isMobile) return;
  const firstSlideChild = sliderRef.value.querySelector(
    ".slider-slide:first-child > *"
  );
  triggers[0] = ScrollTrigger.create({
    trigger: sliderRef.value,
    start: 0,
    end: "center center",
    scrub: true,
    once: true,
    animation: gsap.from(firstSlideChild, {
      yPercent: -120,
      rotate: 20,
      ease: "none",
      onComplete: () => {
        slider.enableAutoScroll();
        isSliderReady.value = true;
      },
    }),
  });
}

function setupScrollTrigger() {
  triggers[1] = ScrollTrigger.create({
    trigger: "#about-section",
    start: "center center",
    scrub: false,
    onEnter: () => {
      slider.disableAutoScroll();
    },
    onLeaveBack: () => {
      slider.enableAutoScroll();
    },
  });
  if (!isDesktop) slider.enableAutoScroll();
}

onMounted(() => {
  setupFirstSlideAnimation();
  setupScrollTrigger();
  if (isMobile) {
    slider.disableAutoScroll();
    slider.enableAutoScroll();
  }
});

onUnmounted(() => {
  triggers.forEach((trigger) => trigger?.kill());
});
</script>

<style scoped>
.slider {
  cursor: grab;
  height: 21.5rem;
  position: relative;
  width: 100%;
  z-index: var(--z-base);
}
@media (max-width: 1023px) {
  .slider {
    height: 15.4375rem;
  }
}
.slider.is-dragging {
  cursor: grabbing;
}
.slider.is-dragging a {
  pointer-events: none;
}
.slider-slide {
  --image-offset: 1rem;
  display: grid;
  height: 100%;
  left: 0;
  place-items: center;
  position: absolute;
  top: 0;
  width: 21.5rem;
  z-index: var(--z-base);
}
@media (max-width: 1023px) {
  .slider-slide {
    width: 15.4375rem;
  }
}
@media (max-width: 1023px) {
  .slider-slide .card {
    aspect-ratio: unset;
    padding: 1rem;
    --large-card-mob-width: 100%;
    --large-card-mob-height: auto;
  }
}
</style>
