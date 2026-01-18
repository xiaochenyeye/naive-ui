<markdown>
# 展开态背景

通过 `expanded-background-style` 只修改背景层样式，不影响内容层。
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      value:
        '343,342,324,565.3423 / 343,342,324,565.3423 / 343,342,324,565.3423'
    }
  }
})
</script>

<template>
  <div
    style="
      width: 220px;
      padding: 12px;
      border: 1px solid rgba(128, 128, 128, 0.3);
    "
  >
    <n-text-show
      :expanded-background-style="{
        background: 'rgba(24, 160, 88, 0.12)',
        border: '1px solid rgba(24, 160, 88, 0.35)',
        borderRadius: '10px',
      }"
    >
      <template #prefix>
        碳排放：
      </template>
      {{ value }}
      <template #suffix>
        kWh
      </template>
    </n-text-show>
  </div>
</template>
