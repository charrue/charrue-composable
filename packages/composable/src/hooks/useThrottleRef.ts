import { useThrottle } from "@vueuse/core";

const useThrottleRef: typeof useThrottle = (
  value,
  delay,
  trailing,
  leading,
) => useThrottle(value, delay, trailing, leading);

export default useThrottleRef;
