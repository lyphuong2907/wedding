<script setup lang="ts">
import { defineProps } from "vue";

// Định nghĩa props
const props = defineProps<{
  text: string; // Text để hiển thị
  active?: boolean; // Trạng thái active, mặc định false
}>();
</script>

<template>
  <span :class="['p1', 'button-text', { active: props.active }]">
    {{ props.text }}
  </span>
</template>
<style scoped>
.button-text {
  color: var(--c-base-1000);
  opacity: 0.4;
  transition: opacity 0.6s var(--default-ease);
}

@media (hover: hover) {
  :hover > .button-text {
    opacity: 1;
  }
}

.active > .button-text,
.button-text.active,
:active > .button-text {
  opacity: 1;
}
</style>
