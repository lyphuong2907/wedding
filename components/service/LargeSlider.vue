<script setup lang="ts">
import Swiper from "./Swiper.vue";
import TextSlider from "./TextSlider.vue";

const { activeIndex, sliders,itemsLength } = storeToRefs(useSliderStore());
const slideChange = (index: number) => {
  activeIndex.value = index;
};
const swiperInstance = ref<any>(null);
const eventSlide = (index: number) => {
  if (index > 0) {
    swiperInstance.value.PrevSlide();
  } else {
    swiperInstance.value.NextSlide();
  }
};
const { isMobile } = useDevice();
</script>
<template>
  <div class="larger-slider">
    <Swiper
      @slideChange="slideChange"
      :autoplay="true"
      :slides="isMobile ? sliders.larger.images_mob : sliders.larger.images"
      ref="swiperInstance"
    ></Swiper>
    <div class="gradient-cover"></div>
    <TextSlider
      :texts="sliders.larger.texts"
      :activeId="activeIndex"
      animation-type="title"
    />
    <div class="controllers-wrapper">
      <button aria-label="previous slide" @click="eventSlide(-1)">
        <span class="button-inner theme l2" style="color: white;">
          <span class="button-text">prev</span></span
        >
      </button>
      <p class="slider-pagination p2" style="color: white;">{{ activeIndex + 1 }} / {{ itemsLength }}</p>
      <button aria-label="next slide" @click="eventSlide(+1)">
        <span class="button-inner theme l2" style="color: white;">
          <span class="button-text">next</span>
        </span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.larger-slider {
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 50%;
}

@media (max-width: 1023px) {
  .larger-slider {
    height: calc(100% - 10.25rem);
    width: 100%;
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
</style>
