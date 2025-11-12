<script setup lang="ts">
import { useConfigStore } from "~/stores/config";

const { rspv, box } = storeToRefs(useConfigStore());
</script>
<template>
  <section class="note">
    <div class="call-to-action contact-block">
      <p class="p2 text-anim call-to-action__title">
        <span class="text-anim-line">
          Nếu có thể, bạn hãy đến tham dự Đám cưới và chung vui cùng chúng tôi
           ^^.
        </span>
      </p>
      <br />
      <p class="p2 text-anim call-to-action__title">
        <span class="text-anim-line"> Chân thành cảm ơn bạn rất nhiều! </span>
      </p>

      <div class="btn-group">
        <div class="call-to-action__link" @click="rspv = true">
          <span class="button-inner l2">
            <span class="text-wrapper">
              <span class="button-text">Gửi lời chúc</span>
            </span>
          </span>
        </div>
        <div class="call-to-action__link" @click="box = true">
          <span class="button-inner l2 dark">
            <span class="text-wrapper">
              <span class="button-text playfair-display">Thông Tin Mừng Cưới</span>
            </span>
          </span>
        </div>
      </div>
    </div>
    <Drawer :open="box" @close="box = false">
      <BankTransferQR></BankTransferQR>
    </Drawer>
    <Drawer :open="rspv" @close="rspv = false">
      <FormRspv></FormRspv>
    </Drawer>
  </section>
</template>
<style scoped>
.note {
  padding: 5.25rem 0.75rem 3.5rem;
  display: flex;
  justify-content: center;
}
.call-to-action {
  border-left: 1px solid var(--c-base-1000-20);
  padding-left: 2rem;
  width: fit;
}

@media (max-width: 1023px) {
  .call-to-action {
    border-left: none;
    padding-left: 0;
  }
}

.call-to-action__description {
  color: var(--c-base-1000-40);
}

.call-to-action__link {
  display: block;
  margin-top: 3.75rem;
  width: -moz-max-content;
  width: max-content;
}
.call-to-action__link .button-inner.dark {
  background-color: var(--c-base-1000);
  color: white;
}
.call-to-action__link .button-inner {
  background-color: white;
  padding: 20px;
  color: var(--c-base-1000);
}
.btn-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-family: "Playfair Display", "Times New Roman", serif;
}
@media (max-width: 1023px) {
  .call-to-action__link {
    margin-top: 1.5rem;
  }
}
</style>
