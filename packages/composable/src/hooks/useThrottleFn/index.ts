import {
  unref,
  computed,
} from "vue-demi";
import throttle from "lodash/throttle";
import type { DebouncedFunc } from "lodash";

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export default function useThrottleFn<T extends(...args: any[]) => any>(
  fn: T,
  wait = 1000,
  options: ThrottleOptions = {}): {
  run: DebouncedFunc<T>,
  cancel: () => void,
  flush: () => ReturnType<T> | undefined,
} {
  const throttled = computed(() => throttle(fn, unref(wait), options));

  return {
    run: throttled.value,
    cancel: throttled.value.cancel,
    flush: throttled.value.flush,
  };
}
