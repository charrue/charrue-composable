import { useSetup } from "../../utils/test-helper";
import useToggle from "./index";

describe("测试useToggle", () => {
  it("默认为 boolean 切换", () => {
    useSetup(() => {
      const { state, actions } = useToggle(false);

      expect(state.value).toBe(false);

      actions.toggle();
      expect(state.value).toBe(true);

      actions.setLeft();
      expect(state.value).toBe(false);
      actions.setRight();
      expect(state.value).toBe(true);
    });
  });

  it("在两个值之间切换", () => {
    useSetup(() => {
      const { state, actions } = useToggle("Hello", "World");

      expect(state.value).toBe("Hello");

      actions.toggle();
      expect(state.value).toBe("World");

      actions.setLeft();
      expect(state.value).toBe("Hello");
      actions.setRight();
      expect(state.value).toBe("World");
    });
  });
});
