<template>
  <div>
    <p>{{ count }}</p>
    <button @click="run">Click</button>
  </div>
</template>
<script>
import { ref } from 'vue-demi'
import { useDebounceFn } from '@charrue/composable'

export default {
  setup() {
    const count = ref(0)
    const { run } = useDebounceFn(() => {
      count.value++
    }, 500)

    return {
      count,
      run
    }
  }
}
</script>