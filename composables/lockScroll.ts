// utils/useScrollLock.js
export function useScrollLock() {
  const lockScroll = (isLocked: boolean) => {
    document.body.style.overflow = isLocked ? "hidden" : "";
  };

  return { lockScroll };
}
