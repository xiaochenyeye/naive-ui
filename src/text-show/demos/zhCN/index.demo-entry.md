# 文本展示 TextShow

用于大屏场景的单行文本展示：前后内容固定不缩略，中间文本超长时使用省略号，并可点击居中展开显示完整内容。

## 演示

```demo
basic.vue
align.vue
vertical-align.vue
background.vue
```

## API

### TextShow Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 中间文本对齐方式 |
| vertical-align | `'center' \| 'baseline' \| 'bottom'` | `'center'` | 内容的垂直对齐方式 |
| clickable | `boolean` | `true` | 是否可点击展开 |
| default-expanded | `boolean` | `false` | 非受控模式下的默认展开状态 |
| expanded | `boolean` | `undefined` | 展开状态（受控） |
| expanded-background-class | `string \| string[]` | `undefined` | 展开态背景层 class（不影响内容层） |
| expanded-background-style | `CSSProperties` | `undefined` | 展开态背景层 style（不影响内容层） |
| on-update:expanded | `(value: boolean) => void` | `undefined` | 展开状态更新回调 |

### TextShow Slots

| 名称    | 参数 | 说明               |
| ------- | ---- | ------------------ |
| prefix  | `()` | 前置内容（不缩略） |
| default | `()` | 主内容（可缩略）   |
| suffix  | `()` | 后置内容（不缩略） |
