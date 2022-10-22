# useProp

通过`getCurrentInstance`获取到组件实例的`$props`。结果返回的是一个`ComputedRef`。

## Usage

``` ts
defineComponent({
  name: "Child",
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
  setup() {
    const prop = useProp("msg");

    return () => h("div", prop.value);
  },
});
```
