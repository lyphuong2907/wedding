import { defineStore } from "pinia";

export const useSliderStore = defineStore("slider", () => {
  const sliders = ref({
    larger: {
      images: [
        "/gallery/DSC07770.jpg",
        "/gallery/DSC07676.jpg",
        "/gallery/DSC07754.jpg",
      ],
      images_mob: [
        "/gallery/mb_DSC07770.jpg",
        "/gallery/mb_DSC07676.jpg",
        "/gallery/mb_DSC07754.jpg",
      ],
      texts: ["Devotion", "Eternity", "Serendipity"],
    },
    smaller: {
      images: [
        "/gallery/c_DSC08718.jpg",
        "/gallery/c_DSC07971.jpg",
        "/gallery/c_DSC07881.jpg",
        
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
