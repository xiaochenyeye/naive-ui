<markdown>
# 垂直对齐

当 `prefix` 或 `suffix` 的字体更大时，可以用 `vertical-align="baseline"` 让三段文本按基线对齐（看起来更像“文字底部对齐”）。
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: '324,565.3423'
    }
  }
})
</script>

<template>
  <div style="display: grid; gap: 12px; width: 260px">
    <div style="padding: 12px; border: 1px solid rgba(128, 128, 128, 0.3)">
      <n-text-show align="center">
        <template #prefix>
          <span style="font-size: 24px; width: 100px; display: inline-block">
            居中：
          </span>
        </template>
        {{ value }}
        <template #suffix>
          kWh
        </template>
      </n-text-show>
    </div>
    <div style="padding: 12px; border: 1px solid rgba(128, 128, 128, 0.3)">
      <n-text-show align="center" vertical-align="baseline">
        <template #prefix>
          <span style="font-size: 24px; width: 100px; display: inline-block">
            基线：
          </span>
        </template>
        {{ value }}
        <template #suffix>
          kWh
        </template>
      </n-text-show>
    </div>
  </div>
</template>
