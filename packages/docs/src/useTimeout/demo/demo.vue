<template>
  <div>
    <p>2s后从1变为2： {{count}}</p>
  </div>
</template>
<script>
import { useTimeout } from '@charrue/composable';
import { ref } from 'vue-demi';

export default {
  setup() {
    const count = ref(1);
    useTimeout(() => {
      count.value = 2
    }, 2000)
    return {
      count
    }
  }
}
</script>