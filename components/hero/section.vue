<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const { isMobile, isDesktop } = useDevice();
const isSliderReady = ref(false);

const title = ["Save", "The", "&", "Date"];
const caption = "A story of Eternity";
const sentences = ["BEGINS", "FOREVER", "our", "where,", "This is"];

// Computed styles based on HTML
const heroStyles = computed(() => ({
  "--height": `${heroHeight.value}px`,
  "--height-calculated": heroHeightCalculated.value,
  "mask-size": maskSize.value,
}));
const photoInnerStyles = ref({});

// Split caption into lines
const captionLines = computed(() => caption.split(" "));

// Hero section height
const heroHeight = ref(0);
const heroHeightCalculated = ref(0);
const maskSize = ref("100% 0px, 100%");

let timeline: gsap.core.Timeline | undefined;
const mm = useMatchMedia();

async function animateSentences() {
  if (isMobile) return;
  const sentenceElements = document.querySelectorAll(".hero .sentences__item");
  const reversedSentences = Array.from(sentenceElements).reverse();
  timeline = gsap
    .timeline()
    .from(reversedSentences, {
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "arrow-ease",
      onStart: () => {
        reversedSentences.forEach((s) => s.classList.remove("shift"));
      },
    })
    .fromTo(
      "#hero-icon .path",
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 1.6,
        ease: "arrow-ease",
        onComplete: () => {
          timeline?.kill();
        },
      }
    );
}

onMounted(() => {
  mm.add("(min-width: 1024px)", () => {
    ScrollTrigger.create({
      trigger: "#gallery-section",
      start: 0,
      end: "center center",
      scrub: true,
      animation: gsap.fromTo(
        ".photo-inner",
        { yPercent: -8.33 },
        { yPercent: 8.33 }
      ),
    });
  });
  animateSentences();
});

