<template>
  <div class="footer top-line">
    <div class="info-row">
      <p class="text-anim footer-description l2" style="text-align: center">
        <span class="text-anim-line">04.01.2026 @ Viet Phuong & Thuong Huyen</span>
      </p>
    </div>
  </div>
</template>
<script setup>
import FormRspv from "../FormRspv.vue";

const rsvp_drawer = ref(false);
</script>

<style scoped>
.footer {
  overflow: hidden;
  padding: var(--padding);
  position: relative;
  z-index: var(--z-base);
}

@media (max-width: 1023px) {
  .footer {
    padding: 1.5rem var(--padding) 1rem;
  }
}

.footer:before {
  background-color: transparent;
  content: "";
  display: block;
  height: 1px;
  left: 2rem;
  position: absolute;
  top: 0;
  width: calc(100% - 4rem);
}
</style>
