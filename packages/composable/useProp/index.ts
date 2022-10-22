import { computed, getCurrentInstance } from "vue-demi";
import type { ComputedRef } from "vue-demi";

export const useProp = <T>(name: string): ComputedRef<T | undefined> => {
  const vm = getCurrentInstance();
  return computed(() => (vm?.proxy?.$props as Record<string, any>)[name] ?? undefined);
};
