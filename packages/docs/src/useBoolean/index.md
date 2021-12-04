---
map:
  path: /base/use-boolean
---
# useBoolean

用于在两个状态值间切换的 Hook。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="切换 boolean，可以接收默认值。">
</demo>


## API

```typescript
const { state, actions: { toggle, setTrue, setFalse } } = useBoolean(
  defaultValue?: boolean,
);
```

### Params

| 参数           | 说明           | 类型                                       | 默认值   |
| ------------ | ------------ | ---------------------------------------- | ----- |
| defaultValue | 可选项，传入默认的状态值 | `number` \| `string` \| `boolean` \| `undefined` | `false` |
| reverseValue | 可选项，传入取反的状态值 | `number` \| `string` \| `boolean` \| `undefined` | -     |

### Result

| 参数      | 说明   | 类型      |
| ------- | ---- | ------- |
| state   | 状态值  | - |
| actions | 操作集合 | `Actions`  |

### Actions

| 参数     | 说明                                              | 类型                        |
|----------|---------------------------------------------------|-----------------------------|
| toggle   | 触发状态更改的函数,可以接受一个可选参数修改状态值 | `(value?: boolean) => void` |
| setTrue  | 设置状态值为 true                                 | `() => void`                |
| setFalse | 设置状态值为 false                                | `() => void`                |