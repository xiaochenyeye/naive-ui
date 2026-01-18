import type { CSSProperties, PropType } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { TextShowTheme } from '../styles/light'
import { useTheme } from '../../_mixins'

export const textShowProps = {
  ...(useTheme.props as ThemeProps<TextShowTheme>),
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  verticalAlign: {
    type: String as PropType<'center' | 'baseline' | 'bottom'>,
    default: 'center'
  },
  clickable: {
    type: Boolean,
    default: true
  },
  expanded: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultExpanded: Boolean,
  expandedBackgroundClass: [String, Array] as PropType<string | string[]>,
  expandedBackgroundStyle: Object as PropType<CSSProperties>,
  onUpdateExpanded: [Function, Array] as PropType<
    ((value: boolean) => void) | Array<(value: boolean) => void>
  >
} as const

export type TextShowProps = ExtractPublicPropTypes<typeof textShowProps>
