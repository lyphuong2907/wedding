<template>
  <div class="letter-inner">
    <div class="letter">
      <ContactForm />
    </div>
  </div>
  <div class="success-wrapper letter-inner inset">
    <div class="decor-wrapper">
      <span
        v-for="index in 4"
        :key="index"
        :class="`decor-line decor-line-${index}`"
      ></span>
    </div>
    <div class="noise inset"></div>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.letter-button {
  margin-top: var(--offset-32);
}
.letter-inner {
  backface-visibility: hidden;
  background-color: var(--c-base-0);
  background-image: linear-gradient(
    0deg,
    var(--c-base-1000-10) 0,
    var(--c-base-1000-10) 100%
  );
  height: 100%;
  transition: transform 0.6s var(--default-ease);
}
.letter-inner:first-child {
  padding: 1rem;
  position: relative;
  z-index: var(--z-base);
}
@media (max-width: 1023px) {
  .letter-inner:first-child {
    padding: 0.25rem;
  }
}
.letter-inner:first-child:after,
.letter-inner:first-child:before {
  background-color: var(--c-base-1000-10);
  content: "";
  height: 0.0625rem;
  position: absolute;
  top: -0.0625rem;
  width: 35.34915rem;
  z-index: var(--z-bg);
}
@media (max-width: 1023px) {
  .letter-inner:first-child:after,
  .letter-inner:first-child:before {
    content: none;
  }
}
.letter-inner:first-child:before {
  left: 0;
  transform: rotate(19.8446275661deg);
  transform-origin: 0 0;
}
.letter-inner:first-child:after {
  right: 0;
  transform: rotate(-19.8446275661deg);
  transform-origin: 100% 0;
}
.letter-inner:last-child {
  transform: rotateX(-180deg);
}
.success-wrapper {
  display: flex;
  flex-direction: column;
}
.letter {
  background: var(--c-base-0);
  height: 100%;
  padding: 2rem;
  position: relative;
}
@media (max-width: 1023px) {
  .letter {
    padding: 1rem;
  }
}
.contacts {
  bottom: 2rem;
  left: 43rem;
  position: absolute;
}
@media (max-width: 1023px) {
  .contacts {
    bottom: 9.75rem;
    display: flex;
    flex-direction: row-reverse;
    left: 1rem;
  }
}
.contacts__item:last-child {
  margin-top: 1.5rem;
}
@media (max-width: 1023px) {
  .contacts__item:last-child {
    margin-right: 2.8125rem;
    margin-top: 0;
  }
}
.contacts__title {
  color: var(--c-base-1000-40);
}
.contacts__link {
  display: block;
  margin-top: 0.375rem;
}
.decor-wrapper {
  height: 10.5rem;
  position: relative;
}
@media (max-width: 1023px) {
  .decor-wrapper {
    height: 6.5rem;
  }
}
.decor-line {
  background-color: var(--c-base-1000-20);
  content: "";
  height: 0.0625rem;
  position: absolute;
}
.decor-line-1,
.decor-line-2 {
  top: -0.03125rem;
  width: 4.24264rem;
}
@media (max-width: 1023px) {
  .decor-line-1,
  .decor-line-2 {
    width: 3.60555rem;
  }
}
.decor-line-3,
.decor-line-4 {
  top: 2.96875rem;
  width: 31.16589rem;
}
@media (max-width: 1023px) {
  .decor-line-3,
  .decor-line-4 {
    width: 9.6566rem;
  }
}
.decor-line-1,
.decor-line-3 {
  transform-origin: 0 50%;
}
.decor-line-2,
.decor-line-4 {
  transform-origin: 100% 50%;
}
.decor-line-1 {
  left: 0;
  transform: rotate(45deg);
}
@media (max-width: 1023px) {
  .decor-line-1 {
    transform: rotate(56.309932474deg);
  }
}
.decor-line-2 {
  right: 0;
  transform: rotate(-45deg);
}
@media (max-width: 1023px) {
  .decor-line-2 {
    transform: rotate(-56.309932474deg);
  }
}
.decor-line-3 {
  left: 3rem;
  transform: rotate(13.9247732204deg);
}
@media (max-width: 1023px) {
  .decor-line-3 {
    left: 2rem;
    transform: rotate(21.2505055071deg);
  }
}
.decor-line-4 {
  right: 3rem;
  transform: rotate(-13.9247732204deg);
}
@media (max-width: 1023px) {
  .decor-line-4 {
    right: 2rem;
    transform: rotate(-21.2505055071deg);
  }
}
.decor-image {
  height: 10rem;
  left: 50%;
  opacity: 0;
  position: absolute;
  scale: 1.2;
  top: 5.5rem;
  transition-delay: 0.6s;
  transition-duration: 0s, 0.6s;
  transition-property: opacity, scale;
  transition-timing-function: var(--default-ease);
  translate: -50% 0;
  width: 10rem;
}
@media (max-width: 1023px) {
  .decor-image {
    height: 8rem;
    top: 2rem;
    width: 8rem;
  }
}
.success-title {
  margin-top: 8rem;
  text-align: center;
}
@media (max-width: 1023px) {
  .success-title {
    margin-top: 9rem;
  }
}
.success-button {
  display: block;
  margin: 1rem auto 0;
}
.success-inner {
  color: var(--c-base-1000-40);
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 0 1rem 0.75rem;
}
@media (max-width: 1023px) {
  .success-inner {
    padding: 0 1rem 0.75rem;
  }
}
.success-inner p:last-child {
  text-align: right;
}

</style>
