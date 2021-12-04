---
map:
  path: /base/use-throttle
---

# useThrottle

用来处理节流值的 Hook。

## 代码演示

### 基础用法

<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="ThrottledValue 每隔 500ms 变化一次。">
</demo>


## API

```typescript
const throttledValue = useThrottle(
  value: Ref<any>,
  wait: number,
  options?: Options
);
```

### Params

| 参数    | 说明           | 类型      | 默认值 |
|---------|----------------|-----------|--------|
| value   | 需要节流的值   | `any`     | -      |
| wait     | 等待时间，单位为毫秒     | `number`  | `1000` |
| options | 配置节流的行为 | `Options` | -      |

### Options

| 参数     | 说明                     | 类型      | 默认值 |
|----------|--------------------------|-----------|--------|
| leading  | 是否在延迟开始前调用函数 | `boolean` | `true` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `true` |