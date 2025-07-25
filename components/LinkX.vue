<script setup lang="ts">
const props = defineProps({
  playfair: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
  },
  to: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);
</script>

<template>
  <NuxtLink v-if="type === 'link'" :to="to">
    <span class="button-inner l2 light">
      <span class="text-wrapper">
        <span class="button-text">{{ text }}</span>
        <span class="button-text">{{ text }}</span>
      </span>
    </span>
  </NuxtLink>
  <button @click="$emit('click')" v-else>
    <span class="button-inner l2 light">
      <span class="text-wrapper">
        <span class="button-text" :class="{'playfair-display': playfair}">{{ text }}</span>
        <span class="button-text" :class="{'playfair-display': playfair}">{{ text }}</span>
      </span>
    </span>
  </button>
</template>
<style scoped>
.button-inner {
  --background: var(--button-bg);
  --color: var(--text-color);
  background-color: var(--background);
  display: inline-flex;
  padding: 0.1875rem 0.5rem;
  transition: padding 0.6s var(--default-ease);
  width: 100%;
  will-change: padding;
}
.button-inner.light {
  --button-bg: var(--c-base-0);
  --text-color: var(--c-base-1000);
}
.button-inner.dark {
  --button-bg: var(--c-base-1000);
  --text-color: var(--c-base-0);
}
.button-inner.dark-transparent {
  --button-bg: var(--c-base-1000-10);
  --text-color: var(--c-base-1000);
}
@media (hover: hover) {
  .button-inner:hover {
    padding: 0.1875rem 0.75rem;
  }
  .button-inner:hover .button-text {
    transform: translateY(-100%);
  }
}
.text-wrapper {
  display: inline-block;
  overflow: hidden;
  position: relative;
}
.button-text {
  color: var(--color);
  display: inline-block;
  transition: transform 0.6s var(--default-ease);
  white-space: nowrap;
  line-height: initial;
}
.button-text.playfair-display {
  line-height: 36px;
}
.button-text:last-child {
  left: 0;
  position: absolute;
  top: 100%;
}
</style>
