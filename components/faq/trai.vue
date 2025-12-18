<template>
  <div class="wedding-info">
    <div class="info-item">
      <span class="label pinyon">Lễ Thành Hôn</span>
      <span class="value">13:30, 04/01/2026 - (16/11 âm lịch)</span>
    </div>
    <div class="info-item">
      <span class="label pinyon">Địa điểm</span>
      <span class="value">SN 18 đường Nguyễn Công Trứ, TDP 4, xã Tiền Hải, tỉnh Hưng Yên</span>
          </div>
    <div class="info-item">
      <span class="label pinyon">Dự Tiệc</span>
      <span class="value">10:00, 04/01/2026 </span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "WeddingInfo",
};
</script>

<style scoped>
.wedding-info {
  margin: 20px auto;

  font-family: var(--font-canela-regular);
}

.info-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px 0;

  color: #333;
  gap: 10px;
  margin-bottom: 20px;
}

.label {
  font-weight: 500;
  flex: 1;
  text-align: left;
  font-size: 40px;
  color: var(--c-base-1000);
}
.value {
  flex: 2;
  text-align: right;
  font-size: 18px;
}
@media (max-width: 1280px) {
  .label {
    font-size: 30px;
  }
}
@media (max-width: 767px) {
  .label {
    font-size: 25px;
  }
  .value {
    font-size: 15px;
  }
}
</style>
