import { merge } from 'lodash-es'
import {
  configProviderProps,
  darkTheme,
  dateEnUS,
  dateZhCN,
  enUS,
  NConfigProvider,
  useOsTheme,
  zhCN
} from 'naive-ui'
import { useMemo } from 'vooks'
import { computed, defineComponent, h, ref } from 'vue'
import { TsConfigProvider } from '../../themes/tusimple/src'
import { i18n, useIsMobile } from '../utils/composables'
import hljs from './hljs'
import {
  createComponentMenuOptions,
  createDocumentationMenuOptions
} from './menu-options'

const wandeThemeOverridesLight = {
  common: {
    fontFamily:
      'Roboto, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: '400',
    fontWeightStrong: '600',
    lineHeight: '1.6',
    fontSize: '14px',
    fontSizeMini: '12px',
    fontSizeTiny: '12px',
    fontSizeSmall: '13px',
    fontSizeMedium: '14px',
    fontSizeLarge: '15px',
    fontSizeHuge: '16px',
    heightTiny: '28px',
    heightSmall: '32px',
    heightMedium: '36px',
    heightLarge: '40px',
    heightHuge: '44px',
    borderRadius: '10px',
    borderRadiusSmall: '8px',

    primaryColor: '#1976D2',
    primaryColorHover: '#1565C0',
    primaryColorPressed: '#0D47A1',
    primaryColorSuppl: '#42A5F5',

    infoColor: '#0288D1',
    infoColorHover: '#0277BD',
    infoColorPressed: '#01579B',
    infoColorSuppl: '#29B6F6',

    successColor: '#2E7D32',
    successColorHover: '#1B5E20',
    successColorPressed: '#104815',
    successColorSuppl: '#4CAF50',

    warningColor: '#ED6C02',
    warningColorHover: '#E65100',
    warningColorPressed: '#BF360C',
    warningColorSuppl: '#FF9800',

    errorColor: '#D32F2F',
    errorColorHover: '#C62828',
    errorColorPressed: '#B71C1C',
    errorColorSuppl: '#EF5350',

    baseColor: '#FFFFFF',
    bodyColor: '#F5F7FB',
    cardColor: '#FFFFFF',
    modalColor: '#FFFFFF',
    popoverColor: '#FFFFFF',

    textColorBase: '#0F172A',
    textColor1: '#0F172A',
    textColor2: '#1F2937',
    textColor3: '#64748B',

    placeholderColor: '#94A3B8',
    placeholderColorDisabled: '#CBD5E1',
    textColorDisabled: '#94A3B8',

    borderColor: '#E2E8F0',
    dividerColor: '#E5E7EB',
    hoverColor: 'rgba(15, 23, 42, 0.04)',
    pressedColor: 'rgba(15, 23, 42, 0.08)',

    tableHeaderColor: '#F8FAFC',
    tableColorHover: 'rgba(15, 23, 42, 0.03)',
    tableColorStriped: 'rgba(15, 23, 42, 0.02)',

    inputColor: '#FFFFFF',
    inputColorDisabled: '#F1F5F9',
    actionColor: '#F8FAFC',
    tabColor: '#F1F5F9',
    codeColor: '#F1F5F9',

    boxShadow1:
      '0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.10)',
    boxShadow2:
      '0 4px 8px rgba(16, 24, 40, 0.08), 0 2px 4px rgba(16, 24, 40, 0.06)',
    boxShadow3:
      '0 12px 24px rgba(16, 24, 40, 0.14), 0 6px 12px rgba(16, 24, 40, 0.10)'
  },
  Button: {
    heightTiny: '28px',
    heightSmall: '32px',
    heightMedium: '36px',
    heightLarge: '40px',
    fontWeight: '600',
    waveOpacity: '0.35'
  },
  Card: {
    borderRadius: '12px',
    boxShadow:
      '0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.10)'
  },
  Input: {
    borderRadius: '10px',
    boxShadowFocus: '0 0 0 3px rgba(25, 118, 210, 0.18)'
  },
  Select: {
    menuBoxShadow:
      '0 12px 24px rgba(16, 24, 40, 0.12), 0 6px 12px rgba(16, 24, 40, 0.08)'
  },
  DataTable: {
    borderRadius: '12px',
    boxShadowBefore: 'inset -12px 0 8px -12px rgba(15, 23, 42, 0.14)',
    boxShadowAfter: 'inset 12px 0 8px -12px rgba(15, 23, 42, 0.14)'
  },
  Menu: {
    borderRadius: '12px',
    itemHeight: '44px'
  },
  Tabs: {
    tabBorderRadius: '10px'
  },
  Pagination: {
    itemBorderRadius: '10px'
  },
  Dialog: {
    borderRadius: '14px',
    border: '1px solid rgba(226, 232, 240, 0.9)'
  },
  Drawer: {
    borderRadius: '14px'
  },
  Layout: {
    color: '#F5F7FB',
    headerColor: '#FFFFFF',
    siderColor: '#FFFFFF'
  },
  Typography: {
    codeBorder: '1px solid rgba(226, 232, 240, 0.9)'
  },
  Form: {
    lineHeight: '1.6'
  }
}

