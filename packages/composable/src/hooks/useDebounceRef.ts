import { useDebounce } from "@vueuse/core";

const useDebounceRef: typeof useDebounce = (
  value,
  ms,
  options,
) => useDebounce(value, ms, options);

export default useDebounceRef;
