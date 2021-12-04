<template>
  <div>
    <p>{{ count }}</p>
    <button @click="run">Click</button>
  </div>
</template>
<script>
import { ref } from 'vue-demi'
import { useThrottleFn } from '@charrue/composable'

export default {
  setup() {
    const count = ref(0)
    const { run } = useThrottleFn(() => {
      count.value++
    }, 500)

    return {
      count,
      run
    }
  }
}
</script>