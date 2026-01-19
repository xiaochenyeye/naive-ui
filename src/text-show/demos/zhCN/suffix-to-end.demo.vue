<markdown>
# 后置内容置尾

当需要让 `suffix` 靠右、而 `prefix` 与主内容保持靠左时，可以使用 `suffix-to-end`。
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
      width: 320px;
      padding: 12px;
      border: 1px solid rgba(128, 128, 128, 0.3);
    "
  >
    <n-text-show suffix-to-end>
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
