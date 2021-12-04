import { useSetup, sleep } from "../../utils/test-helper";
import useThrottleFn from "./index";

describe("测试useThrottleFn", () => {
  it("run, cancel and flush should work", () => {
    let count = 0;
    const throttleFn = (gap: number) => {
      count += gap;
    };
    useSetup(async () => {
      const throttledState = useThrottleFn(throttleFn, 200);
      throttledState.run(1);
      expect(count).toBe(1);

      // * 无法执行到里面的内容
      sleep(300)
        .then(() => {
          throttledState.run(3);
          throttledState.run(4);
          throttledState.run(5);
          expect(count).toBe(1);
        });
    });
  });
});
