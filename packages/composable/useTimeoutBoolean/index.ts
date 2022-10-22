import { readonly, Ref, ref } from "vue-demi";
import { tryOnScopeDispose } from "@vueuse/core";
/**
 * 可延迟地切换Boolean值的状态
 * @param {boolean} initialValue Boolean状态的默认值 @default false
 * @param {[number, number]} intervals
 *  状态切换的时间间隔
 *  接收一个长度为2的数字数组
 *  第一项表示切换到`true`的延迟执行时间
 *  第二项表示切换到`false`的延迟执行时间
 *  @default [0, 500]
 */
export const useTimeoutBoolean = (
  initialValue = false,
  intervals: [number, number] = [0, 500],
): [
    Readonly<Ref<boolean>>,
    {
      setState: (val: boolean) => void;
      toggle: () => void;
    }
  ] => {
  const state = ref(initialValue);

  let timer: number | null = null;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  const setState = (val: boolean) => {
    clear();

    if (val === state.value) return;
    const ms = Math.max(0, val ? intervals[0] : intervals[1]);
    if (ms) {
      timer = setTimeout(() => {
        state.value = val;
      }, ms) as unknown as number;
    } else {
      state.value = val;
    }
  };

  const toggle = () => {
    setState(!state.value);
  };

  tryOnScopeDispose(clear);

  return [readonly(state), { setState, toggle }];
};
