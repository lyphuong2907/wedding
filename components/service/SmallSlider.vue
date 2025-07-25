<script lang="ts" setup>
import { gsap } from "gsap";
import Swiper from "./Swiper.vue";
const { activeIndex, sliders } = storeToRefs(useSliderStore());

const activeId = ref(0);
let largeSlider: any = null;
let smallSlider: any = null;

const props = defineProps({
  isDesktop: {
    type: Boolean,
    default: false,
  },
});

const setController = (slider: any, type: string) => {
  if (type === "large") largeSlider = slider;
  else if (type === "small") smallSlider = slider;
  syncControllers();
};

const syncControllers = () => {
  if (largeSlider && smallSlider) {
    largeSlider.controller.control = smallSlider;
  }
};

const navigate = (direction: string) => {
  if (!largeSlider) return;
  if (direction === "next") {
    largeSlider.slideNext();
    smallSlider.slideNext();
  }
  if (direction === "prev") {
    largeSlider.slidePrev();
    smallSlider.slidePrev();
  }
};

const handleSlide = (index: number) => {
  activeId.value = index;
  // GSAP animation for slide change
  gsap.to(".larger-slider .swiper-slide", {
    opacity: 0.7,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.1,
  });
  gsap.to(".smaller-slider .swiper-slide", {
    opacity: 0.7,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.1,
  });
};

onMounted(() => {
  try {
    //@ts-ignore
    largeSlider = document.querySelector(".services .larger-slider .swiper")?.swiper;
    //@ts-ignore
    smallSlider = document.querySelector(".services .smaller-slider .swiper")?.swiper;
  } catch (error) {}
  // Initialize GSAP animations
  gsap.from(".larger-slider", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
  if (props.isDesktop) {
    gsap.from(".services .smaller-slider-wrapper", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
    });
  }
});
</script>
<template>
  <div v-if="isDesktop" class="smaller-slider-wrapper">
    <div class="smaller-slider">
      <div class="smaller-slider-inner">
        <Swiper
          :slides="sliders.smaller.images"
          no-drag
          @init="setController($event, 'small')"
        />
      </div>
    </div>
    <ServiceRoundText
      class="round-text"
      text="/ Contemporary Aesthetic Of Spaces "
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
</template>
<style scoped>
.smaller-slider-wrapper {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  position: relative;
  width: 50%;
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
</style>
