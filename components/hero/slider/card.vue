<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { gsap } from "gsap";

const { isTablet } = useDevice();
const imageRef = ref<any>(null);

const props = defineProps<{
  photo: any;
}>();

const hideData = true; // From HTML (card-content is display: none)

// Computed properties
const cardElement = computed(() => imageRef.value?.closest(".card"));
const cardInner = computed(() =>
  cardElement.value?.querySelector(".card-inner")
);
const cardContent = computed(() =>
  cardElement.value?.querySelector(".card-content")
);

const isLandscape = computed(() => {
  return props.photo.width > props.photo.height;
});

const aspectRatio = computed(() => {
  return props.photo.width && props.photo.height
    ? props.photo.width / props.photo.height
    : 0;
});

const cardStyles = computed(() => ({
  "--width": isLandscape.value ? "100%" : "auto",
  "--height": isLandscape.value ? "auto" : "100%",
  "--width-mob": aspectRatio.value < 0.77 ? "auto" : "100%",
  "--height-mob": aspectRatio.value < 0.77 ? "100%" : "auto",
}));
const { isDesktop } = useDevice();

const pictureRef = ref<any>(null);
// Center card content
const centerContent = () => {
  if (
    !pictureRef.value ||
    !cardInner.value ||
    !cardContent.value ||
    hideData ||
    isTablet
  )
    return;
  const offset =
    (cardInner.value.offsetHeight - pictureRef.value.offsetHeight) / 2;
  cardContent.value.style.transform = `translateY(${-offset}px)`;
};
// Debounced centering
const debouncedCenter = useDebounceFn(centerContent, 200);
useIntersectionObserver(debouncedCenter);

// Image load handling
const onImageLoad = (callback: any, immediate = false) => {
  if (imageRef.value) {
    if (immediate && imageRef.value.complete) {
      callback();
    } else {
      imageRef.value.addEventListener("load", callback, { once: true });
    }
  }
};

// Intersection observer for lazy loading
let observer: any = null;
const setupObserver = () => {
  const img = pictureRef.value?.querySelector("img");
  const source = pictureRef.value?.querySelector("source");
  if (!cardElement.value || !img || !source) return;

  observer = new IntersectionObserver(
    ([{ isIntersecting }]) => {
      if (isIntersecting && img && props.photo && source) {
        onImageLoad(() => {
          centerContent();
          fadeIn();
        });
        if(!isDesktop){
          img.src = props.photo.original;
          source.srcset = props.photo.original;
        }else{
          img.src = props.photo.thumbnail;
          source.srcset = props.photo.thumbnail;
        }
        observer?.disconnect();
      }
    },
    { root: null, threshold: 0 }
  );
  cardElement.value && observer.observe(cardElement.value);
};

// GSAP animations
const isFading = ref(false);

const fadeIn = async () => {
  if (cardElement.value) {
    await gsap.to(cardElement.value, {
      opacity: 1,
      duration: 0.4,
      ease: "default-ease",
    });
    isFading.value = false;
  }
};

const fadeOut = async () => {
  if (cardElement.value) {
    await gsap.to(cardElement.value, {
      opacity: 0,
      duration: 0.4,
      ease: "default-ease",
    });
    isFading.value = true;
  }
};

// Lifecycle
onMounted(() => {
  onImageLoad(fadeIn, true);
  setupObserver();
});

onUnmounted(() => {
  observer?.disconnect();
});
const photoUrl = computed(() => {
  
  return isDesktop ? props.photo.original : props.photo.thumbnail;
});
</script>
<template>
  <div class="card" :style="cardStyles">
    <div class="card-inner">
      <div class="card-thumb">
        <picture ref="pictureRef" class="card-image">
          <source media="(max-width: 1023px)" :srcset="photoUrl" />
          <img
            ref="imageRef"
            class="card-image"
            :src="photoUrl"
            draggable="true"
            alt="image"
            width="500"
            height="500"
          />
        </picture>
      </div>
  
    </div>
  </div>
</template>
<style scoped>
.card {
  --padding: var(--card-padding, 1.5rem);
  aspect-ratio: 1;
  display: block;
  opacity: 0;
  padding: var(--padding);
  position: relative;
  width: 100%;
}
@media (max-width: 1023px) {
  .card {
    --padding: var(--card-mob-padding, 0.5rem);
    aspect-ratio: unset;
    padding: var(--padding);
  }
}
.card-inner {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  transition: transform 0.6s var(--default-ease);
  width: 100%;
}
@media (max-width: 1023px) {
  .card-inner {
    display: block;
    height: auto;
  }
}
@media (hover: hover) {
  .card:hover {
    z-index: calc(var(--z-base) * 2);
  }
  .card:hover .card-inner {
    transform: scale(1.05);
  }
}
.card-thumb {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  perspective: 62.5rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  width: 100%;
}
@media (max-width: 1023px) {
  .card-thumb {
    height: auto;
  }
}
.card-image {
  border-radius: 0.375rem;
  display: block;
  height: var(--height);
  max-height: 100%;
  max-width: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s linear;
  width: var(--width);
  will-change: transform;
}
@media (max-width: 1023px) {
  .card-image {
    height: auto;
    max-height: unset;
    width: 100%;
  }
}
.card-content {
  margin-top: 2rem;
  pointer-events: none;
  position: absolute;
  text-align: center;
  top: 100%;
  transition: transform 0.6s var(--default-ease);
}
@media (max-width: 1023px) {
  .card-content {
    margin-top: 0.75rem;
    position: relative;
    top: unset;
  }
  .card-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
.card-price {
  color: var(--c-base-1000-40);
  margin-top: var(--offset-2);
}
</style>
