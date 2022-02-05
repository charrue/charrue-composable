'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vueDemi = require('vue-demi');

const isDef = (val) => val !== void 0 && val !== null;

function useToggle(defaultValue = false, reverseValue) {
  const getDefault = () => isDef(vueDemi.unref(defaultValue)) ? vueDemi.unref(defaultValue) : true;
  const getReverse = () => isDef(vueDemi.unref(reverseValue)) ? vueDemi.unref(reverseValue) : !getDefault();
  const state = vueDemi.ref(getDefault());
  const toggle = (value) => {
    if (isDef(vueDemi.unref(value))) {
      state.value = vueDemi.unref(value);
      return;
    }
    const newValue = state.value !== getDefault() ? getDefault() : getReverse();
    state.value = newValue;
  };
  const setLeft = () => {
    state.value = getDefault();
  };
  const setRight = () => {
    state.value = getReverse();
  };
  return {
    state: vueDemi.computed(() => state.value),
    actions: {
      setLeft,
      setRight,
      toggle
    }
  };
}

function useBoolean(defaultValue = false) {
  const { state, actions } = useToggle(defaultValue);
  return {
    state,
    actions: {
      setTrue: () => actions.toggle(true),
      setFalse: () => actions.toggle(false),
      toggle: (value) => actions.toggle(value)
    }
  };
}

const useControlledProp = (props, key) => {
  const tempProps = vueDemi.ref(props[key]);
  const context = vueDemi.getCurrentInstance();
  vueDemi.watch(() => props[key], (value) => {
    tempProps.value = value;
  });
  const state = vueDemi.computed(() => props[key] || tempProps.value);
  const setState = (value) => {
    if (value !== vueDemi.toRaw(state.value)) {
      tempProps.value = value;
      context == null ? void 0 : context.emit(`update:${key}`, value);
    }
  };
  return [state, setState];
};

function tryOnScopeDispose(fn) {
  if (vueDemi.getCurrentScope()) {
    vueDemi.onScopeDispose(fn);
    return true;
  }
  return false;
}

const isClient = typeof window !== "undefined";
const isString = (val) => typeof val === "string";
const noop = () => {
};

function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  const filter = (invoke) => {
    const duration = vueDemi.unref(ms);
    const maxDuration = vueDemi.unref(options.maxWait);
    if (timer)
      clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        clearTimeout(maxTimer);
        maxTimer = null;
      }
      return invoke();
    }
    if (maxDuration && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (timer)
          clearTimeout(timer);
        maxTimer = null;
        invoke();
      }, maxDuration);
    }
    timer = setTimeout(() => {
      if (maxTimer)
        clearTimeout(maxTimer);
      maxTimer = null;
      invoke();
    }, duration);
  };
  return filter;
}
function throttleFilter(ms, trailing = true, leading = true) {
  let lastExec = 0;
  let timer;
  let preventLeading = !leading;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
  };
  const filter = (invoke) => {
    const duration = vueDemi.unref(ms);
    const elapsed = Date.now() - lastExec;
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration) {
      lastExec = Date.now();
      if (preventLeading)
        preventLeading = false;
      else
        invoke();
    }
    if (trailing) {
      timer = setTimeout(() => {
        lastExec = Date.now();
        if (!leading)
          preventLeading = true;
        clear();
        invoke();
      }, duration);
    }
    if (!leading && !timer)
      timer = setTimeout(() => preventLeading = true, duration);
  };
  return filter;
}

function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}

function useDebounce(value, ms = 200, options = {}) {
  if (ms <= 0)
    return value;
  const debounced = vueDemi.ref(value.value);
  const updater = useDebounceFn(() => {
    debounced.value = value.value;
  }, ms, options);
  vueDemi.watch(value, () => updater());
  return debounced;
}

function useThrottleFn(fn, ms = 200, trailing = true, leading = true) {
  return createFilterWrapper(throttleFilter(ms, trailing, leading), fn);
}

function useThrottle(value, delay = 200, trailing = true, leading = true) {
  if (delay <= 0)
    return value;
  const throttled = vueDemi.ref(value.value);
  const updater = useThrottleFn(() => {
    throttled.value = value.value;
  }, delay, trailing, leading);
  vueDemi.watch(value, () => updater());
  return throttled;
}