onUnmounted(() => {
  timeline?.kill();
  mm?.kill();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <section id="hero-section" class="hero" :style="heroStyles">
    <div class="photo-inner" :style="photoInnerStyles"></div>
    <h1 class="hero-title h1">
      <span
        v-for="(title, index) in title"
        :key="index"
        class="h1 title__line"
        v-html="
          title === '&'
            ? '<span class=&quot;font-settings-ss01&quot;>&</span>'
            : `${title} `
        "
      ></span>
    </h1>

    <HeroSlider />

    <!-- FIXED: p không chứa div -->
    <div class="l2 text-anim caption" aria-label="Online gallery">
      <div
        v-for="(line, index) in captionLines"
        :key="index"
        class="text-anim-line"
        aria-hidden="true"
      >
        {{ line }}
      </div>
    </div>

    <div class="link-wrapper">
      <LinkX :to="'/'" type="button" text="R.S.V.P" />

      <div id="hero-icon" class="arrow-wrapper">
        <div class="inner-svg">
          <svg
            width="122"
            height="124"
            viewBox="0 0 122 124"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            c
          >
            <mask
              id="mask0_1_4"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="122"
              height="124"
            >
              <path
                d="M121.354 120.354C121.549 120.158 121.549 119.842 121.354 119.646L118.172 116.464C117.976 116.269 117.66 116.269 117.464 116.464C117.269 116.66 117.269 116.976 117.464 117.172L120.293 120L117.464 122.828C117.269 123.024 117.269 123.34 117.464 123.536C117.66 123.731 117.976 123.731 118.172 123.536L121.354 120.354ZM75.078 110.866L74.8866 111.327L75.078 110.866ZM36.1472 84.8528L36.5007 84.4993L36.1472 84.8528ZM10.1344 45.922L9.6725 46.1133L10.1344 45.922ZM121 119.5C105.307 119.5 89.7677 116.409 75.2693 110.404L74.8866 111.327C89.5064 117.383 105.176 120.5 121 120.5V119.5ZM75.2693 110.404C60.7709 104.398 47.5973 95.5959 36.5007 84.4993L35.7936 85.2064C46.9831 96.3958 60.2669 105.272 74.8866 111.327L75.2693 110.404ZM36.5007 84.4993C25.4041 73.4027 16.6018 60.2291 10.5964 45.7307L9.6725 46.1133C15.7282 60.7331 24.6042 74.0169 35.7936 85.2064L36.5007 84.4993ZM10.5964 45.7307C4.59095 31.2323 1.49999 15.693 1.5 1.62921e-07L0.5 -1.62921e-07C0.499995 15.8243 3.61682 31.4936 9.6725 46.1133L10.5964 45.7307Z"
                fill="white"
              ></path>
            </mask>
            <g mask="url(#mask0_1_4)">
              <path
                class="path"
                d="M1 -1.5C0.333333 15.1667 5 54.8714 37 85.5C68.3433 115.5 101 120.5 126 120.5"
                stroke="#FF0000"
                stroke-width="13"
                style="stroke: white"
              ></path>
            </g>
          </svg>
        </div>
      </div>

      <span
        v-for="(sentence, index) in sentences"
        :class="['p1', `sentences__item sentences__item-${index + 1}`]"
        :style="{ opacity: 1, visibility: 'inherit' }"
      >
        {{ sentence }}
      </span>
    </div>
  </section>
</template>
<style scoped>
.hero {
  background-color: var(--c-bg);
  min-height: 100vh;
  min-height: 100lvh;
  overflow: hidden;
  padding: var(--offset-112) 0 55rem;
  position: relative;
  width: 100%;
}
@media (max-width: 1023px) {
  .hero {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    padding: 5.75rem 0 var(--offset-32);
  }
}
.photo-inner {
  --gradient: linear-gradient(180deg, rgba(0, 0, 0, 0.4), transparent);
  background-image: var(--gradient), url(/images/main/bg-desk.webp);
  background-position: 50%;
  background-size: cover;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: scale(1.2);
  width: 100%;
  z-index: var(--z-bg);
}
@media (max-width: 1023px) {
  .photo-inner {
    background-image: var(--gradient), url(/images/main/bg-mob.webp);
    transform: none;
  }
}
.hero-title {
  color: var(--c-base-0);
  text-align: center;
}
@media (max-width: 1023px) {
  .hero-title {
    padding: 0 var(--padding);
    width: 100%;
  }
}
.title__line:nth-child(3n) {
  display: block;
}
@media (max-width: 1023px) {
  .title__line:nth-child(3n) {
    margin: 0.5rem 0;
  }
}
.caption {
  color: var(--c-base-0);
  left: 21.9444444444%;
  max-width: 7.5rem;
  position: absolute;
  text-align: center;
  top: 24.4260204082%;
}
@media (max-width: 1023px) {
  .caption {
    max-width: 4.625rem;
    position: static;
  }
}
.link-wrapper {
  pointer-events: none;
  position: absolute;
  right: 2rem;
  top: 41.9005102041%;
}
@media (max-width: 1023px) {
  .link-wrapper {
    display: none;
  }
}
.link-wrapper a {
  pointer-events: all;
}
@media (hover: hover) {
  .link-wrapper:hover .sentences__item-4 {
    transform: translate(-0.6rem);
  }
  .link-wrapper:hover .sentences__item-5 {
    transform: translate(-0.7rem);
  }
}
.arrow-wrapper {
  bottom: 0.5625rem;
  height: 5.5rem;
  position: absolute;
  right: calc(100% + 0.375rem);
  width: 7.5rem;
}
.sentences__item {
  color: var(--c-base-0);
  position: absolute;
  transition: transform 0.6s var(--default-ease);
  width: 10.75rem;
}
.sentences__item-1 {
  bottom: calc(100% + 8.8125rem);
  right: calc(100% + 1.125rem);
}
@media (min-width: 1024px) {
  .sentences__item-1.shift {
    transform: translate(-6rem);
  }
}
.sentences__item-2 {
  bottom: calc(100% + 10.8125rem);
  right: calc(100% + 1.125rem);
}
@media (min-width: 1024px) {
  .sentences__item-2.shift {
    transform: translate(-6rem);
  }
}
.sentences__item-3 {
  bottom: calc(100% + 12.8125rem);
  right: 9.5rem;
  text-align: right;
}
@media (min-width: 1024px) {
  .sentences__item-3.shift {
    transform: translate(-4rem);
  }
}
.sentences__item-4 {
  bottom: calc(100% + 14.8125rem);
  right: 11.375rem;
}
@media (min-width: 1024px) {
  .sentences__item-4.shift {
    transform: translate(-2rem);
  }
}
.sentences__item-5 {
  bottom: calc(100% + 16.8125rem);
  right: 13.5rem;
}
.slider-wrapper {
  left: 0;
  position: absolute;
  top: 51.2755102041%;
  width: 100%;
}
@media (max-width: 1023px) {
  .slider-wrapper {
    position: relative;
    top: unset;
  }
}
.socials {
  bottom: 2rem;
  display: flex;
  gap: 2rem;
  left: 2rem;
  position: absolute;
}
@media (max-width: 1023px) {
  .socials {
    display: none;
  }
}
.rights {
  bottom: 2rem;
  color: var(--c-base-0);
  position: absolute;
  right: 2rem;
}
@media (max-width: 1023px) {
  .rights {
    display: none;
  }
}
</style>
