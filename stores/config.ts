import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", () => {
  const rspv = ref(false);
  const box = ref(false);

  return {
    rspv,
    box,
  };
});
