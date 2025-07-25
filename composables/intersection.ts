// composables/intersection.js
import { onMounted, onUnmounted, ref } from "vue";

export function useIntersectionObserver(callback: any, options: any = {}) {
  const { root = null, rootMargin = "0px", threshold = 0 } = options;
  const element = ref<any>(null);

  let observer: any = null;

  onMounted(() => {
    if (element.value) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            callback();
            // Optionally disconnect after first intersection
            // observer?.disconnect();
          }
        },
        { root, rootMargin, threshold }
      );
      observer.observe(element.value);
    }
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return { element };
}
