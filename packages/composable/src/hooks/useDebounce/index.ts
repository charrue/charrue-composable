import {
  getCurrentInstance,
  ref,
  unref,
  watch,
} from "vue-demi";
import type { Ref, UnwrapRef } from "vue-demi";
import { DebounceOptions } from "../useDebounceFn/index";
import useDebounceFn from "../useDebounceFn/index";

export default function useDebounce<T>(
  value: Ref<T>,
  wait: number | Ref<number> = 1000,
  options: DebounceOptions = {},
): Ref<UnwrapRef<T>> {
  if (!getCurrentInstance()) {
    throw new Error(
      "Invalid hook call: `useDebounce` can only be called inside of `setup()`.",
    );
  }

  const throttledValue = ref(unref(value));

  const { run } = useDebounceFn(() => {
    throttledValue.value = unref(value) as UnwrapRef<T>;
  }, Number(unref(wait)), options);

  watch(value, () => {
    run();
  });

  return throttledValue;
}
