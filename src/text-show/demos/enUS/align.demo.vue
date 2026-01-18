<markdown>
# Alignment

Use `align` to control the middle text alignment.
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
          Left:
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
          Center:
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
          Right:
        </template>
        {{ value }}
        <template #suffix>
          kWh
        </template>
      </n-text-show>
    </div>
  </div>
</template>
