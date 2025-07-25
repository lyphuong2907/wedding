<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { gsap } from "gsap"; // Import GSAP

// Định nghĩa interface cho dữ liệu
interface FaqCategory {
  id: number;
  name: string;
}

interface FaqQuestion {
  category: number;
  question: string;
  answer: string;
}

interface FaqData {
  title: string[];
  categories: FaqCategory[];
  questions: FaqQuestion[];
}

// Dữ liệu tĩnh (hard-coded)
const faqData: FaqData = {
  title: ["Wedding", "Events"],
  categories: [
    { id: 1, name: "Nhà Trai" },
    { id: 2, name: "Nhà Gái" },
  ],
  questions: [],
};

// Trạng thái danh mục được chọn
const selectedCategoryId = ref<number | null>(
  faqData.categories[0]?.id ?? null
);

// Lọc câu hỏi theo danh mục được chọn
const filteredQuestions = computed(() =>
  faqData.questions.filter(
    (question) => question.category === selectedCategoryId.value
  )
);

// Tạo danh sách câu hỏi với định dạng {id, title, content}
const formattedQuestions = computed(() =>
  filteredQuestions.value.map(({ question, answer }, index) => ({
    id: index + 1,
    title: question,
    content: answer,
  }))
);

// GSAP Animation cho tiêu đề
onMounted(() => {
  // Chọn tất cả các phần tử title-word
  const titleWords = document.querySelectorAll(".title-word");

  // Tạo hiệu ứng stagger cho các từ trong tiêu đề
  gsap.from(titleWords, {
    opacity: 0,
    y: 20, // Di chuyển từ dưới lên
    duration: 0.8,
    stagger: 0.2, // Delay giữa các phần tử
    ease: "power2.out", // Hiệu ứng mượt mà
  });
});
const openMap = (id: number) => {
  switch (id) {
    case 1:
      window.open("https://maps.app.goo.gl/MeVHwiM3wp7bVyz98", "_blank");
      break;
    case 2:
      window.open("https://maps.app.goo.gl/C2MTWCP6qkDohTMu6", "_blank");
      break;
  }
};
</script>

<template>
  <section class="faq grid-container container" style="overflow: hidden">
    <!-- Tiêu đề FAQ với animation -->
    <p class="h2 title title-anim">
      <span
        v-for="(word, index) in faqData.title"
        :key="index"
        class="title-word"
      >
        {{ word }}
      </span>
    </p>

    <!-- Khối câu hỏi -->
    <div class="questions-block">
      <div class="block-flex">
        <div class="questions">
          <FaqBtn :active="true" :text="'Nhà Trai'" />
          <FaqTrai>
            <LinkX
              :to="'/'"
              type="button"
              @click="openMap(1)"
              playfair
              style="margin: auto;display:flex"
              text="Xem bản đồ"
            ></LinkX>
          </FaqTrai>
        </div>
        <div class="questions">
          <FaqBtn :active="true" :text="'Nhà Gái'" />
          <FaqGai>
            <LinkX
              :to="'/'"
              type="button"
              @click="openMap(2)"
              playfair
              style="margin: auto;display:flex"
              text="Xem bản đồ"
            ></LinkX>
          </FaqGai>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.faq {
  grid-template-rows: max-content 1fr;
  overflow: hidden;
  padding-bottom: 12.75rem;
  padding-top: 12.75rem;
  background-image: url("/flower-large.svg");
  background-repeat: no-repeat;
  background-position: left;
}

@media (max-width: 1023px) {
  .faq {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: unset;
    padding-bottom: 4.5rem;
    padding-top: 4.5rem;
  }
}

.title {
  display: grid;
  grid-auto-rows: max-content;
  grid-column: 1/5;
  grid-template-columns: subgrid;
}

@media (max-width: 1023px) {
  .title {
    grid-column: 1/-1;
    grid-row: 1/2;
    font-weight: 800;
    text-align: center;
  }
}

.title-word {
  grid-column: 1/-1;
}

.title-word:nth-child(3) {
  grid-column: 2/-1;
}

@media (max-width: 1023px) {
  .title-word:nth-child(3) {
    grid-column: 1/-1;
    padding-left: 3.5rem;
  }
}

.contact-block {
  align-self: start;
  grid-column: 2/5;
  grid-row: 2/3;
  margin-top: var(--offset-112);
}

@media (max-width: 1023px) {
  .contact-block {
    grid-column: 1/-1;
    grid-row: 3/4;
  }
}

.questions-block {
  display: grid;
  grid-auto-rows: max-content;
  grid-column: 5/9;
  grid-row: 1/3;
  grid-template-columns: subgrid;
}

@media (max-width: 1023px) {
  .questions-block {
    grid-column: 1/-1;
    grid-row: 2/3;
  }
}

.categories {
  grid-column: 2/-1;
}

@media (max-width: 1023px) {
  .categories {
    grid-column: 1/-1;
  }
}

.category-button:not(:first-child) {
  margin-left: 1.5rem;
}
.block-flex {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 5 / 1;
}
@media (max-width: 1280px) {
  .block-flex {
    flex-direction: column;
    grid-column: 4 / 1;
  }
}
.questions {
  margin-top: 2rem;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}

@media (max-width: 1023px) {
  .questions {
    margin-top: 1.5rem;
    padding-left: 0;
  }
}
</style>
