<script setup lang="ts"></script>
<template>
  <div class="player">
    <video
      src="https://cdn.boyd.ae/i_Stock_1324736083_f332cbb028.mp4#t=0.01"
      class="video"
      preload="metadata"
      autoplay="true"
      playsinline="true"
      loop="true"
    ></video>
    <div class="gradient-cover"></div>
  </div>
</template>
<style scoped>
.player {
  height: 100%;
  position: relative;
  transition: opacity 0.4s var(--default-ease);
  width: 100%;
}
.player.hidden {
  opacity: 0;
}
.video {
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
}
.video.contain {
  -o-object-fit: contain;
  object-fit: contain;
}
</style>
