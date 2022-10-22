<script lang="ts">
import { defineComponent, h, ref } from "vue-demi";
import { useProp } from "@charrue/composable";

const Child = defineComponent({
  name: "Child",
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const count = useProp("count");

    return () => h("div", `"count" prop value: ${count.value}`);
  },
});

export default defineComponent({
  name: "Par",
  setup() {
    const count = ref(1);
    const Increase = () => {
      count.value += 1;
    };
    return () => h("div", {}, [
      h(
        "button",
        {
          onClick: Increase,
        },
        "+",
      ),
      h(Child, { count: count.value }),
    ]);
  },
});
</script>
