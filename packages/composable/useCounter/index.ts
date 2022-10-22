import { ref } from "vue-demi";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const inc = (delta = 1) => {
    count.value += delta;
    return count.value;
  };
  const dec = (delta = 1) => {
    count.value -= delta;
    return count.value;
  };
  const get = () => count.value;
  const set = (val: number) => {
    count.value = val;
    return count.value;
  };
  const reset = (val = initialValue) => {
    initialValue = val;
    return set(val);
  };

  return { count, inc, dec, get, set, reset };
}
