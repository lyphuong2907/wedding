<template>
  <div class="vintage-rsvp-form lenis lenis-smooth">
    <!-- Decorative ornament -->
    <div ref="ornament" class="ornament"></div>

    <!-- Title section -->
    <div ref="titleSection" class="title-section">
      <h1 class="vintage-title">RSVP</h1>

      <div class="decorative-line"></div>
    </div>

    <!-- Quote -->
    <div ref="quote" class="quote">
      "Sự hiện diện của bạn là món quà quý giá nhất "
    </div>

    <!-- Form -->
    <form ref="form" class="rsvp-form-container" @submit.prevent="handleSubmit">
      <div ref="nameField" class="form-group">
        <label class="form-label" for="name">Tên bạn</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="form-input"
          placeholder=""
          required
        />
        <div class="field-decoration"></div>
      </div>

      <div ref="messageField" class="form-group">
        <label class="form-label" for="message">Tin nhắn</label>
        <textarea
          id="message"
          v-model="formData.message"
          class="form-textarea"
          rows="4"
          placeholder="..."
          required
        ></textarea>
        <div class="field-decoration"></div>
      </div>

      <!-- Attendance Options -->
      <div ref="attendanceField" class="form-group">
        <label class="form-label">Bạn tham gia chứ ?</label>
        <div class="radio-group">
          <label class="radio-option">
            <input
              v-model="formData.attendance"
              type="radio"
              value="yes"
              name="attendance"
              required
            />
            <span class="radio-custom"></span>
            <span class="radio-text">Có</span>
          </label>
          <label class="radio-option">
            <input
              v-model="formData.attendance"
              type="radio"
              value="no"
              name="attendance"
              required
            />
            <span class="radio-custom"></span>
            <span class="radio-text">Không</span>
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <div ref="submitButton" class="submit-container">
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Send RSVP</span>
          <span v-else>Sending...</span>
        </button>
      </div>
    </form>

    <!-- Success Message -->
    <div v-if="showSuccess" ref="successMessage" class="success-message">
      <div class="success-icon">✓</div>
      <h3>Thank You!</h3>
      <p>Your RSVP has been received</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { gsap } from "gsap";

// Form data
const formData = reactive({
  name: "",
  message: "",
  attendance: "",
});

// Form state
const isSubmitting = ref(false);
const showSuccess = ref(false);

// Template refs
const ornament = ref(null);
const titleSection = ref(null);
const quote = ref(null);
const form = ref(null);
const nameField = ref(null);
const messageField = ref(null);
const attendanceField = ref(null);
const submitButton = ref(null);
const successMessage = ref(null);

// Animation timeline
let animationTimeline = null;

// Initialize animations
const initAnimations = () => {
  // Kill existing timeline
  if (animationTimeline) animationTimeline.kill();

  // Create main timeline
  animationTimeline = gsap.timeline();

  // Set initial states
  gsap.set(
    [
      ornament.value,
      titleSection.value,
      quote.value,
      nameField.value,
      messageField.value,
      attendanceField.value,
      submitButton.value,
    ],
    {
      opacity: 0,
      y: 30,
    }
  );

  gsap.set(ornament.value, {
    scale: 0.5,
    rotation: -180,
  });

  // Animate elements in sequence
  animationTimeline
    .to(ornament.value, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
    .to(
      titleSection.value,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .to(
      quote.value,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    )
    .to(
      [
        nameField.value,
        messageField.value,
        attendanceField.value,
        submitButton.value,
      ],
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
        display: "block",
      },
      "-=0.1"
    );
};

// Form submission
const handleSubmit = async () => {
  if (!formData.name || !formData.message || !formData.attendance) return;

  await $fetch("/api/rsvp", {
    method: "POST",
    body: formData,
  });

  isSubmitting.value = true;

  // Button loading animation
  gsap.to(submitButton.value, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  });

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Hide form and show success
  gsap.to(
    [
      nameField.value,
      messageField.value,
      attendanceField.value,
      submitButton.value,
    ],
    {
      opacity: 0,
      y: -20,
      duration: 0.3,

      ease: "power2.in",
      onComplete: () => {
        showSuccess.value = true;

        gsap.set(
          [
            nameField.value,
            messageField.value,
            attendanceField.value,
            submitButton.value,
          ],
          { display: "none" }
        );
        showSuccessAnimation();
      },
    }
  );

  isSubmitting.value = false;
};

