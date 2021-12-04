import { useSetup, sleep } from "../../utils/test-helper";
import useDebounceFn from "./index";

describe("测试useDebounceFn", () => {
  it("run, cancel and flush should work", () => {
    let count = 0;
    const debounceFn = (gap: number) => {
      count += gap;
    };
    useSetup(async () => {
      const debouncedState = useDebounceFn(debounceFn, 200);

      debouncedState.run(2);
      debouncedState.run(2);
      debouncedState.run(2);

      expect(count).toBe(0);

      await sleep(300);
      expect(count).toBe(2);

      debouncedState.run(4);
      expect(count).toBe(2);
      await sleep(300);
      expect(count).toBe(6);

      debouncedState.run(4);
      expect(count).toBe(6);
      debouncedState.cancel();
      expect(count).toBe(6);
      await sleep(300);
      expect(count).toBe(6);

      debouncedState.run(1);
      expect(count).toBe(6);
      debouncedState.flush();
      expect(count).toBe(7);
      await sleep(300);
      expect(count).toBe(7);
    });
  });
});
