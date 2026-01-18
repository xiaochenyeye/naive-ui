<markdown>
# 基础用法

中间文本超长时会省略，点击后会在原位置居中绝对定位展示完整内容。
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
      width: 200px;
      padding: 12px;
      border: 1px solid rgba(128, 128, 128, 0.3);
    "
  >
    <n-text-show>
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