// Success animation
const showSuccessAnimation = () => {
  gsap.fromTo(
    successMessage.value,
    {
      opacity: 0,
      scale: 0.5,
      y: 30,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    }
  );
};

// Input focus animations
const handleInputFocus = (event) => {
  const input = event.target;
  const group = input.closest(".form-group");

  gsap.to(group, {
    scale: 1.02,
    duration: 0.2,
    ease: "power2.out",
  });

  gsap.to(group.querySelector(".field-decoration"), {
    scaleX: 1,
    duration: 0.3,
    ease: "power2.out",
  });
};

const handleInputBlur = (event) => {
  const input = event.target;
  const group = input.closest(".form-group");

  gsap.to(group, {
    scale: 1,
    duration: 0.2,
    ease: "power2.out",
  });

  gsap.to(group.querySelector(".field-decoration"), {
    scaleX: 0,
    duration: 0.3,
    ease: "power2.out",
  });
};

onMounted(() => {
  // Start animations after mount
  setTimeout(initAnimations, 100);

  // Add input event listeners
  const inputs = form.value.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("focus", handleInputFocus);
    input.addEventListener("blur", handleInputBlur);
  });
});
</script>

<style scoped>
.vintage-rsvp-form {
  padding: 30px 20px;
  max-width: 500px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f4f1e8 0%, #e8e2d5 100%);
  position: relative;
  overflow: hidden;
}

.vintage-rsvp-form::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(212, 175, 55, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(212, 175, 55, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.ornament {
  width: 80px;
  height: 40px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50"><path d="M10 25 Q25 10 40 25 Q55 40 70 25 Q85 10 90 25" stroke="%23d4af37" stroke-width="2" fill="none"/><circle cx="50" cy="25" r="3" fill="%23d4af37"/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 auto 20px;
  opacity: 0.8;
}

.title-section {
  text-align: center;
  margin-bottom: 30px;
}

.vintage-title {
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 700;
  color: #2c1810;
  margin-bottom: 5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 4px;
}

.subtitle {
  font-family: "Playfair Display", serif;
  font-size: 1.1rem;
  color: #8b7355;
  font-style: italic;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.decorative-line {
  height: 2px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
  margin: 0 auto;
  width: 200px;
  opacity: 0.7;
}

.quote {
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  color: #6d5a47;
  text-align: center;
  margin-bottom: 40px;
  font-style: italic;
  position: relative;
  padding: 0 30px;
}

.quote::before,
.quote::after {
  content: '"';
  font-size: 2.5rem;
  color: #d4af37;
  position: absolute;
  top: -10px;
  font-family: "Playfair Display", serif;
}

.quote::before {
  left: 0;
}

.quote::after {
  right: 0;
}

.form-group {
  margin-bottom: 30px;
  position: relative;
}

.form-label {
  display: block;
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  color: #2c1810;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #d4af37;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.9);
  font-family: "Crimson Text", serif;
  font-size: 1rem;
  color: #2c1810;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #b8941f;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.3),
    inset 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.field-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #d4af37, #b8941f);
  transform: scaleX(0);
  transform-origin: left;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.radio-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.radio-option:hover {
  background-color: rgba(212, 175, 55, 0.1);
}

.radio-option input[type="radio"] {
  display: none;
}

.radio-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #d4af37;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
  transition: all 0.3s ease;
}

.radio-option input[type="radio"]:checked + .radio-custom {
  border-color: #b8941f;
  background-color: #d4af37;
}

.radio-option input[type="radio"]:checked + .radio-custom::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.radio-text {
  font-family: "Crimson Text", serif;
  font-size: 1rem;
  color: #2c1810;
}

.submit-container {
  text-align: center;
  margin-top: 40px;
}

.submit-btn {
  padding: 15px 40px;
  background: linear-gradient(135deg, #d4af37, #b8941f);
  color: #2c1810;
  border: none;
  border-radius: 0;
  font-family: "Playfair Display", serif;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  text-align: center;
  padding: 40px 20px;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37, #b8941f);
  color: white;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.success-message h3 {
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  color: #2c1810;
  margin-bottom: 10px;
}

.success-message p {
  font-family: "Crimson Text", serif;
  font-size: 1.1rem;
  color: #8b7355;
  font-style: italic;
}

@media (max-width: 640px) {
  .vintage-rsvp-form {
    padding: 20px 15px;
  }

  .vintage-title {
    font-size: 2.5rem;
  }

  .radio-group {
    gap: 10px;
  }

  .submit-btn {
    padding: 12px 30px;
    font-size: 1rem;
  }
}
</style>
