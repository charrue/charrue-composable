<template>
  <div>
    <p>Count: {{ count }}</p>
  </div>
</template>
<script>
import { ref } from 'vue-demi'
import { useInterval } from '@charrue/composable'
export default {
  setup() {
    const count = ref(0)

    useInterval(() => {
      count.value++
    }, 1000);

    return {
      count
    }
  }
}
</script>