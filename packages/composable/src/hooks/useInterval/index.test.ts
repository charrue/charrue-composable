/* eslint-disable max-lines-per-function */
import { useSetup } from "../../utils/test-helper";
import useInterval from "./index";
import { ref } from "vue-demi";

describe("测试useInterval", () => {
  jest.useFakeTimers();
  it("基本使用", () => {
    useSetup(() => {
      const callback = jest.fn();
      useInterval(callback, 20);
      expect(callback).not.toBeCalled();

      jest.advanceTimersByTime(70);
      expect(callback).toBeCalledTimes(3);
    });
  });

  it("delay为undefined时不会调用函数", () => {
    useSetup(() => {
      const callback = jest.fn();
      useInterval(callback, undefined);
      expect(callback).not.toBeCalled();

      jest.advanceTimersByTime(70);
      expect(callback).not.toBeCalled();
    });
  });

  it("immediate测试", () => {
    useSetup(() => {
      const callback = jest.fn();
      useInterval(callback, 20, { immediate: true });
      expect(callback).toBeCalled();
      expect(callback).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(50);
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  it("动态修改delay", () => {
    useSetup(() => {
      const callback = jest.fn();
      const delay = ref(20);
      useInterval(callback, delay);

      jest.advanceTimersByTime(50);
      expect(callback).toHaveBeenCalledTimes(2);

      delay.value = 40;
      jest.advanceTimersByTime(50);
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });
});
