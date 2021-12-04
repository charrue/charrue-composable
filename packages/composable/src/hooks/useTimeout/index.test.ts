import { useSetup } from "../../utils/test-helper";
import useTimeout from "./index";

describe("useTimeout", () => {
  jest.useFakeTimers();

  it("基本使用", () => {
    useSetup(() => {
      const callback = jest.fn();
      useTimeout(callback, 50);
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(20);
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(70);
      expect(callback).toBeCalledTimes(1);
    });
  });
});
