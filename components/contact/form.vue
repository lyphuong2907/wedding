<template>
  <div class="signature playfair-display">
    <NuxtImg src="/ring.png" width="70" style="margin: 20px auto" />
    <p>
      Thật vui vì được gặp và đón tiếp mọi người trong ngày
      cưới của chúng tôi.
    </p>
    <p>
      Chúng tôi muốn gửi đến bạn những lời cảm ơn sâu sắc nhất và để bạn biết
      rằng chúng tôi rất hạnh phúc khi thấy bạn ở đó.
    </p>
    <p>
      Cảm ơn các bạn rất nhiều vì sự hiện diện cùng những lời chúc tốt đẹp mà
      bạn đã dành cho chúng tôi nha!
    </p>
    <div class="alex-brush-regular pen-sign">
      <span>Việt Phương</span>
      <span>&</span>
      <span>Thương Huyền</span>
    </div>
  </div>
</template>
<style scoped>
.signature {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
.pen-sign {
  margin-top: 20px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  gap: 10px;
}
@media (max-width: 1024px) {
  .pen-sign {
     flex-direction: column;
     gap: 5px;
     font-size: 1.5rem;
  }
}
</style>
