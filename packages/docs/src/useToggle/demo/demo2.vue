<template>
  <div>
    <p>State: {{ state }}</p>
    <button @click="() => actions.toggle()">toggle</button>
    <button @click="actions.setLeft">setLeft</button>
    <button @click="actions.setRight">setRight</button>
  </div>
</template>
<script>
import { useToggle }from '@charrue/composable'
export default {
  setup() {
    const { state, actions } = useToggle("Hello", "World")

    return {
      state,
      actions
    }
  },
}
</script>
