---
map:
  # 映射到docs的路径
  path: /base/use-toggle
---

# useToggle

用于在两个状态值间切换的 Hook。

## 代码演示

### 基础用法

<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="默认为 boolean 切换，基础用法与 useBoolean 一致。">
</demo>

### 进阶使用

<demo src="./demo/demo2.vue"
  language="vue"
  title="在任意两个值之间切换"
  desc="接受两个可选参数，在它们之间进行切换。">
</demo>


## API

```typescript
const { state, actions: { toggle, setLeft, setRight } } = useToggle(defaultValue?: boolean = false, reverseValue?: any,);
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

| 参数       | 说明                        | 类型                    |
| -------- | ------------------------- | --------------------- |
| toggle   | 触发状态更改的函数，可以接受两个可选参数修改状态值 | `(state?: any) => void` |
| setLeft  | 设置为 defaultValue          | `() => void`           |
| setRight | 设置为 reverseValue          | `() => void`            |