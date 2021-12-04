<template>
  <div>
    <p>Count: {{ throttledValue }}</p>
    <button @click="onClick">Click</button>
  </div>
</template>
<script>
import { ref } from 'vue-demi';
import { useThrottle } from "@charrue/composable";
export default {
  setup() {
    const count = ref(0)
    const throttledValue = useThrottle(count, 1000)
    const onClick = () => {
      count.value++
    }

    return {
      throttledValue,
      onClick
    }
  },
};
</script>