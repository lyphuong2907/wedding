<script setup lang="ts">
import gsap from 'gsap';

const cursorWrapper = ref(null);

const handleMouseMove = (event: MouseEvent) => {
  if (!cursorWrapper.value) return;
  gsap.to(cursorWrapper.value, {
    x: event.clientX - 40, // Căn giữa con trỏ
    y: event.clientY - 40,
    duration: 0.3,
    ease: "power2.out",
  });
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <div ref="cursorWrapper" class="cursor-wrapper">
    <slot />
  </div>
</template>

<style scoped>
.cursor-wrapper {
  position: fixed;
  pointer-events: none;
  z-index: 1000;
}

.cursor {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cursor.show {
  opacity: 1;
}

.cursor-inner {
  font-size: 14px;
  color: white;
  text-align: center;
}
</style>
