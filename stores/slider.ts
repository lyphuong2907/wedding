import { defineStore } from "pinia";

export const useSliderStore = defineStore("slider", () => {
  const sliders = ref({
    larger: {
      images: [
        "/gallery/hl/LỢI HẰNG 16.1105046.jpg",
          "/gallery/hl/LỢI HẰNG 16.1105504.jpg",
          "/gallery/hl/LỢI HẰNG 16.1105580.jpg",
      ],
      images_mob: [
          "/gallery/hl/LỢI HẰNG 16.1105669.jpg",
          "/gallery/hl/LỢI HẰNG 16.1105282.jpg",
          "/gallery/hl/LỢI HẰNG 16.1105965.jpg",
      ],
      texts: ["Devotion", "Eternity", "Serendipity"],
    },
    smaller: {
      images: [
          "/gallery/hl/LỢI HẰNG 16.1104871.jpg",
          "/gallery/hl/LỢI HẰNG 16.1105386.jpg",
          "/gallery/hl/LỢI HẰNG 16.1105476.jpg",
      ],
    },
  });

  const itemsLength = computed(() => {
    return sliders.value.larger.images.length;
  });

  const activeIndex = ref(0);

  return {
    sliders,
    activeIndex,
    itemsLength,
  };
});
