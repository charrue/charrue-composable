import {
  getCurrentInstance,
  readonly,
  unref,
  computed,
} from "vue-demi";
import debounce from "lodash/debounce";
import type { DebouncedFunc } from "lodash";

type noop = (...args: any[]) => any;

export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export default function useDebounceFn<T extends noop>(
  fn: T,
  wait = 1000,
  options: DebounceOptions = {},
): {
  run: DebouncedFunc<T>,
  cancel: () => void,
  flush: () => ReturnType<T> | undefined,
} {
  if (!getCurrentInstance()) {
    throw new Error(
      "Invalid hook call: `useDebounceFn` can only be called inside of `setup()`.",
    );
  }

  const debounced = computed(() => debounce(fn, unref(wait), options));

  return {
    run: unref(readonly(debounced)),
    cancel: unref(readonly(debounced.value.cancel)),
    flush: unref(readonly(debounced.value.flush)),
  };
}
