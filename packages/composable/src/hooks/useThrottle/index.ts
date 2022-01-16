import {
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
  const throttledValue = ref(unref(value));

  const { run } = useThrottleFn(() => {
    throttledValue.value = unref(value) as UnwrapRef<T>;
  }, Number(unref(wait)), options);

  watch(value, () => {
    run();
  });

  return throttledValue;
}
