<script setup lang="ts">
import gsap from "gsap";

const galleryData = ref([
  {
    id: "1",
    image: "/gallery/hl/LỢI HẰNG 16.1104943.jpg",
  },
  {
    id: "2",
    image: "/gallery/PH/conmeo.jpeg",
  },
  {
    id: "3",
    image: "/gallery/hl/LỢI HẰNG 16.1105282.jpg",
  },
  
]);

const galleryWrapper = ref<any>(null);
let initialHeight = 0;
let galleryHeight = 0;

// Clear GS height
function clearGalleryHeight() {
  if (galleryWrapper.value) {
    gsap.set("height", { height: "auto" });
  }
}

// Watch data changes (simulated for completeness)
watch(galleryData, async () => {
  await nextTick();
  const gallery = galleryWrapper.value?.querySelector("#gallery");
  if (!galleryWrapper.value || !gallery) return;

  initialHeight = galleryWrapper.value.offsetHeight;
  galleryHeight = gallery.offsetHeight;
  gsap.set(galleryWrapper.value, { height: initialHeight });

  await nextTick();
  setTimeout(() => {
    const updatedGallery = galleryWrapper.value?.querySelector("#gallery");
    if (!galleryWrapper.value || !updatedGallery) return;
    gsap.to(galleryWrapper.value, {
      height: initialHeight - (galleryHeight - updatedGallery.offsetHeight),
      duration: 0.4,
      ease: "default-ease",
    });
  }, 200);
});

// Initialize on mount
onMounted(() => {
  setTimeout(() => {
    clearGalleryHeight();
  }, 500);
});

// Debounced resize handler
const handleResize = useDebounceFn(() => {
  if (galleryWrapper.value) {
    gsap.set(galleryWrapper.value, { clearProps: "height" });
  }
}, 500);
</script>
<template>
  <div ref="galleryWrapper" class="gallery">
    <div id="gallery">
      <ul :class="['gallery-list', { 'large-cards': true }]">
        <li
          v-for="(item, index) in galleryData"
          :key="index"
          class="gallery-list__item"
        >
          <div class="gallery-list__card">
            <GalleryCard :data="item" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.gallery {
  overflow: hidden;
  padding: var(--offset-48) var(--padding) 9.75rem;
}
@media (max-width: 1023px) {
  .gallery {
    padding-bottom: 7.25rem;
    padding-top: 5.5rem;
    position: relative;
  }
  .gallery-section .gallery {
    padding-bottom: 2.75rem;
  }
}
.gallery-list {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  list-style: none;
  row-gap: 5.75rem;
  --card-padding: 0.5rem;
}
@media (max-width: 1023px) {
  .gallery-list {
    -moz-column-gap: 0.75rem;
    column-gap: 0.75rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    --card-mob-padding: 0;
    row-gap: 1rem;
  }
}
.gallery-list__item {
  display: grid;
  grid-column: span 2;
  place-items: center;
}
@media (max-width: 1023px) {
  .gallery-list__item {
    grid-column: unset;
  }
}
.gallery-list__card {
  display: contents;
}
.gallery-list.large-cards .gallery-list__item:nth-child(5n + 4) {
  grid-column: 1/4;
}
@media (max-width: 1023px) {
  .gallery-list.large-cards .gallery-list__item:nth-child(5n + 4) {
    grid-column: unset;
    grid-row: unset;
  }
}
.gallery-list.large-cards .gallery-list__item:nth-child(5n + 5) {
  grid-column: 4/-1;
}
@media (max-width: 1023px) {
  .gallery-list.large-cards .gallery-list__item:nth-child(5n + 5) {
    grid-column: 1/-1;
  }
  .gallery-section
    .gallery-list.large-cards
    .gallery-list__item:nth-child(5n + 5) {
    grid-column: unset;
    grid-row: unset;
  }
  .gallery-section
    .gallery-list.large-cards
    .gallery-list__item:nth-child(5n + 3) {
    grid-column: 1/-1;
  }
}
@media (hover: hover) {
  .gallery-list.large-cards
    .gallery-list__item:nth-child(5n + 4)
    .card:hover
    .card-inner,
  .gallery-list.large-cards
    .gallery-list__item:nth-child(5n + 5)
    .card:hover
    .card-inner {
    transform: scale(1.03);
  }
}
</style>
