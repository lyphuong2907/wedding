<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Props
defineProps<{
  data: {
    description: string;
    title: string[];
  };
}>();
function convertRem(pixels: number): number {
  const rootFontSize =
    parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return pixels / rootFontSize;
}
const { isMobile } = useDevice();
// Data
var areas = ["Groom", " ❤️ ", " Bride"];
if (isMobile) {
  areas = ["Groom", " Bride"];
}
const isVisible = ref(false);

// Computed properties
const areaElements = computed(() =>
  document.querySelectorAll(".partners .area")
);
const areaItems = computed(() => document.querySelectorAll(".area-item"));

// GSAP Animation
const setupAnimations = () => {
  if (!areaElements.value.length || !areaItems.value.length) return;

  // Media query for desktop (min-width: 1024px)
  gsap.matchMedia().add("(min-width: 1024px)", () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: areaElements.value[0].parentElement,
        start: "bottom bottom",
        once: true,
      },
    });

    // Animate each area element
    areaElements.value.forEach((area: any, index: number) => {
      const width = `${convertRem(
        areaItems.value[index].getBoundingClientRect().width + 128
      )}rem`;
      timeline.fromTo(
        area,
        { width: 4 },
        { width, duration: 0.6, ease: "power1.out" },
        "<"
      );
    });

    // Animate area items
    timeline.from(areaItems.value, {
      y: 20,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power1.out",
    });
  });
};

// Intersection Observer
const setupObserver = () => {
  const section = document.querySelector("section.partners");
  if (!section) return;

  const observer = new IntersectionObserver(
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { rootMargin: "100% 0%" }
  );

  observer.observe(section);
};

// Lifecycle Hooks
onMounted(() => {
  setupAnimations();
  setupObserver();
});

onUnmounted(() => {
  gsap.matchMedia().kill();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>
<template>
  <section class="partners grid-container container" style="overflow: hidden">
    <!-- Description Block -->
    <div class="description-block">
      <p class="p2 text-anim description">{{ data.description }}</p>
    </div>

    <!-- Title 1 -->
    <p class="h1 title-anim title-1">{{ data.title.slice(0, 2).join(" ") }}</p>

    <!-- Dynamic Component (Partners Slider or similar) -->
    <PartnerCloth v-if="isVisible" />

    <!-- Title 2 and Areas -->
    <div class="title-2-wrapper">
      <p class="h1 title-anim title-2">
        {{ data.title[2] }}<br />{{ data.title[3] }}
      </p>
      <div class="areas">
        <p v-for="(area, index) in areas" :key="index" class="p1 area">
          <span class="area-item">{{ area }}</span>
        </p>
      </div>
    </div>
  </section>
</template>
<style scoped>
.partners {
  overflow: hidden;
  padding-bottom: 2rem;
  padding-top: 12.75rem;
  position: relative;
}
@media (max-width: 1023px) {
  .partners {
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 1.5rem;
    padding-top: 5.5rem;
    margin-top: -200px;
  }
}
.description-block {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  grid-column: 1/3;
  width: 21.5rem;
}
@media (max-width: 1023px) {
  .description-block {
    margin-top: 3.5rem;
    width: 100%;
  }
}
.description > :first-child {
  text-indent: 3.75rem;
}
@media (max-width: 1023px) {
  .description > :first-child {
    text-indent: 0;
  }
}
.description-link {
  display: block;
  margin-top: 2rem;
}
@media (max-width: 1023px) {
  .description-link {
    margin-top: 1.5rem;
  }
}
.title-1 {
  grid-column: 3/9;
  position: relative;
  text-align: right;
  z-index: calc(var(--z-base) * 2);
}
@media (max-width: 1023px) {
  .title-1 {
    order: 1;
  }
}
.title-1 > div {
  white-space: nowrap;
}
.title-2-wrapper {
  grid-column: 1/-1;
}
.title-2 {
  display: inline;
  vertical-align: middle;
}
.areas {
  display: inline-flex;
  gap: 0.5rem;
  margin-left: 2rem;
  position: relative;
}
@media (max-width: 1023px) {
  .areas {
    display: inline;
    margin-left: 0;
  }
}
.area {
  border: 1px solid var(--c-base-1000-20);
  border-radius: 3rem;
  padding: 4.25rem 0;
  text-align: center;
}
@media (max-width: 1023px) {
  .area {
    border-radius: 0.75rem;
    display: inline-block;
    margin-right: 0.5rem;
    padding: 0.8125rem 2.5rem;
  }
  .area:first-child {
    margin-left: 1rem;
  }
}
.area-item {
  display: inline-block;
}
.canvas {
  height: 48rem;
  pointer-events: none;
  position: absolute;
  right: 0.8125rem;
  top: 10.875rem;
  width: 80rem;
  z-index: var(--z-base);
}
@media (max-width: 1023px) {
  .canvas {
    height: 14.0625rem;
    right: 0;
    top: 5.5rem;
    width: 100%;
  }
}
</style>
