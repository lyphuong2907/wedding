// Slider.js
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

export class Slider {
  constructor(options) {
    const {
      container,
      margin = 16,
      autoScrollSpeed = 0.5,
      sensitivity = 1,
      slidesOffset = 0,
      withoutAnim = false,
      centeredSlides = false,
      centeredGap = false,
      listeners = { touch: true, drag: true },
      autoScroll = false,
    } = options;

    // Internal state
    this.container = container;
    this.margin = margin;
    this.autoScrollSpeed = autoScrollSpeed;
    this.sensitivity = sensitivity;
    this.slidesOffset = slidesOffset;
    this.withoutAnim = withoutAnim;
    this.centeredSlides = centeredSlides;
    this.centeredGap = centeredGap;
    this.listeners = {
      touch: listeners.touch ?? true,
      drag: listeners.drag ?? true,
    };
    this.autoScrollEnabled = autoScroll;
    this.animationFrame = null;
    this.isDragging = false;
    this.lastPosition = 0;
    this.currentPosition = 0;
    this.previousPosition = 0;
    this.velocity = 0;
    this.totalWidth = 0;
    this.slideWidths = [];
    this.currentIndex = 0;
    this.scrollOffset = 0;

    // Computed refs
    this.containerElement = computed(() => {
      if (Array.isArray(container.value)) {
        return container.value.length === 2
          ? container.value[1]
          : container.value[0];
      }
      return container.value;
    });

    this.slides = computed(
      () => this.containerElement.value?.querySelectorAll(".slider-slide") || []
    );
    this.thumbs = computed(
      () => this.containerElement.value?.querySelectorAll(".card-thumb") || []
    );

    // Bind methods
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.animate = this.animate.bind(this);

    // Initialize
    this.init();
  }

  init() {
    onMounted(() => {
      this.setupSlides();
      this.addEventListeners();
      if (this.autoScrollEnabled) {
        this.enableAutoScroll();
      }
    });

    onUnmounted(() => {
      this.removeCarousel();
    });
  }

  setupSlides() {
    if (!this.slides.value) return;

    gsap.set(this.slides.value, { willChange: "transform" });

    // Calculate slide widths and total width
    this.slideWidths = [];
    let cumulativeWidth = 0;
    this.slides.value.forEach((slide) => {
      this.slideWidths.push((cumulativeWidth += slide.clientWidth));
    });
    this.totalWidth = this.slideWidths[this.slideWidths.length - 1];

    const containerWidth = this.containerElement.value?.clientWidth ?? 0;
    let offset = 0;
    if (this.centeredSlides) {
      offset = (containerWidth - (this.slides.value[0]?.clientWidth ?? 0)) / 2;
    } else if (this.centeredGap) {
      offset = containerWidth / 2 - (this.slides.value[0]?.clientWidth ?? 0);
    }

    // Set slide positions
    this.updatePositions = (position) => {
      if (!this.slides.value) return;
      gsap.set(this.slides.value, {
        x: (index, element) => {
          const basePosition = index > 0 ? this.slideWidths[index - 1] : 0;
          return `${
            basePosition +
            position +
            this.margin * index +
            this.slidesOffset +
            offset
          }px`;
        },
        modifiers: {
          x: (x, target) => {
            const slideCount = this.slides.value?.length ?? 0;
            return `${gsap.utils.wrap(
              -target.clientWidth,
              this.totalWidth - target.clientWidth + slideCount * this.margin,
              parseFloat(x)
            )}px`;
          },
        },
      });
    };

    this.updatePositions(0);
  }

