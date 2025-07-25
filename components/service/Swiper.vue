<script setup lang="ts">
import { Controller, Parallax, Autoplay } from "swiper/modules";
import Swiper from "swiper";
import gsap from "gsap";

const props = defineProps({
  slides: {
    type: Array as PropType<string[]>,
    default: [],
  },
  noDrag: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
});

const sliderEl = ref<HTMLElement | null>(null);
let swiperInstance: Swiper | null = null;

const thumbnail = ref("thumbnail");

const isLandscape = (slide: string) => {
  return true;
};

const applyMaskEffect = (swiper: Swiper) => {
  const { slides, slidesSizesGrid, translate, width } = swiper;
  const center = -translate + width / 2;

  slides.forEach((slide, index) => {
    const photoWrapper = (slide as HTMLElement).querySelector(".photo-wrapper");
    if (!photoWrapper) return;

    const slideOffset = (slide as any).swiperSlideOffset;
    const slideWidth = slidesSizesGrid[index];
    const progress = (center - slideOffset - slideWidth / 2) / slideWidth;

    const threshold = 1.5;
    const clampedProgress = Math.max(-threshold, Math.min(threshold, progress));
    const scaleX = Math.abs(clampedProgress / threshold) * 0.3 + 1; // 1 to 1.3
    const scaleY = Math.abs(clampedProgress / threshold) * 0.02 + 1; // 1 to 1.02
    const translateX = slideWidth * 0.3 * (clampedProgress / threshold); // Parallax factor 0.3

    let transformOrigin = "center center";
    if (Math.abs(progress) > 0.05) {
      transformOrigin = progress > 0 ? "right center" : "left center";
    }

    gsap.to(photoWrapper, {
      x: translateX,
      scaleX: scaleX,
      scaleY: scaleY,
      transformOrigin: transformOrigin,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    const zIndex = -Math.abs(progress) * 10 + 10;
    slide.style.zIndex = Math.round(zIndex).toString();
  });
};

const emit = defineEmits(["init", "slideChange"]);

const initSwiper = () => {
  if (!sliderEl.value) return;

  const swiperOptions: any = {
    modules: [Controller, Parallax, Autoplay],
    slidesPerView: 1,
    allowTouchMove: !props.noDrag,
    speed: 1000,
    loop: true,
    effect: "slide",
    watchSlidesProgress: true,
    cssMode: false,
    on: {
      afterInit(swiper: any) {
        emit("init", swiper);
        applyMaskEffect(swiper);
        emit("slideChange", swiper.realIndex);
      },
      slideChange(swiper: any) {
        applyMaskEffect(swiper);
        emit("slideChange", swiper.realIndex);
      },
      progress(swiper: any) {
        if (!swiper.progressThrottle) {
          swiper.progressThrottle = setTimeout(() => {
            applyMaskEffect(swiper);
            swiper.progressThrottle = null;
          }, 20);
        }
      },
      setTranslate(swiper: any) {
        applyMaskEffect(swiper);
      },
    },
  };

  if (props.autoplay) {
    swiperOptions.autoplay = { delay: 3000 };
  }

  swiperInstance = new Swiper(sliderEl.value, swiperOptions);
};

const setThumbnail = () => {
  if (!sliderEl.value) return;
  const pixelRatio = window.devicePixelRatio;
  const width = sliderEl.value.clientWidth * pixelRatio;
  thumbnail.value = getThumbnailSize(width);
};

const getThumbnailSize = (width: number) => {
  return "thumbnail";
};

onMounted(() => {
  initSwiper();
  setThumbnail();
});

const PrevSlide = () => {
  if (swiperInstance) swiperInstance.slidePrev();
};
const NextSlide = () => {
  if (swiperInstance) swiperInstance.slideNext();
};
defineExpose({
  PrevSlide,
  NextSlide,
});
onUnmounted(() => {
  if (swiperInstance) swiperInstance.destroy();
});
</script>

<template>
  <div ref="sliderEl" class="swiper swiper-mask">
    <div class="swiper-wrapper">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="swiper-slide"
        :style="{
          '--width': isLandscape(slide) ? '100%' : 'auto',
          '--height': isLandscape(slide) ? 'auto' : '100%',
        }"
      >
        <div class="photo-wrapper">
          <NuxtImg
            class="inner-img"
            :src="slide"
            role="presentation"
            draggable="false"
            format="webp"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper {
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.swiper-wrapper {
  transition-timing-function: var(--swiper-mask-ease);
}

.photo-wrapper {
  height: 100%;
  position: relative;
}

.swiper-slide .inner-img {
  transition: transform 1400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center center;
  will-change: transform;
}

.swiper-slide-active .inner-img {
  transform: scale(1);
}

.swiper-slide-prev .inner-img,
.swiper-slide-next .inner-img {
  transform: scale(1.1);
}

/* Container cho mask effect */
.swiper.swiper-container-mask .swiper-slide {
  overflow: hidden;
}

.swiper.swiper-container-mask .swiper-slide .inner-img {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
