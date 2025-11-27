```vue
<template>
  <section class="contact-hero photo-anim">
    <div class="photo-inner inset"></div>
    <div class="header-gap"></div>
    <div class="title h2 mbblur">
      <span class="title-anim">
        {{ data.title.split(" ").slice(0, -1).join(" ") }}
      </span>
      <div class="title__item">
        <span class="title-anim"
          >{{ data.title.split(" ").slice(-1).join(" ") }}
        </span>
        <div class="description-wrapper text-anim">
          <p class="description l2">{{ data.description }}</p>
          <p class="caption p2">{{ data.caption }}</p>
        </div>
      </div>
    </div>
    <ContactClock />
    <div id="letter-wrapper" class="letter-wrapper">
      <ContactCard />
    </div>
  </section>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const data = ref({
  title: "Save the date",
  description: "Chủ nhật, 21 tháng 12, 2025",
  caption: "Van Son, Do Luong, Nghe An",
});
onMounted(() => {
  gsap.fromTo(
    ".photo-anim .photo-inner",
    { opacity: 0, scale: 1.1 },
    { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
  );

  // Parallax scroll animation for photo-inner
  gsap.to(".photo-anim .photo-inner", {
    y: -100, // Move upward for parallax effect
    ease: "none",
    scrollTrigger: {
      trigger: ".faq",
      start: "top bottom", // Start when the top of the section hits the bottom of the viewport
      end: "bottom top", // End when the bottom of the section hits the top of the viewport
      scrub: true, // Smoothly tie animation to scroll position
    },
  });

  // Animate title spans with fade in and gather effect
  gsap.fromTo(
    "span.title-anim",
    {
      opacity: 0,
      scale: 0.8,
      x: () => (Math.random() - 0.5) * 150, // Random scatter further apart
      y: () => (Math.random() - 0.5) * 100, // Add random Y movement
      rotation: () => (Math.random() - 0.5) * 30, // Random rotation
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1.2,
      ease: "back.out(1.7)", // Bouncy ease for gather effect
      stagger: {
        amount: 0.6,
        from: "random", // Random stagger order
      },
    }
  );

  // Animate description and caption with fade in and gather effect
  gsap.fromTo(
    ".text-anim p",
    {
      opacity: 0,
      scale: 0.9,
      x: () => (Math.random() - 0.5) * 120,
      y: () => (Math.random() - 0.5) * 80,
      rotation: () => (Math.random() - 0.5) * 20,
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1.0,
      ease: "back.out(1.4)",
      stagger: {
        amount: 0.4,
        from: "random",
      },
      delay: 0.3,
    }
  );
});
</script>

<style scoped>
.contact-hero {
  overflow: hidden;
  padding: 7.75rem var(--padding) 5.75rem;
  position: relative;
}

@media (max-width: 1023px) {
  .contact-hero {
    padding: 5.25rem 0.75rem 3.5rem;
  }
}

.photo-inner {
  --gradient: linear-gradient(
    180deg,
    hsla(44, 37%, 88%, 0.25),
    hsla(44, 37%, 88%, 0)
  );
  background-image: var(--gradient), url(/images/contact/bg-desk.webp);
  background-position: 50%;
  background-size: cover;
  z-index: var(--z-bg);
}

@media (max-width: 1023px) {
  .photo-inner {
    background-image: var(--gradient), url("/gallery/hl/LỢI HẰNG 16.1105046.jpg");
  }
}

.title {
  margin: 0 auto;
  max-width: 64.5rem;
  text-align: center;
}
@media (max-width: 1023px) {
  .title.mbblur {
    padding: 2rem;
    position: relative;

  }
  .title.mbblur::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    left: 0;
    top: 0;
    border-radius: 10px;
    opacity: 0.8;
    z-index: -1;
  }
}
.title__item {
  margin: 0 auto;
  max-width: -moz-fit-content;
  max-width: fit-content;
  position: relative;
}

@media (max-width: 1023px) {
  .title__item {
    display: inline;
  }
}

.description-wrapper {
  bottom: 0.625rem;
  left: calc(100% + 2.5rem);
  position: absolute;
  text-align: left;
}

@media (max-width: 1023px) {
  .description-wrapper {
    position: static;
  }
}

.description {
  width: 10.875rem;
}

@media (max-width: 1023px) {
  .description {
    margin: 1.5rem auto 0;
    text-align: center;
  }
}

.caption {
  margin-top: 1rem;
  padding-left: 1.4375rem;
  position: relative;
  white-space: nowrap;
}

@media (max-width: 1023px) {
  .caption {
    margin-left: auto;
    margin-right: auto;
    width: -moz-max-content;
    width: max-content;
  }
}

.caption:after,
.caption:before {
  background-color: var(--c-base-1000);
  border-radius: 50%;
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  translate: 0 -50%;
}

.caption:after {
  height: 0.25rem;
  left: 0.3125rem;
  width: 0.25rem;
}

.caption:before {
  animation: pulsation-2ca00608 2.4s var(--default-ease) 0s infinite;
  height: 0.875rem;
  left: 0;
  width: 0.875rem;
}

.letter-wrapper {
  margin-top: 6rem;
}

@media (max-width: 1023px) {
  .letter-wrapper {
    margin-top: 5.25rem;
  }
}
.letter-wrapper {
  height: 28rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 66.5rem;
  perspective: 50rem;
  position: relative;
}
@keyframes pulsation-2ca00608 {
  0% {
    opacity: 1;
    scale: 0;
  }

  50% {
    opacity: 1;
    scale: 0;
  }

  to {
    opacity: 0;
    scale: 1;
  }
}
</style>
