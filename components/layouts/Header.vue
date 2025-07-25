<script setup lang="ts"></script>

<template>
  <header class="header light">
    <div class="header__item">
      <LayoutsPlaysound />
    </div>
    <NuxtLink to="/" class="logo">
      <LayoutsLogo />
    </NuxtLink>
    <div class="header__item"></div>
  </header>
</template>

<style scoped>
.header {
  align-items: center;
  color: var(--header-color);
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(var(--header-gap) * -1);
  padding: 1.25rem var(--padding);
  position: relative;
  top: 0;
  z-index: var(--z-header);
  
  /* Tối ưu hóa performance */
  will-change: transform;
  contain: layout style paint;
  transform-origin: center top;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  
  /* Transition mượt mà hơn */
  transition: 
    color 0.4s var(--default-ease),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 1023px) {
  .header {
    padding: 1.6875rem var(--padding);
  }
}

.header.light {
  --header-color: var(--c-base-0);
}

.header.dark {
  --header-color: var(--c-base-1000);
}

.header.hidden {
  transform: translateY(-100%);
}

.header__item {
  align-items: center;
  display: flex;
  gap: 2rem;
  
  /* Tối ưu hóa cho các item bên trong */
  will-change: auto;
  contain: layout;
}

@media (max-width: 1023px) {
  .dropdown-wrapper,
  .header .sound-button {
    display: none;
  }
}

.header__link {
  display: flex;
}

@media (max-width: 1023px) {
  .header__link {
    display: none;
  }
}

.logo {
  --icon-color: var(--header-color);
  display: block;
  left: 50%;
  position: absolute;
  top: 1.25rem;
  width: 6rem;
  
  /* Tối ưu hóa transform cho logo */
  transform: translate3d(-50%, 0, 0);
  transform-origin: center center;
  will-change: opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  
  /* Transition mượt mà hơn */
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 1023px) {
  .logo {
    top: 1.5rem;
  }
}

.logo svg {
  height: auto;
  width: 100%;
  
  /* Tối ưu hóa cho SVG */
  display: block;
  will-change: auto;
}

@media (hover: hover) {
  .logo:not(.router-link-active):hover {
    opacity: 0.4;
  }
}

.header-bg {
  background-color: #f0ede6;
  border-bottom: 0.0625rem solid var(--c-base-1000-20);
  pointer-events: none;
  z-index: var(--z-bg);
  
  /* Tối ưu hóa background */
  will-change: auto;
  contain: strict;
}

/* Tối ưu hóa cho các thiết bị có GPU yếu */
@media (prefers-reduced-motion: reduce) {
  .header,
  .logo {
    transition: none;
  }
}

/* Tối ưu hóa cho thiết bị di động */
@media (max-width: 767px) {
  .header {
    contain: layout style;
  }
}
</style>