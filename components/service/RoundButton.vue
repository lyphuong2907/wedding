<template>
  <span class="button-inner" :class="[theme, 'l2']">
    <span class="button-text">{{ text }}</span>
    <span class="button-text">{{ text }}</span>
  </span>
</template>

<script lang="ts" setup>
defineProps({
  theme: {
    type: String,
    default: "light",
  },
  text: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.button-inner {
  --color: var(--text-color);
  display: inline-flex;
  overflow: hidden;
  position: relative;
}
.button-inner.light {
  --text-color: var(--c-base-0);
}
.button-inner.dark {
  --text-color: var(--c-base-1000);
}
@media (hover: hover) {
  .button-trigger:hover .button-inner .button-text,
  :hover > .button-inner .button-text {
    transform: translateY(-100%);
  }
}
.button-text {
  color: var(--color);
  display: inline-block;
  transition: transform 0.6s var(--default-ease);
}
.button-text:last-child {
  left: 0;
  position: absolute;
  top: 100%;
}
</style>
