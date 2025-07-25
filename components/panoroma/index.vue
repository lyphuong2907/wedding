<template>
  <div>
    <Flicking
      ref="flickingRef"
      :options="flickingOptions"
      class="flicking-coverflow"
    >
      <div
        v-for="index in 5"
        :key="index - 1"
        class="flicking-panel"
        style="background-color: red"
        :style="getCoverflowStyle(index - 1)"
      >
        <span class="flicking-index" style="min-width: 30%;">1 Panel {{ index }} </span>
      </div>
    </Flicking>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";

const flickingRef = ref(null);

const flickingOptions = reactive({
  circular: true,
});

const { indexProgress } = useFlickingReactiveAPI(flickingRef);

const length = 5;

const getCoverflowStyle = (index) => {
  const childProgress =
    ((index - indexProgress.value + length * 1.5) % length) - length * 0.5;
  const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);

  return {
    transformOrigin: `${50 - childProgress * 50}% 50%`,
    transform: `rotateY(${-childProgress * 50}deg) scale(${scale})`,
  };
};
</script>
<style>
@import url("node_modules/@egjs/vue3-flicking/dist/flicking.css");
</style>
