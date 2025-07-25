<script lang="ts" setup></script>
<template>
  <div class="gallery-link" data-v-f6329542="">
    <span class="button-inner h2 reverse" aria-label="view  catalogue">
      <span class="line" aria-hidden="true" style="text-align: start">
        view
      </span>
      <span class="line" aria-hidden="true" style="text-align: start">
        catalogue
      </span>
    </span>
  </div>
</template>
<style scoped>
.gallery-link {
  width: -moz-max-content;
  width: max-content;
}

.button-inner .line {
  display: block;
  position: relative;
  width: -moz-fit-content;
  width: fit-content;
}

.button-inner .line:after {
  background-color: currentColor;
  bottom: -0.03125rem;
  content: "";
  display: block;
  height: 0.0625rem;
  left: 0;
  position: absolute;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s var(--default-ease);
  width: 100%;
}

.button-inner.reverse .line:after {
  transform: scale(1);
  transform-origin: left;
}

@media (hover: hover) {
  .button-trigger > .button-inner .line:after,
  :hover > .button-inner .line:after {
    transform: scaleX(1);
    transform-origin: left;
  }

  .button-trigger > .button-inner.reverse .line:after,
  :hover > .button-inner.reverse .line:after {
    transform: scaleX(0);
    transform-origin: right;
  }
}

.disabled > .button-inner .line:after {
  opacity: 0;
}
</style>