  animate() {
    // Smoothly interpolate position
    this.currentPosition = this.lerp(
      this.currentPosition,
      this.currentIndex,
      0.1
    );
    if (this.autoScrollEnabled) {
      this.scrollOffset -= this.autoScrollSpeed;
    }

    // Update slide positions
    this.updatePositions(this.currentPosition + this.scrollOffset);

    // Update velocity
    this.velocity = this.currentPosition - this.previousPosition;
    this.previousPosition = this.currentPosition;

    // Scale thumbs based on velocity
    if (this.thumbs.value && !this.withoutAnim) {
      gsap.to(this.thumbs.value, {
        scale:
          1 + Math.abs(Math.min(100, Math.max(-100, this.velocity)) * 0.001),
        duration: 0.1,
      });
    }

    // Continue animation
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  handleStart(event) {
    if (
      !this.containerElement.value ||
      !this.slides.value ||
      this.animationFrame === null
    )
      return;
    this.lastPosition =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.isDragging = true;
  }

  handleMove(event) {
    if (
      !this.containerElement.value ||
      !this.isDragging ||
      this.animationFrame === null
    )
      return;
    this.containerElement.value.classList.add("is-dragging");
    const currentPosition =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.currentIndex +=
      (currentPosition - this.lastPosition) * this.sensitivity;
    this.lastPosition = currentPosition;
  }

  handleEnd() {
    if (
      !this.containerElement.value ||
      !this.slides.value ||
      this.animationFrame === null
    )
      return;
    this.isDragging = false;
    this.containerElement.value.classList.remove("is-dragging");
  }

  addEventListeners() {
    if (!this.containerElement.value) return;
    const { touch, drag } = this.listeners;

    if (touch) {
      this.containerElement.value.addEventListener(
        "touchstart",
        this.handleStart,
        { passive: true }
      );
      this.containerElement.value.addEventListener(
        "touchmove",
        this.handleMove,
        { passive: true }
      );
      this.containerElement.value.addEventListener("touchend", this.handleEnd, {
        passive: true,
      });
    }

    if (drag) {
      this.containerElement.value.addEventListener(
        "mousedown",
        this.handleStart
      );
      this.containerElement.value.addEventListener(
        "mousemove",
        this.handleMove
      );
      this.containerElement.value.addEventListener(
        "mouseleave",
        this.handleEnd
      );
      this.containerElement.value.addEventListener("mouseup", this.handleEnd);
      this.containerElement.value.addEventListener("selectstart", () => false);
    }
  }

  removeEventListeners() {
    if (!this.containerElement.value) return;
    const { touch, drag } = this.listeners;

    if (touch) {
      this.containerElement.value.removeEventListener(
        "touchstart",
        this.handleStart
      );
      this.containerElement.value.removeEventListener(
        "touchmove",
        this.handleMove
      );
      this.containerElement.value.removeEventListener(
        "touchend",
        this.handleEnd
      );
    }

    if (drag) {
      this.containerElement.value.removeEventListener(
        "mousedown",
        this.handleStart
      );
      this.containerElement.value.removeEventListener(
        "mousemove",
        this.handleMove
      );
      this.containerElement.value.removeEventListener(
        "mouseleave",
        this.handleEnd
      );
      this.containerElement.value.removeEventListener(
        "mouseup",
        this.handleEnd
      );
      this.containerElement.value.removeEventListener(
        "selectstart",
        () => false
      );
    }
  }

  reInitCarousel() {
    if (this.slides.value) {
      this.removeCarousel();
      this.setupSlides();
      this.addEventListeners();
    }
  }

  removeCarousel() {
    this.disableAutoScroll();
    this.resetState();
    this.removeEventListeners();
  }

  enableAutoScroll() {
    if (this.autoScrollEnabled) return;
    this.autoScrollEnabled = true;
    if (!this.animationFrame) {
      this.animate();
    }
  }

  disableAutoScroll() {
    this.autoScrollEnabled = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  resetState() {
    this.velocity = 0;
    this.previousPosition = 0;
    this.currentPosition = 0;
    this.scrollOffset = 0;
    this.totalWidth = 0;
    this.currentIndex = 0;
    this.slideWidths = [];
  }
}
