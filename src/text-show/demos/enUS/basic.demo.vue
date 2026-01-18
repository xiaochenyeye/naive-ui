<markdown>
# Basic

The middle text ellipsizes when too long. Click to toggle an overlay showing the full text.
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
        Carbon:
      </template>
      {{ value }}
      <template #suffix>
        kWh
      </template>
    </n-text-show>
  </div>
</template>
