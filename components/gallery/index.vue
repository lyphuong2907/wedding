<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

function animateTitle({ el, onScroll = true, withOpacity = false }: any) {
  if (!el) return;
  gsap.fromTo(
    el,
    { opacity: withOpacity ? 0 : 1, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: onScroll
        ? {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        : null,
    }
  );
}

async function Mt({ el, onScroll = true, withOpacity = false }: any) {
  if (!el) return;
  const split = new SplitText(el, {
    type: "words, chars",
    wordsClass: "title-anim-word",
    charsClass: "title-anim-char",
  });
  return new Promise((resolve) => {
    const tl = gsap.timeline();
    gsap.set(split.words, { perspective: 1000 });
    for (const word of split.words) {
      const chars = word.querySelectorAll(".title-anim-char");
      const charsCount = chars.length;
      tl.fromTo(
        chars,
        {
          "will-change": "transform",
          x: 0,
          y: 0,
          rotationZ: 0,
          rotationY: 0,
          ...(withOpacity && { autoAlpha: 0 }),
        },
        {
          x: (i) => {
            const mid = Math.ceil(charsCount / 2);
            const adjustedIndex =
              i < mid ? i : mid - Math.abs(Math.floor(charsCount / 2) - i) - 1;
            return (
              200 *
              (charsCount % 2
                ? Math.abs(mid - 1 - adjustedIndex)
                : Math.abs(mid - adjustedIndex)) *
              (i < charsCount / 2 ? -1 : 1)
            );
          },
          y: (i) => {
            const mid = Math.ceil(charsCount / 2);
            const adjustedIndex =
              i < mid ? i : mid - Math.abs(Math.floor(charsCount / 2) - i) - 1;
            return 60 * adjustedIndex;
          },
          rotationY: -270,
          rotationZ: (i) => {
            const mid = Math.ceil(charsCount / 2);
            const adjustedIndex =
              i < mid ? i : mid - Math.abs(Math.floor(charsCount / 2) - i) - 1;
            return i < charsCount / 2
              ? 8 * Math.abs(adjustedIndex - charsCount / 2)
              : -1 * Math.abs(adjustedIndex - charsCount / 2) * 8;
          },
          ease: "default-ease",
          scale: 1,
          ...(withOpacity && { autoAlpha: 1 }),
          duration: 1.2,
          ...(onScroll && {
            scrollTrigger: {
              trigger: word,
              start: "center bottom",
              end: "top top",
            },
          }),
        },
        0
      ).add(resolve, "-=0.5");
    }
  });
}
const matchMedia = useMatchMedia();

function animateTitleSection() {
  const title = document.getElementById("gallery-title");
  if (!title) return;

  matchMedia.add("(min-width: 1024px)", () => {
    ScrollTrigger.create({
      trigger: "#hero-section",
      start: "bottom bottom",
      invalidateOnRefresh: true,
      onEnter: () => {
        title.classList.remove("hidden");
        animateTitle({ el: title, onScroll: false, withOpacity: true });
      },
    });
  });
}

onMounted(() => {
  animateTitleSection();
});

onUnmounted(() => {
  matchMedia.kill?.();
});
</script>
<template>
  <section class="gallery-section" id="gallery-section">
    <div id="gallery-title" class="title hidden">
      <span v-for="n in 2" :key="n" class="title__item">
        <span v-for="m in 2" :key="m" class="h1">
          Our Wedding
          <span class="title__slash">/</span>&nbsp;
        </span>
      </span>
    </div>
    <GalleryGrid with-large-cards />
    <LinkWrapper></LinkWrapper>
  </section>
</template>
<style scoped>
.gallery-section {
  margin-top: -14rem;
  overflow: hidden;
  padding-bottom: 4.75rem;
  position: relative;
  z-index: 999;
}
@media (max-width: 1023px) {
  .gallery-section {
    margin-top: 0;
    padding-bottom: 1rem;
    padding-top: 5.5rem;
  }
}
.title {
  clip-path: polygon(0 0, 100% 0, 100% 11rem, 0 11rem);
  color: var(--c-bg);
  display: flex;
}
@media (max-width: 1023px) {
  .title {
    clip-path: none;
    color: var(--c-base-1000);
    opacity: 1;
    padding: 0 var(--padding);
  }
}
@media (min-width: 1024px) {
  .title.hidden {
    opacity: 0;
  }
}
.title__item {
  animation: ticker 20s linear infinite;
  white-space: nowrap;
}
@media (max-width: 1023px) {
  .title__item {
    animation: initial;
  }
  .title__item span:last-child,
  .title__item:last-child,
  .title__slash {
    display: none;
  }
}
.gallery {
  padding-top: 4rem;
}
@media (max-width: 1023px) {
  .gallery {
    padding-top: 3.5rem;
  }
}
.link-wrapper {
  padding-top: 1.75rem;
  background: url(/flower-small.svg);
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: right;
}
.gallery-link {
  display: block;
  width: -moz-max-content;
  width: max-content;
}
</style>
