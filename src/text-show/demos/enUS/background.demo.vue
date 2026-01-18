<markdown>
# Expanded Background

Use `expanded-background-style` to style the background layer only, without affecting the content layer.
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
        Carbon:
      </template>
      {{ value }}
      <template #suffix>
        kWh
      </template>
    </n-text-show>
  </div>
</template>
