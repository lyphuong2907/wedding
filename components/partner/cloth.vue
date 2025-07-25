<template>
  <canvas ref="canvasEl" class="canvas"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

// Canvas ref
const canvasEl = ref<any>(null);
let ctx: CanvasRenderingContext2D | null = null;

// Constants
const FRAME_COUNT = 249;
const BASE_WIDTH = 1280;
const BASE_HEIGHT = 768;

// Image storage
const clothSequenceFrames = ref<Record<number, HTMLImageElement>>({});
let worker: Worker | null = null;

// Frame index and animation state
const currentFrame = ref(0);
const loadedFrames = ref(0);
let animationFrameId: number | null = null;
let observer: IntersectionObserver | null = null;
let shouldRender = true;

// Cover properties for image scaling
const cover = {
  coverX: 1,
  coverY: 1,
  coverW: 1,
  coverH: 1,
};

// Setup canvas size and context
const setupCanvas = () => {
  ctx = canvasEl.value?.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvasEl.value.width = canvasEl.value.clientWidth * dpr;
  canvasEl.value.height = canvasEl.value.clientHeight * dpr;
  calculateCover(BASE_WIDTH, BASE_HEIGHT);
};

// Calculate cover properties for image rendering
const calculateCover = (width: number, height: number) => {
  if (!ctx) return;

  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  const scaleX = 0.5;
  const scaleY = 0.5;

  let scale = Math.min(canvasWidth / width, canvasHeight / height);
  let scaledWidth = width * scale;
  let scaledHeight = height * scale;
  let scaleFactor = 1;

  if (scaledWidth < canvasWidth) {
    scaleFactor = canvasWidth / scaledWidth;
  } else if (Math.abs(scaleFactor - 1) < 1e-14 && scaledHeight < canvasHeight) {
    scaleFactor = canvasHeight / scaledHeight;
  }

  scaledWidth *= scaleFactor;
  scaledHeight *= scaleFactor;

  cover.coverW = Math.max(0, width / (scaledWidth / canvasWidth));
  cover.coverH = Math.max(0, height / (scaledHeight / canvasHeight));
  cover.coverX = Math.min(width, (width - cover.coverW) * scaleX);
  cover.coverY = Math.min(height, (height - cover.coverH) * scaleY);
};

// Draw image on canvas
const drawImage = (image: HTMLImageElement | undefined) => {
  if (!ctx || !(image instanceof HTMLImageElement)) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(
    image,
    cover.coverX,
    cover.coverY,
    cover.coverW,
    cover.coverH,
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  );
};

// Setup Web Worker for loading image sequence
const setupWorker = () => {
  worker = new Worker("/worker/sequence-loader.js");
  worker.onmessage = ({ data: { imageSrc, index, error } }) => {
    if (error) {
      console.error(`Error loading image at index ${index}: ${error}`);
      return;
    }
    if (!imageSrc || index === undefined) {
      console.warn(`Invalid imageSrc or index: ${index}`);
      return;
    }

    const img = new Image();
    img.onload = () => {
      clothSequenceFrames.value[index] = img;
      loadedFrames.value += 1;
      if (index === 0 && !animationFrameId) {
        drawImage(img);
        startAnimation();
      }
      if (index === FRAME_COUNT - 1) {
        worker?.terminate();
      }
      URL.revokeObjectURL(img.src);
    };
    img.src = imageSrc;
  };
};

// Send message to Web Worker to load images
const loadImages = () => {
  const baseUrl = document.location.origin;
  worker?.postMessage({
    baseUrl,
    count: FRAME_COUNT,
    prefix: "/images/sequences/cloth/image",
    numberLength: 5,
  });
};

// Animation loop
const animate = () => {
  if (shouldRender) {
    const image = clothSequenceFrames.value[currentFrame.value];
    if (image instanceof HTMLImageElement) {
      drawImage(image);
    } else {
      console.warn(`Image not loaded for frame ${currentFrame.value}`);
    }
    currentFrame.value = (currentFrame.value + 1) % FRAME_COUNT;
  }
  shouldRender = !shouldRender;
  animationFrameId = requestAnimationFrame(animate);
};

// Start animation
const startAnimation = () => {
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(animate);
  }
};

// Stop animation
const stopAnimation = () => {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

// Setup IntersectionObserver
const setupObserver = () => {
  observer = new IntersectionObserver(
    ([{ isIntersecting }]) => {
      if (isIntersecting && loadedFrames.value > 0) {
        startAnimation();
      } else {
        stopAnimation();
      }
    },
    { threshold: 0 }
  );
  if (canvasEl.value) observer.observe(canvasEl.value);
};

// Lifecycle hooks
onMounted(() => {
  if (Object.keys(clothSequenceFrames.value).length === 0) {
    setupWorker();
    loadImages();
  }
  setupCanvas();
  setupObserver();
});

onUnmounted(() => {
  observer?.disconnect();
  worker?.terminate();
  stopAnimation();
});
</script>

<style scoped>
.canvas {
  height: 48rem;
  pointer-events: none;
  position: absolute;
  right: 0.8125rem;
  top: 10.875rem;
  width: 80rem;
  z-index: var(--z-base);
}

@media (max-width: 1023px) {
  .canvas {
    height: 14.0625rem;
    right: 0;
    top: 5.5rem;
    width: 100%;
  }
}
</style>
