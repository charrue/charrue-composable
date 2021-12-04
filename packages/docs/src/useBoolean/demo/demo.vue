<template>
  <div>
    <p>State: {{ state }}</p>
    <button @click="() => actions.toggle()">toggle</button>
    <button @click="actions.setFalse">setFalse</button>
    <button @click="actions.setTrue">setTrue</button>
  </div>
</template>
<script>
import { useBoolean }from '@charrue/composable'
export default {
  setup() {
    const { state, actions } = useBoolean(false)

    return {
      state,
      actions
    }
  },
}
</script>
