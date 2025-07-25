<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const aboutData = {
  title: ["We", "Are"],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  video: "/videos/about-video.mp4", // Example video path
};

// Common data (simulating `commonData` from the store or context)
const commonData = {
  ceo: {
    company: "Example Company",
    photo: { small: "/images/ceo-photo.jpg" },
    name: "John Doe",
    position: "CEO",
  },
};

const isVisible = ref(false);
const aboutMedia = computed(() => document.getElementById("about-media"));
const matchMedia = useMatchMedia(); // Custom hook for media queries
const scrollTriggers: any[] = [];
const { animateTitle } = useAnimations();

// Animation for media scaling
function animateMedia() {
  const mediaElement = aboutMedia.value;
  const mediaChild = mediaElement?.firstChild;
  if (!mediaElement || !mediaChild) return;

  matchMedia.add("(min-width: 1024px)", () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-section",
        start: "center center",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    timeline
      .to(mediaElement, { y: 0, yPercent: 0, scale: 1, ease: "default-ease" })
      .to(mediaChild, { scale: 1, ease: "default-ease" }, "<");
  });
}
function st(callback: any, delay = 0) {
  let timeoutId: any;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      gsap.to(callback, {
        duration: 0.6,
        ease: "power2.out",
      });
    }, delay);
  };
}
// Animation for title and decor line
function animateTitleAndDecor() {
  const decorLine = document.querySelector("#about-section .decor-line");
  const paths = decorLine?.querySelectorAll("path");
  if (!decorLine || !paths) return;

  const trigger = ScrollTrigger.create({
    trigger: "#about-section",
    start: "center 60%",
    once: true,
    onEnter: (self) => {
      decorLine.classList.remove("hidden");
      paths.forEach((path: any) =>
        st(() => (path.style.strokeDashoffset = 0), 0)()
      );
      if (self) {
        self?.kill();
      }
    },
  });

  scrollTriggers.push(trigger);
}

// Intersection observer to trigger visibility
function observeSection() {
  const section = document.querySelector("#about-section");
  const observer = new IntersectionObserver(
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { rootMargin: "100% 0%" }
  );
  if (section) observer.observe(section);
  scrollTriggers.push(observer);
}

// Lifecycle hooks
onMounted(() => {
  animateTitleAndDecor();
  animateMedia();
  observeSection();
});

onUnmounted(() => {
  matchMedia.kill?.(); 
  scrollTriggers.forEach((trigger) => trigger?.kill?.());
});
</script>
<template>
  <section id="about-section" class="about">
    <div class="about-inner grid-container container">
      <div class="decor-line">
        <AboutSvgDecorLine />
      </div>
      <div class="mobile-wrapper container" style="overflow: hidden">
        <div id="about-title" class="title-wrapper">
          <template v-for="(title, index) in aboutData.title" :key="index">
            <div v-if="index === 1" class="caption-wrapper">
              <p class="l2 caption">{{ commonData.ceo.company }}</p>
              <p class="l2 years">
                “17 — “{{ new Date().getFullYear().toString().slice(-2) }}
              </p>
            </div>
            <p :class="'h1 title-word   title-word-' + (index + 1)">
              {{ title }}
            </p>
          </template>
        </div>
        <div id="about-media" class="media-wrapper">
          <div class="media-inner inset">
            <AboutVideoPlayer v-if="isVisible" :video="aboutData.video" />
          </div>
        </div>
        <div class="description-block">
          <div class="p2" v-html="aboutData.description"></div>
          <LinkX to="/" class="description-link" theme="dark" text="about us" />
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.about {
  height: 250vh;
  margin-top: -100lvh;
  position: relative;
}
@media (max-width: 1023px) {
  .about {
    height: calc(250vh + 13.3125rem);
    height: calc(250lvh + 13.3125rem);
  }
}
.about-inner {
  grid-auto-rows: max-content;
  grid-template-rows: 1fr;
  height: 100vh;
  height: 100lvh;
  overflow: hidden;
  padding-bottom: 2rem;
  padding-top: 12rem;
  position: sticky;
  top: 0;
}
@media (max-width: 1023px) {
  .about-inner {
    display: block;
    overflow: initial;
    padding: 0;
  }
  .inner:before {
    display: none;
  }
}
.decor-line {
  bottom: -13.5rem;
  height: 85.7142857143%;
  left: 50%;
  pointer-events: none;
  position: absolute;
  transform: translate(calc(-50% - 0.8125rem));
  z-index: var(--z-base);
}
@media (max-width: 1023px) {
  .decor-line {
    height: auto;
    left: 0;
    top: 40.62127vh;
    transform: none;
    width: 100%;
  }
}
.decor-line path {
  opacity: 0;
}
.mobile-wrapper {
  display: contents;
}
@media (max-width: 1023px) {
  .mobile-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    overflow: hidden;
    padding-bottom: 1.5rem;
  }
}
.title-wrapper {
  display: contents;
}
@media (max-width: 1023px) {
  .title-wrapper {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
}
.title-word.hidden {
  opacity: 0;
  visibility: hidden;
}
.title-word-1 {
  grid-column: 1/4;
  padding-right: 1rem;
  text-align: right;
}
@media (max-width: 1023px) {
  .title-word-1 {
    grid-column: 1/2;
    padding-right: 0;
    text-align: left;
  }
}
.title-word-2 {
  grid-column: 6/9;
  grid-row: 1;
}
@media (max-width: 1023px) {
  .title-word-2 {
    grid-column: 2/3;
    text-align: right;
  }
}
.years {
  grid-column: 3/-1;
}
.caption-wrapper {
  display: grid;
  grid-column: 1/7;
  grid-template-columns: subgrid;
}
@media (max-width: 1023px) {
  .caption-wrapper {
    display: block;
    text-align: center;
  }
}
.caption {
  grid-column: 1/3;
}
.description-block {
  grid-column: 7/9;
  grid-row: 2/4;
}
.description-link {
  display: block;
  margin-top: 2rem;
  width: -moz-max-content;
  width: max-content;
}
@media (max-width: 1023px) {
  .description-link {
    margin-top: 1.5rem;
    position: relative;
    z-index: var(--z-base);
  }
}
.ceo-block {
  align-items: center;
  align-self: flex-end;
  display: flex;
  gap: 1rem;
  grid-column: 3/4;
  grid-row: 3/4;
}
@media (max-width: 1023px) {
  .ceo-block {
    align-self: flex-start;
    margin-top: 3.5rem;
  }
}
.ceo-photo {
  border-radius: 50%;
  height: 3rem;
  isolation: isolate;
  overflow: hidden;
  position: relative;
  width: 3rem;
  z-index: var(--z-base);
}
.ceo-position {
  color: var(--c-base-1000-40);
}
.media-wrapper {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform: translateY(18rem) scale(0.2055555556) translateY(-50%);
  transform-origin: center top;
  width: 100%;
  z-index: calc(var(--z-base) * 2);
}
@media (max-width: 1023px) {
  .media-wrapper {
    height: 12.3125rem;
    left: unset;
    margin: 1rem 0 5rem;
    position: relative;
    top: unset;
    transform: none;
    width: 100%;
  }
}
@media (min-width: 1024px) {
  .media-inner {
    transform: scale(1.5);
  }
}
</style>
