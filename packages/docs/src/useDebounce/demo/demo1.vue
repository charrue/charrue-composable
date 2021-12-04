<template>
  <div>
    <p>Count: {{ debouncedValue }}</p>
    <button @click="onClick">Click</button>
  </div>
</template>
<script>
import { ref } from 'vue-demi';
import { useDebounce } from "@charrue/composable";
export default {
  setup() {
    const count = ref(0)
    const debouncedValue = useDebounce(count, 1000)
    const onClick = () => {
      count.value++
    }

    return {
      debouncedValue,
      onClick
    }
  },
};
</script>