<script setup lang="ts">
const tickers = [
  {
    image: "/images/clouds/image0.webp",
    style: {
      "--ticker-duration": "80s",
      "--width": "3166",
      "--height": "1302px",
      "--offset": "-931",
      top: "0",
      bottom: "unset",
    },
  },
  {
    image: "/images/clouds/image1.webp",
    style: {
      "--ticker-duration": "90s",
      "--width": "3129",
      "--height": "1300",
      "--offset": "-1253",
      top: "0",
      bottom: "unset",
    },
  },
  {
    image: "/images/clouds/image2.webp",
    style: {
      "--ticker-duration": "100s",
      "--width": "2453",
      "--height": "1175",
      "--offset": "-375",
      top: "unset",
      bottom: "0",
    },
  },
  {
    image: "/images/clouds/image3.webp",
    style: {
      "--ticker-duration": "110s",
      "--width": "2868",
      "--height": "1061",
      "--offset": "-468",
      top: "unset",
      bottom: "0",
    },
  },
];
</script>

<template>
  <div class="tickers-wrapper inset">
    <div
      v-for="(ticker, index) in tickers"
      :key="index"
      class="ticker"
      :style="ticker.style"
    >
      <div v-for="i in 2" :key="i" class="ticker__item">
        <img class="inner-img" role="presentation" :src="ticker.image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tickers-wrapper {
  height: 100vh;
  height: 100lvh;
  overflow: hidden;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  z-index: var(--z-base);
}
.cloud-image,
.ticker {
  position: absolute;
}
.ticker {
  display: flex;
  left: calc(var(--offset) / 16 * 1rem);
}
.ticker__item {
  animation: ticker var(--ticker-duration) linear infinite;
  height: calc(var(--height) / 16 * 1rem);
  position: relative;
  width: calc(var(--width) / 16 * 1rem);
}
@media (max-width: 1023px) {
  .ticker__item {
    height: calc(var(--height) / 1.5 / 16 * 1rem);
    width: calc(var(--width) / 1.5 / 16 * 1rem);
  }
}

@keyframes ticker {
  0% {
    transform: translate(0);
  }

  to {
    transform: translate(-100%);
  }
}
</style>
