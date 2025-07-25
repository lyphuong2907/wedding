<script setup lang="ts">
import LargeSlider from "./LargeSlider.vue";
import SmallSlider from "./SmallSlider.vue";
const {isDesktop} = useDevice()
</script>

<template>
  <section class="services">
    <LargeSlider></LargeSlider>
    <SmallSlider :isDesktop="isDesktop"></SmallSlider>
  </section>
</template>
<style scoped>
.services {
  display: flex;
  height: 100vh;
  height: 100lvh;
  overflow: hidden;
  position: relative;
}
@media (max-width: 1023px) {
  .services {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.description-wrapper,
.round-text {
  left: 50%;
  position: absolute;
  z-index: var(--z-base);
}
.description-wrapper {
  bottom: 67.14286vh;
  transform: translate(-50%);
  width: 14.75rem;
}
@media (max-width: 1023px) {
  .description-wrapper {
    bottom: 55%;
  }
}

.slider-button {
  left: 2rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
@media (max-width: 1023px) {
  .slider-button {
    left: 1rem;
  }
}
.slider-button--next {
  left: unset;
  right: 2rem;
}
@media (max-width: 1023px) {
  .slider-button--next {
    right: 1rem;
  }
}
.controllers-wrapper {
  display: none;
}
@media (max-width: 1023px) {
  .controllers-wrapper {
    bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    left: 1rem;
    position: absolute;
    width: calc(100% - 2rem);
    z-index: var(--z-base);
  }
}
.slider-pagination {
  color: var(--c-base-0);
}
.description-text {
  --text-color: var(--c-base-1000);
  bottom: 2rem;
  position: absolute;
  right: 2rem;
  width: 21.5rem;
}
@media (max-width: 1023px) {
  .description-text {
    bottom: var(--offset-32);
    margin: 0 auto;
    position: relative;
    right: unset;
    width: calc(100% - 2rem);
  }
}
.description-text .text {
  text-align: initial;
}
@media (max-width: 1023px) {
  .description-text .text-anim-line:nth-child(n + 7) {
    display: none !important;
  }
}
</style>
