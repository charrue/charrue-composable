# useTimeoutBoolean
可延迟地切换Boolean状态。

## Usage

``` ts
const [loading, { setState, toggle }] = useTimeoutBoolean(false, [0, 500]);
console.log(loading.value) // default value is false

toggle();
console.log(loading.value) // false -> true

setState(false);
console.log(loading.value) // after 500ms, true -> false
```
