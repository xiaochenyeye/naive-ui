<markdown>
# 对齐方式

通过 `align` 控制中间文本的对齐。
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: '565.3423'
    }
  }
})
</script>

<template>
  <div style="display: grid; gap: 12px; width: 240px">
    <div style="padding: 12px; border: 1px solid rgba(128, 128, 128, 0.3)">
      <n-text-show align="left">
        <template #prefix>
          左对齐：
        </template>
        {{ value }}
        <template #suffix>
          kWh
        </template>
      </n-text-show>
    </div>
    <div style="padding: 12px; border: 1px solid rgba(128, 128, 128, 0.3)">
      <n-text-show align="center">
        <template #prefix>
          居中：
        </template>
        {{ value }}
        <template #suffix>
          kWh
        </template>
      </n-text-show>
    </div>
    <div style="padding: 12px; border: 1px solid rgba(128, 128, 128, 0.3)">
      <n-text-show align="right">
        <template #prefix>
          右对齐：
        </template>
        {{ value }}
        <template #suffix>
          kWh
        </template>
      </n-text-show>
    </div>
  </div>
</template>