function tryOnMounted(fn, sync = true) {
  if (vueDemi.getCurrentInstance())
    vueDemi.onMounted(fn);
  else if (sync)
    fn();
  else
    vueDemi.nextTick(fn);
}

const defaultWindow = isClient ? window : void 0;
isClient ? window.document : void 0;
isClient ? window.navigator : void 0;
isClient ? window.location : void 0;

function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = vueDemi.watch(() => vueDemi.unref(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}

function templateRef(key, initialValue = null) {
  const instance = vueDemi.getCurrentInstance();
  let _trigger = () => {
  };
  const element = vueDemi.customRef((track, trigger) => {
    _trigger = trigger;
    return {
      get() {
        var _a, _b;
        track();
        return (_b = (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$refs[key]) != null ? _b : initialValue;
      },
      set() {
      }
    };
  });
  tryOnMounted(_trigger);
  vueDemi.onUpdated(_trigger);
  return element;
}

const _global = typeof globalThis === "undefined" ? undefined : globalThis;
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
_global[globalKey];

function useScroll$1(element, options = {}) {
  const {
    throttle = 0,
    idle = 200,
    onStop = noop,
    onScroll = noop,
    offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventListenerOptions = {
      capture: false,
      passive: true
    }
  } = options;
  const x = vueDemi.ref(0);
  const y = vueDemi.ref(0);
  const isScrolling = vueDemi.ref(false);
  const arrivedState = vueDemi.reactive({
    left: true,
    right: false,
    top: true,
    bottom: false
  });
  const directions = vueDemi.reactive({
    left: false,
    right: false,
    top: false,
    bottom: false
  });
  if (element) {
    const onScrollEnd = useDebounceFn((e) => {
      isScrolling.value = false;
      directions.left = false;
      directions.right = false;
      directions.top = false;
      directions.bottom = false;
      onStop(e);
    }, throttle + idle);
    const onScrollHandler = (e) => {
      const eventTarget = e.target === document ? e.target.documentElement : e.target;
      const scrollLeft = eventTarget.scrollLeft;
      directions.left = scrollLeft < x.value;
      directions.right = scrollLeft > x.value;
      arrivedState.left = scrollLeft <= 0 + (offset.left || 0);
      arrivedState.right = scrollLeft + eventTarget.clientWidth >= eventTarget.scrollWidth - (offset.right || 0);
      x.value = scrollLeft;
      const scrollTop = eventTarget.scrollTop;
      directions.top = scrollTop < y.value;
      directions.bottom = scrollTop > y.value;
      arrivedState.top = scrollTop <= 0 + (offset.top || 0);
      arrivedState.bottom = scrollTop + eventTarget.clientHeight >= eventTarget.scrollHeight - (offset.bottom || 0);
      y.value = scrollTop;
      isScrolling.value = true;
      onScrollEnd(e);
      onScroll(e);
    };
    useEventListener(element, "scroll", throttle ? useThrottleFn(onScrollHandler, throttle) : onScrollHandler, eventListenerOptions);
  }
  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions
  };
}

var _a, _b;
isClient && (window == null ? void 0 : window.navigator) && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.platform) && /iP(ad|hone|od)/.test((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.platform);

var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
const initialRect = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 0,
  width: 0
};
__spreadValues$3({
  text: ""
}, initialRect);

const useDebounceRef = (value, ms, options) => useDebounce(value, ms, options);

const useScroll = (element, options) => useScroll$1(element, options);

function useTemplateRef(key, initialValue) {
  return templateRef(key, initialValue);
}

const useThrottleRef = (value, delay, trailing, leading) => useThrottle(value, delay, trailing, leading);

exports.useBoolean = useBoolean;
exports.useControlledProp = useControlledProp;
exports.useDebounceRef = useDebounceRef;
exports.useScroll = useScroll;
exports.useTemplateRef = useTemplateRef;
exports.useThrottleRef = useThrottleRef;
exports.useToggle = useToggle;
