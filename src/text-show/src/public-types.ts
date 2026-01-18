import type { VNode } from 'vue'

export interface TextShowSlots {
  prefix?: () => VNode[]
  default?: () => VNode[]
  suffix?: () => VNode[]
}
