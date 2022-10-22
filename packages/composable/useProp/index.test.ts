import { defineComponent, h, ComputedRef } from "vue-demi";
import { mount } from "../tests/test-helper";
import { useProp } from "./index";

const createDemo = (props: { msg?: string }, cb: (val: ComputedRef<any>) => void) => {
  const Child = defineComponent({
    name: "Child",
    props: {
      msg: {
        type: String,
      },
    },
    setup() {
      const prop = useProp("msg");
      cb(prop);

      return () => h("div");
    },
  });
  mount(h(Child, props));
};

describe("useProp", () => {
  test("prop default value is undefined", () => {
    createDemo({}, (prop) => {
      expect(prop.value).toBe(undefined);
    });
  });

  test("pass prop value", () => {
    createDemo({ msg: "message" }, (prop) => {
      expect(prop.value).toBe("message");
    });
  });
});