const wandeThemeOverridesDark = {
  ...wandeThemeOverridesLight,
  common: {
    ...wandeThemeOverridesLight.common,
    baseColor: '#0B1220',
    bodyColor: '#0B1220',
    cardColor: '#111827',
    modalColor: '#111827',
    popoverColor: '#111827',

    textColorBase: '#E5E7EB',
    textColor1: '#F9FAFB',
    textColor2: '#E5E7EB',
    textColor3: '#9CA3AF',

    placeholderColor: '#6B7280',
    placeholderColorDisabled: '#475569',
    textColorDisabled: '#64748B',

    borderColor: '#243042',
    dividerColor: 'rgba(148, 163, 184, 0.16)',
    hoverColor: 'rgba(148, 163, 184, 0.08)',
    pressedColor: 'rgba(148, 163, 184, 0.12)',

    tableHeaderColor: '#0F172A',
    tableColorHover: 'rgba(148, 163, 184, 0.06)',
    tableColorStriped: 'rgba(148, 163, 184, 0.04)',

    inputColor: '#0F172A',
    inputColorDisabled: '#0B1220',
    actionColor: '#0F172A',
    tabColor: '#0F172A',
    codeColor: '#0F172A',

    boxShadow1: '0 1px 2px rgba(0, 0, 0, 0.32), 0 1px 3px rgba(0, 0, 0, 0.24)',
    boxShadow2: '0 6px 16px rgba(0, 0, 0, 0.34), 0 2px 6px rgba(0, 0, 0, 0.22)',
    boxShadow3:
      '0 18px 40px rgba(0, 0, 0, 0.42), 0 8px 18px rgba(0, 0, 0, 0.30)'
  },
  Layout: {
    color: '#0B1220',
    headerColor: '#0F172A',
    siderColor: '#0F172A'
  }
}

const WdConfigProvider = defineComponent({
  name: 'WdConfigProvider',
  props: {
    themeName: {
      type: String,
      default: 'light'
    },
    ...configProviderProps
  },
  render() {
    const { themeOverrides, themeName } = this.$props
    const wandeThemeOverrides
      = themeName === 'dark' ? wandeThemeOverridesDark : wandeThemeOverridesLight
    return h(
      NConfigProvider,
      {
        class: `wd-${themeName}-theme`,
        ...this.$props,
        themeOverrides: themeOverrides
          ? merge({}, wandeThemeOverrides, themeOverrides)
          : wandeThemeOverrides
      },
      this.$slots
    )
  }
})

