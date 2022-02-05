import {
  getCurrentInstance,
  ref,
  watch,
  computed,
  toRaw,
} from "vue-demi";
import type { Ref } from "vue-demi";

const useControlledProp = <T, K extends keyof T>(props: T, key: K) => {
  const tempProps = ref(props[key]) as Ref<T[K]>;
  const context = getCurrentInstance();

  watch(() => props[key], (value) => {
    tempProps.value = value;
  });

  const state = computed(() => props[key] || tempProps.value);

  const setState = (value: T[K]) => {
    if (value !== toRaw(state.value)) {
      tempProps.value = value;
      context?.emit(`update:${key}`, value);
    }
  };

  return [state, setState];
};

export default useControlledProp;
