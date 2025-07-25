<script lang="ts" setup>
const props = defineProps({
  data: Object,
  isFetchingData: Boolean,
  lazyLoading: String,
});
</script>
<template>
  <div class="card" style="--width: auto; --height: 100%; --width-mob: 100%; --height-mob: auto; opacity: 1;">
    <div class="card-inner">
      <div class="card-thumb">
        <picture class="card-image" v-if="!isFetchingData">
          <source
            media="(max-width: 1023px)"
            :srcset="data?.imageMobile || data?.image"
          />
          <NuxtImg
            class="card-image"
            :src="data?.image"
            draggable="false"
            :alt="data?.title"
            width="500"
            height="500"
            loading="lazy"
            format="webp"
          />
        </picture>
      </div>
      <div class="card-content">
        <h3 class="card-title p2">{{ data?.title }}</h3>
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
  .card[data-v-7cf2248b]:hover {
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
