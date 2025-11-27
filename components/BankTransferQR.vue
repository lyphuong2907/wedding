<template>
  <div class="bank-transfer-container lenis lenis-smooth ">
    <!-- Header trang nhã -->
    <div ref="headerRef" class="header-section">
      <div class="decorative-line"></div>
      <h2 class="main-title">{{ title }}</h2>
      <p class="subtitle">{{ subtitle }}</p>
      <div class="decorative-line"></div>
    </div>

    <!-- Thông tin ngân hàng -->
    <div ref="bankInfoRef" class="bank-info-section">
      <div class="bank-card">
        <div class="bank-header">
          <div class="bank-icon">
            <img
              src="https://qr.sepay.vn/assets/img/banklogo/BIDV.png"
              width="150px"
            />
          </div>
          <div class="bank-name">{{ bankInfo.bankName }}</div>
        </div>

        <div class="account-details">
          <div class="detail-row">
            <span class="label">Tên tài khoản:</span>
            <span class="value">{{ bankInfo.accountName }}</span>
          </div>
          <div style="display: flex;justify-content: space-between; align-items: center;">
            <div class="detail-row" style="flex-shrink: 0;">
              <span class="label">Số tài khoản:</span>
              <span class="value account-number">{{
                bankInfo.accountNumber
              }}</span>
            </div>
            <button
              @click="copyAccountNumber"
              class="copy-button"
              style="width: 100px;"
              :class="{ copied: isCopied }"
            >
              {{ isCopied ? "✓ Copied" : "Sao chép" }}
            </button>
          </div>
          <div class="detail-row">
            <span class="label">Mã QR:</span>
            <span class="value">
              <NuxtImg src="/qr_hang.jpg" width="150px"></NuxtImg
            ></span>
          </div>
        </div>
      </div>
      <div class="bank-card">
        <div class="bank-header">
          <div class="bank-icon">
            <img
              src="https://qr.sepay.vn/assets/img/banklogo/BIDV.png"
              width="150px"
            />
          </div>
          <div class="bank-name">BIDV - Ngân hàng BIDV</div>
        </div>

        <div class="account-details">
          <div class="detail-row">
            <span class="label">Tên tài khoản:</span>
            <span class="value">LE DINH LOI</span>
          </div>
          <div style="display: flex;justify-content: space-between; align-items: center;">
            <div class="detail-row" style="flex-shrink: 0;">
              <span class="label">Số tài khoản:</span>
              <span class="value account-number">51110000276498</span>
            </div>
            <button
              @click="copyAccountNumber('51110000276498')"
              class="copy-button"
              style="width: 100px;"
              :class="{ copied: isCopied }"
            >
              {{ isCopied ? "✓ Copied" : "Sao chép" }}
            </button>
          </div>
          <div class="detail-row">
            <span class="label">Mã QR:</span>
            <span class="value">
              <NuxtImg src="/loi_qr.png" width="150px"></NuxtImg
            ></span>
          </div>
        </div>
      </div>
    </div>

    
    <!-- Lời cám ơn -->
    <div ref="thankRef" class="thank-section">
      <div class="decorative-heart">💐</div>
      <p class="thank-message">{{ thankMessage }}</p>
      <div class="decorative-flourish">❦</div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";

const headerRef = ref(null);
const bankInfoRef = ref(null);
const thankRef = ref(null);
const isCopied = ref(false);

const title = ref("Thông Tin Chuyển Khoản");
const subtitle = ref("Cảm ơn bạn đã dành thời gian tham dự");
const bankInfo = ref({
  bankName: "MB Bank - Ngân hàng Quân Đội",
  accountName: "Nguyen Thi Hang",
  accountNumber: "0090107439004",
});
const thankMessage = ref(
  "Sự hiện diện của bạn là món quà ý nghĩa nhất với chúng tôi. Xin chân thành cảm ơn!"
);

const copyAccountNumber = async (val) => {
  try {
    await navigator.clipboard.writeText(val || bankInfo.accountNumber);
    isCopied.value = true;

    // Reset sau 2 giây
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Không thể sao chép: ", err);
  }
};

