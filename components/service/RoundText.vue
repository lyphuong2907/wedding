<template>
  <div id="circular-text-wrapper" class="icon-wrapper">
    <svg
      width="488"
      height="488"
      viewBox="0 0 488 488"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          id="circleTextPath"
          d="M401.5 243.67C401.5 300.363 383.902 351.672 355.472 388.796C327.043 425.92 287.804 448.839 244.5 448.839C201.196 448.839 161.957 425.92 133.528 388.796C105.098 351.672 87.5 300.363 87.5 243.67C87.5 186.976 105.098 135.667 133.528 98.5432C161.957 61.4195 201.196 38.5 244.5 38.5C287.804 38.5 327.043 61.4195 355.472 98.5432C383.902 135.667 401.5 186.976 401.5 243.67Z"
          fill="none"
          stroke="red"
        ></path>
      </defs>
      <text>
        <textPath startOffset="0%" href="#circleTextPath">
          / &nbsp;&nbsp;&nbsp;&nbsp; The beginning of forever &nbsp;&nbsp;&nbsp;&nbsp;/ &nbsp;&nbsp;&nbsp;&nbsp; The beginning of forever &nbsp;&nbsp;&nbsp;&nbsp;

          
        </textPath>
        <textPath startOffset="-100%" href="#circleTextPath">
          /&nbsp;&nbsp;&nbsp;&nbsp; From this day forward, we walk hand in hand &nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp;&nbsp; we walk hand in hand 
          &nbsp;&nbsp;&nbsp;&nbsp;  C’est la vie &nbsp;&nbsp;&nbsp;&nbsp;

        </textPath>
      </text>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

defineProps({
  text: {
    type: String,
    default: "/ Contemporary Aesthetic Of Spaces ",
  },
});
var animation = ref<any>(null);
onMounted(() => {
  animation.value = gsap.to("#circular-text-wrapper textPath", {
    attr: { startOffset: (index) => (index ? "0%" : "100%") },
    ease: "none",
    scrollTrigger: {
      trigger: "#circular-text-wrapper",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
});
onUnmounted(() => {
  if (animation.value) {
    animation.value.kill();
  }
});
</script>

<style scoped>
.icon-wrapper {
  aspect-ratio: 1/1;
  pointer-events: none;
}
svg {
  height: 100%;
  width: 100%;
}
textPath {
  font-family: var(--font-canela-light);
  font-size: 33.68px;
  font-weight: 300;
  line-height: 33.55px;
  fill: var(--icon-color, var(--c-base-1000));
}

.round-text {
  left: 50%;
  position: absolute;
  z-index: var(--z-base);
}
.round-text {
  opacity: 0.32;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 67.7777777778%;
}
</style>
