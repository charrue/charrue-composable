import {
  getCurrentInstance,
  ref,
  unref,
  watch,
} from "vue-demi";
import type { Ref, UnwrapRef } from "vue-demi";
import { ThrottleOptions } from "../useThrottleFn/index";
import useThrottleFn from "../useThrottleFn/index";

export default function useThrottle<T>(
  value: Ref<T>,
  wait: number | Ref<number> = 1000,
  options: ThrottleOptions = {},
): Ref<UnwrapRef<T>> {
  if (!getCurrentInstance()) {
    throw new Error(
      "Invalid hook call: `useThrottle` can only be called inside of `setup()`.",
    );
  }

  const throttledValue = ref(unref(value));

  const { run } = useThrottleFn(() => {
    throttledValue.value = unref(value) as UnwrapRef<T>;
  }, Number(unref(wait)), options);

  watch(value, () => {
    run();
  });

  return throttledValue;
}
