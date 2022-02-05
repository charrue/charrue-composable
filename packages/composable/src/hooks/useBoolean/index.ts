import type { ComputedRef } from "vue-demi";
import useToggle from "../useToggle/index";

export interface UseBooleanActions<T = boolean | undefined> {
  setTrue: () => void;
  setFalse: () => void;
  toggle: (value?: T) => void;
}

function useBoolean(
  defaultValue = false,
):{ state: ComputedRef<boolean>, actions: UseBooleanActions } {
  const { state, actions } = useToggle(defaultValue);

  return {
    state,
    actions: {
      setTrue: () => actions.toggle(true),
      setFalse: () => actions.toggle(false),
      toggle: (value?: boolean | undefined) => actions.toggle(value),
    },
  };
}

export default useBoolean;
