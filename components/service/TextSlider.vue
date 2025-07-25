<template>
    <div ref="carouselEl" class="text-carousel h2 title-wrapper" style="z-index: 099;">
      <div :class="['text-wrapper', animationType]">
        <p class="text" :aria-label="texts[activeId]">
          <span
            v-for="(word, wordIndex) in splitText(texts[activeId])"
            :key="wordIndex"
            class="title-anim-word"
            aria-hidden="true"
          >
            <span
              v-for="(char, charIndex) in word"
              :key="charIndex"
              class="title-anim-char"
              aria-hidden="true"
            >
              {{ char }}
            </span>
            <span v-if="wordIndex < splitText(texts[activeId]).length - 1" class="title-anim-char space" aria-hidden="true">&nbsp;</span>
          </span>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted, nextTick, type Ref } from 'vue'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/SplitText'
  
  gsap.registerPlugin(SplitText)
  
  // Props interface
  interface Props {
    texts: string[]
    activeId?: number
    animationType?: string
  }
  
  // Define props with defaults
  const props = withDefaults(defineProps<Props>(), {
    activeId: 0,
    animationType: 'title'
  })
  
  // Animation options interface
  interface AnimationOptions {
    el: HTMLElement
    onScroll?: boolean
    withOpacity?: boolean
  }
  
  // Split text result interface
  interface SplitTextResult {
    words: HTMLElement[]
    chars: HTMLElement[]
  }
  
  // Refs
  const carouselEl: Ref<HTMLElement | null> = ref(null)
  
  // Computed
  const textEl = computed((): HTMLElement | null => {
    return carouselEl.value?.querySelector('.text-wrapper .text') || null
  })
  
  // Helper function to split text into words and characters
  function splitText(text: string): string[][] {
    const words = text.split(' ')
    return words.map(word => word.split(''))
  }
  
  // Hide title animation function
  async function hideTitle({ el, onScroll = true, withOpacity = false }: AnimationOptions): Promise<void> {
    if (!el) return
  
    const words = el.querySelectorAll('.title-anim-word') as NodeListOf<HTMLElement>
    const chars = el.querySelectorAll('.title-anim-char') as NodeListOf<HTMLElement>
    
    if (!words.length || !chars.length) return
  
    return new Promise<void>(resolve => {
      const tl = gsap.timeline({ onComplete: resolve })
      gsap.set(words, { perspective: 1000 })
      
      for (const word of words) {
        const wordChars = word.querySelectorAll('.title-anim-char') as NodeListOf<HTMLElement>
        const charCount = wordChars.length
        
        tl.fromTo(
          wordChars,
          {
            'will-change': 'transform',
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            ...(withOpacity && { autoAlpha: 1 }),
          },
          {
            x: (index: number) => {
              const adjustedIndex =
                index < Math.ceil(charCount / 2)
                  ? index
                  : Math.ceil(charCount / 2) - Math.abs(Math.floor(charCount / 2) - index) - 1
              return (
                200 *
                (charCount % 2
                  ? Math.abs(Math.ceil(charCount / 2) - 1 - adjustedIndex)
                  : Math.abs(Math.ceil(charCount / 2) - adjustedIndex)) *
                (index < charCount / 2 ? -1 : 1)
              )
            },
            y: (index: number) => {
              const adjustedIndex =
                index < Math.ceil(charCount / 2)
                  ? index
                  : Math.ceil(charCount / 2) - Math.abs(Math.floor(charCount / 2) - index) - 1
              return 60 * adjustedIndex
            },
            rotationY: -270,
            rotationZ: (index: number) => {
              const adjustedIndex =
                index < Math.ceil(charCount / 2)
                  ? index
                  : Math.ceil(charCount / 2) - Math.abs(Math.floor(charCount / 2) - index) - 1
              return index < charCount / 2
                ? 8 * Math.abs(adjustedIndex - charCount / 2)
                : -1 * Math.abs(adjustedIndex - charCount / 2) * 8
            },
            ease: 'power3.out',
            scale: 1,
            ...(withOpacity && { autoAlpha: 0 }),
            duration: 1.2,
            ...(onScroll && {
              scrollTrigger: {
                trigger: word,
                start: 'center bottom',
                end: 'top top',
              },
            }),
          },
          0
        )
      }
    })
  }
  
  // Show title animation function
  async function showTitle({ el, onScroll = true, withOpacity = false }: AnimationOptions): Promise<void> {
    if (!el) return
  
    const words = el.querySelectorAll('.title-anim-word') as NodeListOf<HTMLElement>
    const chars = el.querySelectorAll('.title-anim-char') as NodeListOf<HTMLElement>
    
    if (!words.length || !chars.length) return
  
    return new Promise<void>(resolve => {
      const tl = gsap.timeline({ onComplete: resolve })
      gsap.set(words, { perspective: 1000 })
      
      for (const word of words) {
        const wordChars = word.querySelectorAll('.title-anim-char') as NodeListOf<HTMLElement>
        const charCount = wordChars.length
        
        tl.fromTo(
          wordChars,
          {
            'will-change': 'transform',
            x: (index: number) => {
              const adjustedIndex =
                index < Math.ceil(charCount / 2)
                  ? index
                  : Math.ceil(charCount / 2) - Math.abs(Math.floor(charCount / 2) - index) - 1
              return (
                200 *
                (charCount % 2
                  ? Math.abs(Math.ceil(charCount / 2) - 1 - adjustedIndex)
                  : Math.abs(Math.ceil(charCount / 2) - adjustedIndex)) *
                (index < charCount / 2 ? -1 : 1)
              )
            },
            y: (index: number) => {
              const adjustedIndex =
                index < Math.ceil(charCount / 2)
                  ? index
                  : Math.ceil(charCount / 2) - Math.abs(Math.floor(charCount / 2) - index) - 1
              return 60 * adjustedIndex
            },
            rotationY: -270,
            rotationZ: (index: number) => {
              const adjustedIndex =
                index < Math.ceil(charCount / 2)
                  ? index
                  : Math.ceil(charCount / 2) - Math.abs(Math.floor(charCount / 2) - index) - 1
              return index < charCount / 2
                ? 8 * Math.abs(adjustedIndex - charCount / 2)
                : -1 * Math.abs(adjustedIndex - charCount / 2) * 8
            },
            ...(withOpacity && { autoAlpha: 0 }),
          },
          {
            ease: 'power2.out',
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            scale: 1,
            ...(withOpacity && { autoAlpha: 1 }),
            duration: 1.2,
            ...(onScroll && {
              scrollTrigger: {
                trigger: word,
                start: 'center bottom',
                end: 'top top',
              },
            }),
          },
          0
        )
      }
    })
  }
  
  // Wait for transition helper
  async function waitForTransition(): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(resolve, 100)
    })
  }
  
  // Placeholder functions for text animations
  async function hideText({ el, onScroll = true }: Omit<AnimationOptions, 'withOpacity'>): Promise<void> {
    if (!el) return
    return new Promise<void>(resolve => {
      gsap.to(el, { 
        opacity: 0, 
        duration: 0.5,
        onComplete: resolve
      })
    })
  }
  
  async function showText({ el, onScroll = true }: Omit<AnimationOptions, 'withOpacity'>): Promise<void> {
    if (!el) return
    return new Promise<void>(resolve => {
      gsap.to(el, { 
        opacity: 1, 
        duration: 0.5,
        onComplete: resolve
      })
    })
  }
  
  // Update text function
  async function updateText(activeId: number): Promise<void> {
    if (!textEl.value) return
  
    const newText = props.texts[activeId]
    
    if (props.animationType === 'title') {
      await hideTitle({ el: textEl.value, onScroll: false, withOpacity: true })
      await nextTick()
      textEl.value.setAttribute('aria-label', newText)
      await waitForTransition()
      await showTitle({ el: textEl.value, onScroll: false, withOpacity: true })
    } else if (props.animationType === 'text') {
      await hideText({ el: textEl.value, onScroll: false })
      textEl.value.innerHTML = newText
      await waitForTransition()
      await showText({ el: textEl.value, onScroll: false })
    }
  }
  
  // Initialize animation
  function initAnimation(): void {
    if (!textEl.value) return
    
    if (props.animationType === 'title') {
      showTitle({ el: textEl.value, onScroll: false, withOpacity: true })
    } else if (props.animationType === 'text') {
      showText({ el: textEl.value, onScroll: false })
    }
  }
  
  // Watchers and lifecycle
  watch(() => props.activeId, updateText)
  onMounted(() => {
    nextTick(() => {
      initAnimation()
    })
  })
  
  // Expose functions for template usage
  defineExpose({
    splitText,
    hideTitle,
    showTitle,
    updateText,
    initAnimation
  })
  </script>
  
  <style scoped>
  .title-wrapper {
    bottom: 50%;
    left: 50%;
    pointer-events: none;
    position: absolute;
    transform: translate(-50%, .4em);
    width: max-content;
    z-index: var(--z-base);
  }
  
  .text-carousel {
    pointer-events: none;
    position: relative;
    width: inherit;
  }
  
  .text-wrapper {
    bottom: 0;
    left: 50%;
    position: absolute;
    transform: translate(-50%);
    width: inherit;
  }
  
  .text-wrapper .text {
    color: var(--text-color, var(--c-base-0));
    text-align: center;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .title-anim-word {
    position: relative;
    display: inline-flex;
    perspective: 1000px;
    align-items: center;
  }
  
  .title-anim-char {
    position: relative;
    display: inline-block;
    will-change: transform;
  }
  
  .title-anim-char.space {
    width: 0.25em;
  }
  
  @media (max-width: 1023px) {
    .text-wrapper.text {
      width: 100%;
    }
  }
  
  .text-wrapper.title .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>