const appleThemeOverridesLight = {
  common: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Inter, system-ui, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: '400',
    fontWeightStrong: '600',
    lineHeight: '1.6',
    fontSize: '14px',
    fontSizeMini: '12px',
    fontSizeTiny: '12px',
    fontSizeSmall: '13px',
    fontSizeMedium: '14px',
    fontSizeLarge: '16px',
    fontSizeHuge: '18px',
    heightTiny: '28px',
    heightSmall: '32px',
    heightMedium: '36px',
    heightLarge: '40px',
    heightHuge: '44px',
    borderRadius: '12px',
    borderRadiusSmall: '10px',

    primaryColor: '#0A84FF',
    primaryColorHover: '#007AFF',
    primaryColorPressed: '#0060DF',
    primaryColorSuppl: '#5AC8FA',

    infoColor: '#0A84FF',
    infoColorHover: '#007AFF',
    infoColorPressed: '#0060DF',
    infoColorSuppl: '#5AC8FA',

    successColor: '#34C759',
    successColorHover: '#30D158',
    successColorPressed: '#248A3D',
    successColorSuppl: '#32D74B',

    warningColor: '#FF9F0A',
    warningColorHover: '#FFB340',
    warningColorPressed: '#C86D00',
    warningColorSuppl: '#FFD60A',

    errorColor: '#FF453A',
    errorColorHover: '#FF6961',
    errorColorPressed: '#D70015',
    errorColorSuppl: '#FF453A',

    baseColor: '#FFFFFF',
    bodyColor: '#F5F5F7',
    cardColor: '#FFFFFF',
    modalColor: '#FFFFFF',
    popoverColor: '#FFFFFF',

    textColorBase: '#1D1D1F',
    textColor1: '#1D1D1F',
    textColor2: 'rgba(29, 29, 31, 0.78)',
    textColor3: 'rgba(29, 29, 31, 0.56)',

    placeholderColor: 'rgba(60, 60, 67, 0.48)',
    placeholderColorDisabled: 'rgba(60, 60, 67, 0.28)',
    textColorDisabled: 'rgba(60, 60, 67, 0.38)',

    borderColor: 'rgba(60, 60, 67, 0.18)',
    dividerColor: 'rgba(60, 60, 67, 0.12)',
    hoverColor: 'rgba(0, 0, 0, 0.04)',
    pressedColor: 'rgba(0, 0, 0, 0.08)',

    tableHeaderColor: 'rgba(60, 60, 67, 0.06)',
    tableColorHover: 'rgba(0, 0, 0, 0.03)',
    tableColorStriped: 'rgba(0, 0, 0, 0.015)',

    inputColor: 'rgba(255, 255, 255, 0.9)',
    inputColorDisabled: 'rgba(60, 60, 67, 0.06)',
    actionColor: 'rgba(255, 255, 255, 0.72)',
    tabColor: 'rgba(255, 255, 255, 0.72)',
    codeColor: 'rgba(60, 60, 67, 0.08)',

    boxShadow1: '0 1px 2px rgba(0, 0, 0, 0.08)',
    boxShadow2: '0 6px 18px rgba(0, 0, 0, 0.10)',
    boxShadow3: '0 16px 40px rgba(0, 0, 0, 0.14)'
  },
  Button: {
    heightTiny: '28px',
    heightSmall: '32px',
    heightMedium: '36px',
    heightLarge: '40px',
    fontWeight: '600',
    waveOpacity: '0.25'
  },
  Card: {
    borderRadius: '16px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08), 0 10px 28px rgba(0, 0, 0, 0.06)'
  },
  Input: {
    borderRadius: '12px',
    boxShadowFocus: '0 0 0 4px rgba(10, 132, 255, 0.22)'
  },
  Select: {
    menuBoxShadow:
      '0 18px 50px rgba(0, 0, 0, 0.18), 0 2px 10px rgba(0, 0, 0, 0.08)'
  },
  DataTable: {
    borderRadius: '16px',
    boxShadowBefore: 'inset -12px 0 8px -12px rgba(0, 0, 0, 0.10)',
    boxShadowAfter: 'inset 12px 0 8px -12px rgba(0, 0, 0, 0.10)'
  },
  Menu: {
    borderRadius: '16px',
    itemHeight: '44px'
  },
  Tabs: {
    tabBorderRadius: '12px'
  },
  Pagination: {
    itemBorderRadius: '12px'
  },
  Dialog: {
    borderRadius: '18px',
    border: '1px solid rgba(60, 60, 67, 0.12)'
  },
  Drawer: {
    borderRadius: '18px'
  },
  Layout: {
    color: '#F5F5F7',
    headerColor: 'rgba(255, 255, 255, 0.76)',
    siderColor: 'rgba(255, 255, 255, 0.72)'
  },
  Typography: {
    codeBorder: '1px solid rgba(60, 60, 67, 0.14)'
  },
  Form: {
    lineHeight: '1.6'
  }
}

