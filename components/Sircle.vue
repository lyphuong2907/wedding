<script lang="ts" setup>
import { gsap } from "gsap";
import Swiper from "./service/Swiper.vue";
const { activeIndex, sliders } = storeToRefs(useSliderStore());

let smallSlider: any = null;

const setController = (slider: any, type: string) => {
  if (type === "small") smallSlider = slider;
};

const navigate = (direction: string) => {
  if (direction === "next") {
    smallSlider.slideNext();
  }
  if (direction === "prev") {
    smallSlider.slidePrev();
  }
};

const handleSlide = (index: number) => {
  gsap.to("#sircle .swiper-slide", {
    opacity: 0.7,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.1,
  });
};

onMounted(() => {
  try {
    //@ts-ignore
    smallSlider = document.querySelector("#sircle .swiper")?.swiper;
  } catch (error) {}
  if (document.querySelector("#sircle .smaller-slider-wrapper")) {
    gsap.from("#sircle .smaller-slider-wrapper", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
    });
  }
});
const { isMobile } = useDevice();
</script>
<template>
  <section v-if="isMobile" id="sircle">
    <div class="smaller-slider-wrapper">
      <div class="smaller-slider smaller-mb-slider">
        <div class="smaller-slider-inner">
          <Swiper
            :slides="sliders.smaller.images"
            @init="setController($event, 'small')"
          />
        </div>
      </div>
      <ServiceRoundText
        class="round-text"
        text="/ Together is a beautiful place to be "
      />
      <button
        aria-label="previous slide"
        rel="prev"
        class="slider-button"
        @click="navigate('prev')"
      >
        <ServiceRoundButton theme="dark" text="prev" />
      </button>
      <button
        aria-label="next slide"
        rel="next"
        class="slider-button slider-button--next"
        @click="navigate('next')"
      >
        <ServiceRoundButton theme="dark" text="next" />
      </button>
    </div>
  </section>
</template>
<style scoped>
#sircle{
  padding: 80px 0px;
  overflow: hidden;
}
.smaller-slider-wrapper {
  align-items: center;
  display: flex;
  height: auto;
  justify-content: center;
  position: relative;
  width: 100%;
 
}

@media (min-width: 1023px) {
  .smaller-slider-wrapper {
    display: none;
  }
}
.smaller-slider {
  aspect-ratio: 288/376;
  border-radius: 50%;
  height: 44.64286vh;
  overflow: hidden;
}
.smaller-slider-inner {
  border-radius: 50%;
  clip-path: inset(0 0 0 0 round 50%);
  overflow: hidden;
  padding-top: 130.5555555556%;
  position: relative;
}

.smaller-slider-inner .swiper {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
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
.round-text {
  width: 125%;
}
</style>
