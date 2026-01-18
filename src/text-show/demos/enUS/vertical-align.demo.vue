<markdown>
# Vertical Alignment

When `prefix` or `suffix` uses a larger font size, use `vertical-align="baseline"` to align text baselines.
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
            Center:
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
            Baseline:
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
