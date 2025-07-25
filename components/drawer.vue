<template>
  <div>
    <!-- Overlay -->
    <div
      v-if="showOverlay"
      ref="overlay"
      class="drawer-overlay"
      @click="$emit('close')"
    ></div>

    <!-- Drawer -->
    <div v-if="showDrawer" ref="drawer" class="drawer-container">
      <!-- Handle indicator -->
      <div class="drawer-handle">
        <div ref="handleBar" class="handle-bar"></div>
      </div>

      <!-- Content -->
      <div ref="content" class="drawer-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

// Props
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["close"]);

// Template refs
const overlay = ref(null);
const drawer = ref(null);
const handleBar = ref(null);
const content = ref(null);

// Show/hide flags
const showOverlay = ref(false);
const showDrawer = ref(false);

// GSAP timeline
let openTimeline = null;
let closeTimeline = null;

// GSAP animations
const openDrawer = async () => {
  showOverlay.value = true;
  showDrawer.value = true;

  await nextTick();

  if (!drawer.value || !overlay.value || !content.value || !handleBar.value)
    return;

  // Kill any existing timeline
  if (closeTimeline) closeTimeline.kill();

  // Create open timeline
  openTimeline = gsap.timeline();

  // Set initial states
  gsap.set(overlay.value, { opacity: 0 });
  gsap.set(drawer.value, {
    y: "100%",
    scale: 0.9,
    opacity: 0,
    rotationX: 5,
  });
  gsap.set(content.value, {
    y: 30,
    opacity: 0,
    scale: 0.95,
  });
  gsap.set(handleBar.value, {
    scale: 0.8,
    opacity: 0,
  });

  // Animate in sequence
  openTimeline
    // Overlay fade in
    .to(overlay.value, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    })
    // Drawer slide up with bounce
    .to(
      drawer.value,
      {
        y: 0,
        scale: 1,
        opacity: 1,
        rotationX: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.1"
    )
    // Handle bar appear
    .to(
      handleBar.value,
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.8)",
      },
      "-=0.4"
    )
    // Content fade in and slide up
    .to(
      content.value,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2"
    )
    // Handle bar pulse effect
    .to(
      handleBar.value,
      {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      },
      "-=0.1"
    );
};

const closeDrawer = () => {
  if (!drawer.value || !overlay.value || !content.value) return;

  // Kill any existing timeline
  if (openTimeline) openTimeline.kill();

  // Create close timeline
  closeTimeline = gsap.timeline({
    onComplete: () => {
      showOverlay.value = false;
      showDrawer.value = false;
      emit("close");
    },
  });

  closeTimeline
    // Content fade out first
    .to(content.value, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in",
    })
    // Handle bar shrink
    .to(
      handleBar.value,
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "back.in(1.7)",
      },
      "-=0.1"
    )
    // Drawer slide down with scale
    .to(
      drawer.value,
      {
        y: "100%",
        scale: 0.9,
        opacity: 0,
        rotationX: -5,
        duration: 0.4,
        ease: "back.in(1.7)",
      },
      "-=0.1"
    )
    // Overlay fade out
    .to(
      overlay.value,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.2"
    );
};

// Hover effects
const handleMouseEnter = () => {
  if (!drawer.value || !props.open) return;

  gsap.to(drawer.value, {
    scale: 1.01,
    y: -2,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(handleBar.value, {
    backgroundColor: "#9ca3af",
    duration: 0.2,
    ease: "power2.out",
  });
};

const handleMouseLeave = () => {
  if (!drawer.value || !props.open) return;

  gsap.to(drawer.value, {
    scale: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(handleBar.value, {
    backgroundColor: "#d1d5db",
    duration: 0.2,
    ease: "power2.out",
  });
};

// Watch for open changes
watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }
);

// Handle escape key
const handleEscape = (e) => {
  if (e.key === "Escape" && props.open) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);

  // Add hover listeners
  if (drawer.value) {
    drawer.value.addEventListener("mouseenter", handleMouseEnter);
    drawer.value.addEventListener("mouseleave", handleMouseLeave);
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);

  // Cleanup timelines
  if (openTimeline) openTimeline.kill();
  if (closeTimeline) closeTimeline.kill();

  // Remove hover listeners
  if (drawer.value) {
    drawer.value.removeEventListener("mouseenter", handleMouseEnter);
    drawer.value.removeEventListener("mouseleave", handleMouseLeave);
  }
});
</script>

<style scoped>
/* Overlay styles */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  backdrop-filter: blur(2px);
}

/* Drawer container */
.drawer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: white;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-shadow: 0 -10px 25px -3px rgba(0, 0, 0, 0.1),
    0 -4px 6px -2px rgba(0, 0, 0, 0.05);
  height: auto;
  min-height: 100px;
  max-height: 80vh;
  overflow-y: auto;
  cursor: pointer;
  transform-origin: bottom center;
}

/* Handle indicator */
.drawer-handle {
  display: flex;
  justify-content: center;
  padding-top: 0.75rem;
  padding-bottom: 0.5rem;
}

.handle-bar {
  width: 2.5rem;
  height: 0.25rem;
  background-color: #d1d5db;
  border-radius: 9999px;
}

/* Content */
.drawer-content {
  padding: 0 1.5rem 1.5rem;
  cursor: default;
}

/* Responsive design */
@media (max-width: 640px) {
  .drawer-container {
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  }

  .drawer-content {
    padding: 0 1rem 1rem;
  }
}

/* Smooth scrolling for content */
.drawer-container {
  scroll-behavior: smooth;
}
</style>
