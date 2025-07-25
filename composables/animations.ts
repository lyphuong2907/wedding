// animations.js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
// Đăng ký các plugin GSAP
gsap.registerPlugin(SplitText, ScrollTrigger, DrawSVGPlugin);


export function useAnimations() {
  const animateText = ({
    el,
    onScroll = false,
  }: {
    el: any;
    onScroll?: boolean;
  }) => {
    if (!el) return;

    // Tách văn bản thành các ký tự và bọc trong span để animate từng ký tự
    const text = el.textContent;
    el.innerHTML = text
      .split("")
      .map((char: string) => `<span class="char">${char}</span>`)
      .join("");

    const chars = el.querySelectorAll(".char");

    // Tạo animation GSAP
    gsap.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: onScroll ? { trigger: el, start: "top 80%" } : null,
      }
    );
  };

  const resetAnimation = ({
    el,
    onScroll = false,
  }: {
    el: any;
    onScroll?: boolean;
  }) => {
    if (!el) return;

    // Lấy tất cả các ký tự (span.char) được tạo bởi animateText
    const chars = el.querySelectorAll(".char");
    if (!chars.length) return;

    // Đặt lại trạng thái animation về mặc định
    gsap.set(chars, {
      opacity: 1,
      y: 0,
      clearProps: "all", // Xóa các thuộc tính GSAP trước đó
    });
  };

  const animateTitleWord = ({
    el,
    onScroll = true,
    withOpacity = false,
  }: {
    el: any;
    onScroll?: boolean;
    withOpacity?: boolean;
  }) => {
    if (!el) return;

    let split;
    // Tạo SplitText instance để chia nhỏ text thành từ và ký tự
    const words = el.querySelectorAll(".title-anim-word");
    const chars = el.querySelectorAll(".title-anim-char");

    if (words.length && chars.length) {
      split = { words: [...words], chars: [...chars] };
    } else {
      split = new SplitText(el, {
        type: "words, chars",
        wordsClass: "title-anim-word",
        charsClass: "title-anim-char",
      });
    }

    return new Promise((resolve) => {
      const timeline = gsap.timeline();

      // Thiết lập perspective cho các từ
      gsap.set(split.words, { perspective: 1000 });

      // Lặp qua từng từ để áp dụng hiệu ứng cho các ký tự
      split.words.forEach((word) => {
        const chars = word.querySelectorAll(".title-anim-char");
        const charsCount = chars.length;

        timeline
          .fromTo(
            chars,
            {
              "will-change": "transform",
              x: 0,
              y: 0,
              rotationZ: 0,
              rotationY: 0,
              ...(withOpacity && { autoAlpha: 1 }),
            },
            {
              x: (index) => {
                const midPoint = Math.ceil(charsCount / 2);
                const adjustedIndex =
                  index < midPoint
                    ? index
                    : midPoint -
                      Math.abs(Math.floor(charsCount / 2) - index) -
                      1;
                return (
                  200 *
                  (charsCount % 2
                    ? Math.abs(midPoint - 1 - adjustedIndex)
                    : Math.abs(midPoint - adjustedIndex)) *
                  (index < charsCount / 2 ? -1 : 1)
                );
              },
              y: (index) => {
                const midPoint = Math.ceil(charsCount / 2);
                const adjustedIndex =
                  index < midPoint
                    ? index
                    : midPoint -
                      Math.abs(Math.floor(charsCount / 2) - index) -
                      1;
                return 60 * adjustedIndex;
              },
              rotationY: -270,
              rotationZ: (index) => {
                const midPoint = Math.ceil(charsCount / 2);
                const adjustedIndex =
                  index < midPoint
                    ? index
                    : midPoint -
                      Math.abs(Math.floor(charsCount / 2) - index) -
                      1;
                return index < charsCount / 2
                  ? 8 * Math.abs(adjustedIndex - charsCount / 2)
                  : -1 * Math.abs(adjustedIndex - charsCount / 2) * 8;
              },
              ease: "default-ease",
              scale: 1,
              ...(withOpacity && { autoAlpha: 0 }),
              duration: 1.2,
              ...(onScroll && {
                scrollTrigger: {
                  trigger: word,
                  start: "center bottom",
                  end: "top top",
                },
              }),
            },
            0
          )
          .add(resolve, "-=0.5");
      });
    });
  };

  const animatePath = (path: any) => {
    if (!path) return;
    gsap.fromTo(
      path,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 1.6, ease: "arrow-ease" }
    );
  };

  const animateTitle = ({ el, onScroll = true }: { el: any; onScroll?: boolean }) => {
    if (!el) return;
  
    gsap.fromTo(
      el,
      { opacity: 0, y: 50,delay:0.5 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: onScroll
          ? {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          : null
      }
    )
  }

  return {
    animateText,
    resetAnimation,
    animateTitleWord,
    animatePath,
    animateTitle
  };
}
