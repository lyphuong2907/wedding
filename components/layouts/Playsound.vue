<script setup lang="ts"></script>
<template>
  <button class="sound-button" type="button" aria-label="sound button">
    <div class="button-icon">
      <!--[--><span class="button-icon__item"></span
      ><span class="button-icon__item"></span
      ><span class="button-icon__item"></span
      ><!--]-->
    </div>
    <span class="mob l2">Play sound</span>
  </button>
</template>
<style scoped>
.sound-button {
  align-items: center;
  display: flex;
  gap: 0.25rem;
}
.sound-button.active .button-icon__item {
  animation-play-state: running;
}
.button-icon__item {
  animation: bar-389007f6 0.4s ease 0s infinite alternate both;
  animation-play-state: paused;
}
.button-icon__item:first-child {
  animation-delay: 0.2s;
}
.button-icon__item:nth-child(2) {
  animation-delay: 0.4s;
}
.button-icon__item:nth-child(3) {
  animation-delay: 0.6s;
}
.button-icon {
  height: 1.25rem;
  position: relative;
  width: 1.25rem;
}
@media (max-width: 1023px) {
  .button-icon {
    height: 0.875rem;
    width: 0.875rem;
  }
}
.button-icon__item {
  background-color: var(--header-color);
  bottom: 0.125rem;
  display: block;
  height: calc(100% - 0.25rem);
  position: absolute;
  transform: scaleY(0.5);
  transform-origin: bottom;
  transition: background-color 0.4s var(--default-ease);
  width: 0.125rem;
}
@media (max-width: 1023px) {
  .button-icon__item {
    background-color: var(--c-base-1000);
    bottom: 0.0875rem;
    height: calc(100% - 0.175rem);
    width: 0.0875rem;
  }
}
.button-icon__item:first-child {
  left: 0.1875rem;
}
@media (max-width: 1023px) {
  .button-icon__item:first-child {
    left: 0.13125rem;
  }
}
.button-icon__item:nth-child(2) {
  left: 0.625rem;
}
@media (max-width: 1023px) {
  .button-icon__item:nth-child(2) {
    left: 0.39375rem;
  }
}
.button-icon__item:nth-child(3) {
  left: 1.0625rem;
}
@media (max-width: 1023px) {
  .button-icon__item:nth-child(3) {
    left: 0.65625rem;
  }
}
@keyframes bar-389007f6 {
  0% {
    transform: scaleY(0.5);
  }
  to {
    transform: scaleY(1);
  }
}
</style>