const appleThemeOverridesDark = {
  ...appleThemeOverridesLight,
  common: {
    ...appleThemeOverridesLight.common,
    baseColor: '#000000',
    bodyColor: '#000000',
    cardColor: '#1C1C1E',
    modalColor: '#1C1C1E',
    popoverColor: '#1C1C1E',

    textColorBase: '#F5F5F7',
    textColor1: '#F5F5F7',
    textColor2: 'rgba(245, 245, 247, 0.82)',
    textColor3: 'rgba(245, 245, 247, 0.58)',

    placeholderColor: 'rgba(235, 235, 245, 0.30)',
    placeholderColorDisabled: 'rgba(235, 235, 245, 0.18)',
    textColorDisabled: 'rgba(235, 235, 245, 0.22)',

    borderColor: 'rgba(84, 84, 88, 0.65)',
    dividerColor: 'rgba(84, 84, 88, 0.36)',
    hoverColor: 'rgba(235, 235, 245, 0.10)',
    pressedColor: 'rgba(235, 235, 245, 0.14)',

    tableHeaderColor: 'rgba(235, 235, 245, 0.08)',
    tableColorHover: 'rgba(235, 235, 245, 0.06)',
    tableColorStriped: 'rgba(235, 235, 245, 0.03)',

    inputColor: 'rgba(28, 28, 30, 0.82)',
    inputColorDisabled: 'rgba(84, 84, 88, 0.18)',
    actionColor: 'rgba(28, 28, 30, 0.78)',
    tabColor: 'rgba(28, 28, 30, 0.78)',
    codeColor: 'rgba(235, 235, 245, 0.12)',

    boxShadow1: '0 1px 2px rgba(0, 0, 0, 0.40)',
    boxShadow2: '0 10px 30px rgba(0, 0, 0, 0.55)',
    boxShadow3: '0 18px 60px rgba(0, 0, 0, 0.68)'
  },
  Layout: {
    color: '#000000',
    headerColor: 'rgba(28, 28, 30, 0.82)',
    siderColor: 'rgba(28, 28, 30, 0.78)'
  }
}

const AppleConfigProvider = defineComponent({
  name: 'AppleConfigProvider',
  props: {
    themeName: {
      type: String,
      default: 'light'
    },
    ...configProviderProps
  },
  render() {
    const { themeOverrides, themeName } = this.$props
    const appleThemeOverrides
      = themeName === 'dark' ? appleThemeOverridesDark : appleThemeOverridesLight
    return h(
      NConfigProvider,
      {
        class: `apple-${themeName}-theme`,
        ...this.$props,
        themeOverrides: themeOverrides
          ? merge({}, appleThemeOverrides, themeOverrides)
          : appleThemeOverrides
      },
      this.$slots
    )
  }
})

let route = null
let router = null
// locale
let localeNameRef = null
// useMemo
let dateLocaleRef = null
// theme
const osThemeRef = useOsTheme()
let themeNameRef = null
let rawThemeNameRef = null // could be `os-theme`

