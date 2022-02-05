import {
  unref,
  watchEffect,
} from "vue-demi";
import type { Ref } from "vue-demi";

function useTimeout(
  fn: () => void,
  delay: number | undefined | Ref<number | undefined>,
): {
  stop: () => void,
} {
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
