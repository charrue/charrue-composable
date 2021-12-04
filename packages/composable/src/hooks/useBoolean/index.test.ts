import { useSetup } from "../../utils/test-helper";
import useBoolean from "./index";

describe("测试useBoolean", () => {
  it("boolean 切换", () => {
    useSetup(() => {
      const { state, actions } = useBoolean(false);

      expect(state.value).toBe(false);

      actions.toggle();
      expect(state.value).toBe(true);

      actions.setFalse();
      expect(state.value).toBe(false);
      actions.setTrue();
      expect(state.value).toBe(true);
    });
  });
});
