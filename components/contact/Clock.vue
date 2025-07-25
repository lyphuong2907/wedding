<template>
  <div class="clock-wrapper">
    <div class="clock">
      <span class="hours l1">{{ time.hours }}</span>
      <span class="literal l1">:</span>
      <span class="minutes l1">
        <span v-for="index in 4" :key="index" class="minutes__item">
          {{ String((currentMinute + (index - 2) + 60) % 60).padStart(2, "0") }}
        </span>
      </span>
      <span class="literal l1">:</span>
      <span class="seconds l1">{{ time.seconds }}</span>
      <span class="period l3">{{ time.period }}</span>
    </div>
    <span class="country p2">Còn lại
    </span>
  </div>
</template>

<script lang="ts" setup>
import gsap from "gsap";

const targetDate = new Date("2025-07-20 12:00:00");

const time = reactive({
  hours: "",
  minutes: "",
  seconds: "",
  period: "",
});

const currentMinute = ref(0);

function updateCountdown() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    time.hours = "00";
    time.minutes = "00";
    time.seconds = "00";
    time.period = "";
    return;
  }

  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Hiển thị 24h format
  time.hours = String(totalHours).padStart(2, "0");
  time.minutes = String(minutes).padStart(2, "0");
  time.seconds = String(seconds).padStart(2, "0");
  time.period = "";
}

async function animateMinutes() {
  await gsap
    .timeline()
    .to(".minutes__item", {
      yPercent: -100,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        currentMinute.value = Number(time.minutes);
      },
    })
    .set(".minutes__item", { clearProps: "all" });
}

watch(() => time.minutes, animateMinutes);

let intervalId: number;

onMounted(() => {
  updateCountdown();
  currentMinute.value = Number(time.minutes);
  intervalId = window.setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.clock-wrapper {
  color: var(--c-base-0);
  gap: 1rem;
  justify-content: center;
  margin-top: var(--offset-64);
}
.clock, .clock-wrapper {
  align-items: center;
  display: flex;
}
.hours {
  display: inline-block;
}
.hours, .minutes, .seconds {
  text-align: center;
  width: 6rem;
}
@media (max-width: 1024px) {
  .hours, .minutes, .seconds {
    width: 4rem;
  }
}
@media (max-width: 768px) {
  .hours, .minutes, .seconds {
    width: 3rem;
  }
}
.minutes {
  display: flex;
  flex-direction: column;
  -webkit-mask-image: linear-gradient(
    to bottom,
    var(--c-base-0-0) 0,
    var(--c-base-0-40) 33.3%,
    var(--c-base-0) 33.3%,
    var(--c-base-0) 66.6%,
    var(--c-base-0-40) 66.6%,
    var(--c-base-0-0) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    var(--c-base-0-0) 0,
    var(--c-base-0-40) 33.3%,
    var(--c-base-0) 33.3%,
    var(--c-base-0) 66.6%,
    var(--c-base-0-40) 66.6%,
    var(--c-base-0-0) 100%
  );
  overflow: hidden;
  position: relative;
}
.minutes__item:last-child {
  left: 0;
  position: absolute;
  top: 100%;
  width: 100%;
}
.literal {
  animation: blink-9f7855a2 2s var(--default-ease) infinite;
  display: inline-block;
  text-align: center;
  width: 1.5rem;
}
.period {
  bottom: 0.3125rem;
  position: relative;
}
@keyframes blink-9f7855a2 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>