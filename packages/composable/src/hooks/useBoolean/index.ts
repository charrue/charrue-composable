import type { ComputedRef } from "vue-demi";
import useToggle from "../useToggle/index";

type IState = boolean | undefined;

export interface Actions<T = IState> {
  setTrue: () => void;
  setFalse: () => void;
  toggle: (value?: T) => void;
}

function useBoolean(defaultValue = false): { state: ComputedRef<boolean>, actions: Actions } {
  const { state, actions } = useToggle(defaultValue);

  return {
    state,
    actions: {
      setTrue: () => actions.toggle(true),
      setFalse: () => actions.toggle(false),
      toggle: (value?: IState) => actions.toggle(value),
    },
  };
}

export default useBoolean;