onMounted(() => {
  // Tạo timeline cho hoạt ảnh
  const tl = gsap.timeline();

  // Hoạt ảnh xuất hiện từ từ
  tl.fromTo(
    headerRef.value,
    {
      opacity: 0,
      y: -30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    }
  )
    .fromTo(
      bankInfoRef.value,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    )
     
    .fromTo(
      thankRef.value,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    );

  // Hiệu ứng hover cho các phần tử
  gsap.set([".bank-card", ".qr-container"], {
    transformOrigin: "center center",
  });
});
</script>

<style scoped>
.bank-transfer-container {
  margin: 0 auto;
  font-family: "Playfair Display", "Times New Roman", serif;

  position: relative;
  overflow: hidden;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 40px;
}

.decorative-line {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
  margin: 20px auto;
}

.main-title {
  font-size: 1.6em;
  color: #2c3e50;
  font-weight: 400;
  margin: 0;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1em;
  color: #7f8c8d;
  margin: 10px 0;
  font-style: italic;
}

/* Bank Info Section */
.bank-info-section {
  margin-bottom: 40px;
}

.bank-card {
  transition: all 0.3s ease;
}

.bank-card:hover {
  transform: translateY(-2px);
}

.bank-header {
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
}

.bank-icon {
  font-size: 2em;
  margin-right: 15px;
}

.bank-name {
  font-size: 1em;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
}

.account-details {
  margin-bottom: 25px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 8px 0;
  border-bottom: 1px solid #f8f9fa;
}

.label {
  font-weight: 600;
  color: #5a6c7d;
  flex-shrink: 0;
}

.value {
  color: #2c3e50;
  font-weight: 600;
  text-align: right;
  max-width: 60%;
}

.account-number {
  font-family: "Courier New", monospace;
  font-size: 1.2em;
  font-weight: 700;
  color: #d4af37;
}

.copy-button {
  width: 100%;
  padding: 6px;
  background: linear-gradient(135deg, #d4af37, #8d6a13);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.copy-button:hover {
  background: linear-gradient(135deg, #b8941f, #d4af37);
  transform: translateY(-1px);
}

.copy-button.copied {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
}

/* QR Section */
.qr-section {
  margin-bottom: 40px;
}

.qr-container {
  background: white;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.qr-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
}

.qr-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
}

.qr-icon {
  font-size: 1.5em;
  margin-right: 10px;
}

.qr-header h3 {
  color: #2c3e50;
  font-weight: 500;
  margin: 0;
}

.qr-code-wrapper {
  margin-bottom: 15px;
}

.qr-placeholder {
  width: 200px;
  height: 200px;
  margin: 0 auto 15px;
  background: #f8f9fa;
  border: 2px dashed #d4af37;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 80%;
  height: 80%;
  gap: 2px;
}

.qr-dot {
  background: #2c3e50;
  border-radius: 1px;
  opacity: 0.6;
}

.qr-dot:nth-child(odd) {
  opacity: 0.8;
}

.qr-dot:nth-child(3n) {
  opacity: 0.4;
}

.qr-note {
  color: #7f8c8d;
  font-size: 0.9em;
  font-style: italic;
  margin: 0;
}

/* Thank Section */
.thank-section {
  text-align: center;
  padding: 30px;
  background: rgba(212, 175, 55, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(212, 175, 55, 0.1);
}

.decorative-heart {
  font-size: 2em;
  margin-bottom: 15px;
}

.thank-message {
  font-size: 1.1em;
  color: #2c3e50;
  line-height: 1.6;
  margin: 0 0 15px 0;
  font-style: italic;
}

.decorative-flourish {
  font-size: 1.5em;
  color: #d4af37;
  margin-top: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .main-title {
    font-size: 1.5em;
  }

  .bank-card,
  .qr-container {
    padding: 20px;
  }

  .detail-row {
    flex-direction: column;
    gap: 5px;
  }

  .value {
    text-align: left;
    max-width: 100%;
  }

  .qr-placeholder {
    width: 150px;
    height: 150px;
  }
}
</style>
