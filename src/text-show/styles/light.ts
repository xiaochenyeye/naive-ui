import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const { textColorBase, popoverColor, boxShadow2 } = vars
  return {
    textColor: textColorBase,
    expandedColor: popoverColor,
    expandedShadow: boxShadow2,
    expandedPadding: '6px 10px'
  }
}

export type TextShowThemeVars = ReturnType<typeof self>

const textShowLight: Theme<'TextShow', TextShowThemeVars> = {
  name: 'TextShow',
  common: commonLight,
  self
}

export default textShowLight
export type TextShowTheme = typeof textShowLight