export function initRouter(_router, _route) {
  route = _route
  router = _router
  localeNameRef = useMemo({
    get() {
      return route.path.startsWith('/zh-CN') ? 'zh-CN' : 'en-US'
    },
    set(locale) {
      router.push(changeLangInPath(route.fullPath, locale))
    }
  })
  dateLocaleRef = useMemo(() => {
    return route.path.startsWith('/zh-CN') ? dateZhCN : dateEnUS
  })
  rawThemeNameRef = useMemo(() => route.params.theme)
  themeNameRef = useMemo({
    get() {
      switch (route.params.theme) {
        case 'os-theme':
          return osThemeRef.value
        case 'dark':
          return 'dark'
        default:
          return 'light'
      }
    },
    set(theme) {
      router.push(changeThemeInPath(route.fullPath, theme))
    }
  })
}

// display mode
const _displayModeRef = ref(window.localStorage.getItem('mode') ?? 'debug')
const displayModeRef = computed({
  get() {
    return _displayModeRef.value
  },
  set(value) {
    _displayModeRef.value = value
    window.localStorage.setItem('mode', value)
  }
})

const localeRef = computed(() => {
  return localeNameRef.value === 'zh-CN' ? zhCN : enUS
})

const themeRef = computed(() => {
  const { value } = themeNameRef
  return value === 'dark' ? darkTheme : null
})

// config provider
// eslint-disable-next-line node/prefer-global/process
const configProviderNameRef = ref(process.env.TUSIMPLE ? 'tusimple' : 'default')

const configProviderRef = computed(() => {
  return configProviderNameRef.value === 'tusimple'
    ? TsConfigProvider
    : configProviderNameRef.value === 'wande'
      ? WdConfigProvider
      : configProviderNameRef.value === 'apple'
        ? AppleConfigProvider
        : NConfigProvider
})

// options
const docOptionsRef = computed(() =>
  createDocumentationMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)
const componentOptionsRef = computed(() =>
  createComponentMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)
const flattenedDocOptionsRef = computed(() => {
  const flattenedItems = []
  const traverse = (items) => {
    if (!items)
      return
    items.forEach((item) => {
      if (item.children)
        traverse(item.children)
      else flattenedItems.push(item)
    })
  }
  traverse(docOptionsRef.value)
  traverse(componentOptionsRef.value)
  return flattenedItems
})

export function siteSetup() {
  i18n.provide(computed(() => localeNameRef.value))
  const isMobileRef = useIsMobile()
  return {
    themeEditorStyle: computed(() => {
      return isMobileRef.value ? 'right: 18px; bottom: 24px;' : undefined
    }),
    configProvider: configProviderRef,
    hljs,
    themeName: themeNameRef,
    theme: themeRef,
    locale: localeRef,
    dateLocale: dateLocaleRef
  }
}

function changeLangInPath(path, lang) {
  const langReg = /^\/(zh-CN|en-US)\//
  return path.replace(langReg, `/${lang}/`)
}

function changeThemeInPath(path, theme) {
  const themeReg = /(^\/[^/]+\/)([^/]+)/
  return path.replace(themeReg, `$1${theme}`)
}

export function push(partialPath) {
  const { fullPath } = route
  router.push(
    fullPath.replace(/(^\/[^/]+\/[^/]+)((\/.*)|$)/, `$1${partialPath}`)
  )
}

export function useDisplayMode() {
  return displayModeRef
}

export function useLocaleName() {
  return localeNameRef
}

export function useThemeName() {
  return themeNameRef
}

export function useDocOptions() {
  return docOptionsRef
}

export function useComponentOptions() {
  return componentOptionsRef
}

export function useFlattenedDocOptions() {
  return flattenedDocOptionsRef
}

export function useConfigProviderName() {
  return configProviderNameRef
}
