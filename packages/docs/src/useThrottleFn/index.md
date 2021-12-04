---
map:
  path: /base/use-throttle-fn
---

# useDebounceFn

用来处理函数节流的 Hook。

## 代码演示

### 基础用法


<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="频繁调用 run，但只会每500ms执行一次相关函数。">
</demo>

## API

```typescript
const {
  run,
  cancel,
  flush
} = useThrottleFn(
  fn: (...args: any[]) => any,
  wait: number,
  options?: Options
);
```

### Params

| 参数    | 说明               | 类型                      | 默认值 |
|---------|--------------------|---------------------------|--------|
| fn      | 需要防抖执行的函数 | `(...args: any[]) => any` | -      |
| wait | 等待时间，单位为毫秒     | `number`                 | 1000      |
| options | 配置防抖的行为     | `Options`                 | -      |

### Options

| 参数     | 说明                     | 类型      | 默认值  |
|----------|--------------------------|-----------|---------|
| leading  | 是否在延迟开始前调用函数 | `boolean` | `false` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `true`  |
| maxWait  | 最大等待时间，单位为毫秒 | `number`  | -       |

### Result

| 参数   | 说明                               | 类型                      |
|--------|------------------------------------|---------------------------|
| run    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| cancel | 取消当前防抖                       | `() => void`              |
| flush  | 立即调用当前防抖函数               | `() => void`              |
