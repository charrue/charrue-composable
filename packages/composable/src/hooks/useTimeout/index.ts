import {
  unref,
  watchEffect,
  getCurrentInstance,
} from "vue-demi";
import type { Ref } from "vue-demi";

type DelayParam = number | null | undefined
function useTimeout(
  fn: () => void,
  delay: DelayParam | Ref<DelayParam>,
): {
  stop: () => void,
} {
  if (!getCurrentInstance()) {
    throw new Error(
      "Invalid hook call: `useTimeout` can only be called inside of `setup()`.",
    );
  }

  let timer: NodeJS.Timer | null = null;

  const stop = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  watchEffect((onInvalidate) => {
    // 清除之前的定时器
    onInvalidate(stop);

    if (typeof unref(delay) !== "number" || Number(unref(delay)) <= 0) {
      return;
    }

    timer = setTimeout(() => {
      if (typeof fn === "function") {
        fn();
      }
    }, Number(unref(delay)));
  });

  return {
    stop,
  };
}

export default useTimeout;
