import {
  getCurrentInstance,
  unref,
  computed,
} from "vue-demi";
import throttle from "lodash/throttle";
import type { DebouncedFunc } from "lodash";

type noop = (...args: any[]) => any;

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export default function useThrottleFn<T extends noop>(
  fn: T,
  wait = 1000,
  options: ThrottleOptions = {},
): {
  run: DebouncedFunc<T>,
  cancel: () => void,
  flush: () => ReturnType<T> | undefined,
} {
  if (!getCurrentInstance()) {
    throw new Error(
      "Invalid hook call: `useThrottleFn` can only be called inside of `setup()`.",
    );
  }

  const throttled = computed(() => throttle(fn, unref(wait), options));

  return {
    run: throttled.value,
    cancel: throttled.value.cancel,
    flush: throttled.value.flush,
  };
}
