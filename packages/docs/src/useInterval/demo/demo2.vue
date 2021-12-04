<template>
  <div>
    <p>Count: {{count}}</p>
    <button @click="() => delay += 1000">interval + 1000</button>
    <button @click="() => delay = 1000">reset interval</button>
    <button @click="stop">stop</button>
  </div>
</template>
<script>
import { ref } from 'vue-demi'
import { useInterval } from '@charrue/composable'
export default {
  setup() {
    const count = ref(0)
    const delay = ref(1000)

    const { stop } = useInterval(() => {
      count.value++
    }, delay);

    return {
      count,
      delay,
      stop,
    }
  }
}
</script>