# Text Show

Single-line text display for big-screen scenarios: prefix/suffix stay visible, the middle text ellipsizes when too long, and clicking toggles an overlay to show the full text.

## Demos

```demo
basic.vue
align.vue
suffix-to-end.vue
vertical-align.vue
background.vue
```

## API

### TextShow Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Middle text alignment |
| vertical-align | `'center' \| 'baseline' \| 'bottom'` | `'center'` | Vertical alignment |
| suffix-to-end | `boolean` | `false` | Whether to push suffix content to the far right |
| clickable | `boolean` | `true` | Whether it can be clicked to expand |
| default-expanded | `boolean` | `false` | Default expanded state (uncontrolled) |
| expanded | `boolean` | `undefined` | Expanded state (controlled) |
| expanded-background-class | `string \| string[]` | `undefined` | Background layer class (won't affect content) |
| expanded-background-style | `CSSProperties` | `undefined` | Background layer style (won't affect content) |
| on-update:expanded | `(value: boolean) => void` | `undefined` | Expanded state update callback |

### TextShow Slots

| Name    | Params | Description    |
| ------- | ------ | -------------- |
| prefix  | `()`   | Prefix content |
| default | `()`   | Main content   |
| suffix  | `()`   | Suffix content |
