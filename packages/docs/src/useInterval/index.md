---
map:
  path: /base/use-interval
---
# useInterval

一个可以处理 setInterval 的 Hook。

## 代码演示

### 基础用法

<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="每1000ms，执行一次">
</demo>

### 进阶使用

<demo src="./demo/demo2.vue"
  language="vue"
  title="进阶使用"
  desc="动态修改 delay 以实现定时器间隔变化与暂停。">
</demo>

## API

```typescript
const {
  stop,
  active
} = useInterval(
  fn: () => void,
  interval?: number | null,
  options?: Options
);
```

### Params

| 参数    | 说明                                        | 类型                    |
|---------|---------------------------------------------|-------------------------|
| fn      | 要定时调用的函数                            | `() => void`            |
| delay   | 间隔时间，当取值 `undefined` 时会停止计时器 | `number` \| `undefined` |

