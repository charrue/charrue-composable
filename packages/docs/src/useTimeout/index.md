---
map:
  path: /base/use-timeout
---
# useTimeout

一个可以处理 setTimeout 计时器函数的 Hook。

## 代码演示

### 基础用法

<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="2000ms 后执行一次。">
</demo>

## API

```typescript
const { stop } = useTimeout(
  fn: () => void,
  delay?: number | null
);
```

### Params

| 参数  | 说明                                                        | 类型                    |
|-------|-------------------------------------------------------------|-------------------------|
| fn    | 待执行函数                                                  | `() => void`            |
| delay | 定时时间（单位为毫秒），当取值为 `undefined` 时会停止计时器 | `number` \| `undefined` |