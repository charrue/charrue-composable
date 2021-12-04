import {
  ref,
  unref,
  computed,
} from "vue-demi";
import type { UnwrapRef, ComputedRef } from "vue-demi";
import { isDef } from "../../utils/index";

type IState = string | number | boolean | undefined;

export interface Actions<T = IState> {
  setLeft: () => void;
  setRight: () => void;
  toggle: (value?: T) => void;
}

function useToggle<T = boolean | undefined>(): {
  state: ComputedRef<boolean>,
  actions: Actions<T>
};

function useToggle<T = IState>(defaultValue: T): {
  state: ComputedRef<T>,
  actions: Actions<T>
};

function useToggle<T = IState, U = IState>(
  defaultValue: T,
  reverseValue: U,
): {
  state: ComputedRef<T | U>,
  actions: Actions<T | U>
};

function useToggle<D extends IState = IState, R extends IState = IState>(
  defaultValue: D = false as D,
  reverseValue?: R,
) {
  const getDefault = () => (isDef(unref(defaultValue)) ? unref(defaultValue) : true) as D;
  const getReverse = () => (isDef(unref(reverseValue)) ? unref(reverseValue) : !getDefault()) as R;

  const state = ref<D | R>(getDefault());

  const toggle = (value: UnwrapRef<D>) => {
    if (isDef(unref(value))) {
      state.value = unref(value);
      return;
    }
    const newValue = state.value !== getDefault() ? getDefault() : getReverse();
    state.value = newValue as UnwrapRef<D | R>;
  };
  const setLeft = () => {
    state.value = getDefault() as UnwrapRef<D>;
  };
  const setRight = () => {
    state.value = getReverse() as UnwrapRef<R>;
  };

  return {
    state: computed(() => state.value),
    actions: {
      setLeft,
      setRight,
      toggle,
    },
  };
}

export default useToggle;
