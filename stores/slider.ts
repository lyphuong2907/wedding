import { defineStore } from "pinia";

export const useSliderStore = defineStore("slider", () => {
  const sliders = ref({
    larger: {
      images: [
        "/gallery/PH/AN_04807.jpg",
          "/gallery/PH/AN_04890.jpg",
          "/gallery/PH/AN_04972.jpg",
      ],
      images_mob: [
          "/gallery/PH/AN_04807.jpg",
          "/gallery/PH/AN_04890.jpg",
          "/gallery/PH/AN_04972.jpg",
      ],
      texts: ["Devotion", "Eternity", "Serendipity"],
    },
    smaller: {
      images: [
          "/gallery/PH/AN_01877.jpg",
          "/gallery/PH/AN_02703.jpg",
          "/gallery/PH/AN_03121.jpg",
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
