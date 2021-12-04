import {
  ref,
  unref,
  readonly,
  watchEffect,
  getCurrentInstance,
} from "vue-demi";
import type { Ref } from "vue-demi";

type DelayParam = number | null | undefined
type OptionParam = {
  immediate?: boolean
}

function useInterval(
  fn: () => void,
  delay: DelayParam | Ref<DelayParam>,
  options: OptionParam = { immediate: false },
): {
  stop: () => void,
  active: Ref<boolean>
} {
  if (!getCurrentInstance()) {
    throw new Error(
      "Invalid hook call: `useInterval` can only be called inside of `setup()`.",
    );
  }

  let timer: NodeJS.Timer | null = null;
  const isActive = ref(false);

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    isActive.value = false;
  };

  // 如果 设置immediate为true，且 delay被修改后，fn也会立即执行一次
  watchEffect((onInvalidate) => {
    if (unref(options.immediate) && isActive.value === false) {
      isActive.value = true;
      fn();
    }

    // 清除之前的定时器
    onInvalidate(stop);

    if (typeof unref(delay) !== "number" || Number(unref(delay)) <= 0) {
      return;
    }

    timer = setInterval(() => {
      if (typeof fn === "function") {
        fn();
      }
    }, Number(unref(delay)));
    isActive.value = true;
  });

  return {
    stop,
    active: readonly(isActive),
  };
}

export default useInterval;
