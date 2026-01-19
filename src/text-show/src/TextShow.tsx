import type { CSSProperties, SlotsType } from 'vue'
import type { TextShowSlots } from './public-types'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  ref,
  watchEffect
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import textShowLight from '../styles/light'
import { textShowProps } from './props'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'TextShow',
  props: textShowProps,
  slots: Object as SlotsType<TextShowSlots>,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'TextShow',
      '-text-show',
      style,
      textShowLight,
      props,
      mergedClsPrefixRef
    )

    const selfExpandedRef = ref(props.defaultExpanded)
    const uncontrolledExpandedRef = computed(() => selfExpandedRef.value)
    const mergedExpandedRef = computed(() => {
      const { expanded } = props
      if (expanded !== undefined)
        return expanded
      return uncontrolledExpandedRef.value
    })

    function doUpdateExpanded(value: boolean): void {
      const { onUpdateExpanded } = props
      if (onUpdateExpanded) {
        if (Array.isArray(onUpdateExpanded)) {
          onUpdateExpanded.forEach(fn => fn(value))
        }
        else {
          onUpdateExpanded(value)
        }
      }
      if (props.expanded === undefined) {
        selfExpandedRef.value = value
      }
    }

    const rootElRef = ref<HTMLElement | null>(null)
    const groupElRef = ref<HTMLElement | null>(null)
    const leftElRef = ref<HTMLElement | null>(null)
    const expandedElRef = ref<HTMLElement | null>(null)
    const expandedPositionRef = ref<{ left: number, top: number } | null>(null)

    function handleToggleExpanded(): void {
      if (!props.clickable)
        return
      doUpdateExpanded(!mergedExpandedRef.value)
    }

    function handleDocumentClick(e: MouseEvent): void {
      if (!mergedExpandedRef.value)
        return
      const { value: rootEl } = rootElRef
      const { value: expandedEl } = expandedElRef
      const target = e.target as Node | null
      if (!target)
        return
      if (rootEl?.contains(target))
        return
      if (expandedEl?.contains(target))
        return
      doUpdateExpanded(false)
    }

    watchEffect((onCleanup) => {
      if (!mergedExpandedRef.value)
        return
      document.addEventListener('mousedown', handleDocumentClick)
      onCleanup(() => {
        document.removeEventListener('mousedown', handleDocumentClick)
      })
    })

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleDocumentClick)
    })

    const cssVarsRef = computed(() => {
      const {
        common: { fontSize, lineHeight, borderRadius },
        self: { textColor, expandedColor, expandedShadow, expandedPadding }
      } = themeRef.value
      return {
        '--n-font-size': fontSize,
        '--n-line-height': lineHeight,
        '--n-border-radius': borderRadius,
        '--n-text-color': textColor,
        '--n-expanded-color': expandedColor,
        '--n-expanded-shadow': expandedShadow,
        '--n-expanded-padding': expandedPadding
      } as CSSProperties
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('text-show', undefined, cssVarsRef as any, props)
      : undefined

    const contentStyleRef = computed(() => {
      const align = props.align
      const verticalAlign = props.verticalAlign
      const alignItems
        = verticalAlign === 'baseline'
          ? 'baseline'
          : verticalAlign === 'bottom'
            ? 'flex-end'
            : 'center'
      return {
        justifyContent: props.suffixToEnd
          ? 'flex-start'
          : align === 'center'
            ? 'center'
            : align === 'right'
              ? 'flex-end'
              : 'flex-start',
        alignItems
      } as CSSProperties
    })
    const groupStyleRef = computed(() => {
      const verticalAlign = props.verticalAlign
      return {
        alignItems:
          verticalAlign === 'baseline'
            ? 'baseline'
            : verticalAlign === 'bottom'
              ? 'flex-end'
              : 'center'
      } as CSSProperties
    })

    watchEffect(() => {
      if (!mergedExpandedRef.value)
        return
      void nextTick(() => {
        expandedElRef.value?.focus?.()
      })
    })

    function syncExpandedPosition(): void {
      const rootEl = rootElRef.value
      const anchorEl = props.suffixToEnd ? leftElRef.value : groupElRef.value
      if (!rootEl || !anchorEl)
        return
      const rootRect = rootEl.getBoundingClientRect()
      const anchorRect = anchorEl.getBoundingClientRect()
      expandedPositionRef.value = {
        left: anchorRect.left - rootRect.left + anchorRect.width / 2,
        top: anchorRect.top - rootRect.top + anchorRect.height / 2
      }
    }

    watchEffect((onCleanup) => {
      if (!mergedExpandedRef.value) {
        expandedPositionRef.value = null
        return
      }
      void nextTick(() => {
        syncExpandedPosition()
      })
      window.addEventListener('resize', syncExpandedPosition)
      onCleanup(() => {
        window.removeEventListener('resize', syncExpandedPosition)
      })
    })

    const expandedStyleRef = computed(() => {
      const position = expandedPositionRef.value
      if (!position) {
        return {
          visibility: 'hidden',
          pointerEvents: 'none'
        } as CSSProperties
      }
      return {
        left: `${position.left}px`,
        top: `${position.top}px`,
        transform: 'translate(-50%, -50%)'
      } as CSSProperties
    })

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      inlineThemeDisabled,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      contentStyle: contentStyleRef,
      groupStyle: groupStyleRef,
      rootElRef,
      groupElRef,
      leftElRef,
      expandedElRef,
      mergedExpanded: mergedExpandedRef,
      expandedStyle: expandedStyleRef,
      handleToggleExpanded
    }
  },
  render() {
    const {
      mergedClsPrefix,
      cssVars,
      onRender,
      themeClass,
      contentStyle,
      groupStyle,
      expandedStyle,
      mergedExpanded
    } = this
    onRender?.()

    const prefixNode = this.$slots.prefix?.()
    const suffixNode = this.$slots.suffix?.()
    const mainNode = this.$slots.default?.()

    return (
      <div
        class={[
          `${mergedClsPrefix}-text-show`,
          this.clickable && `${mergedClsPrefix}-text-show--clickable`,
          this.suffixToEnd && `${mergedClsPrefix}-text-show--suffix-to-end`,
          themeClass
        ]}
        style={cssVars}
        ref="rootElRef"
        role={this.clickable ? 'button' : undefined}
        tabindex={this.clickable ? 0 : undefined}
        onClick={this.handleToggleExpanded}
        onKeydown={
          this.clickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  this.handleToggleExpanded()
                }
              }
            : undefined
        }
      >
        <div
          class={`${mergedClsPrefix}-text-show__content`}
          style={contentStyle}
        >
          <div
            class={`${mergedClsPrefix}-text-show__group`}
            style={groupStyle}
            ref="groupElRef"
          >
            {this.suffixToEnd ? (
              <div class={`${mergedClsPrefix}-text-show__left`} ref="leftElRef">
                {prefixNode ? (
                  <span class={`${mergedClsPrefix}-text-show__prefix`}>
                    {prefixNode}
                  </span>
                ) : null}
                <span class={`${mergedClsPrefix}-text-show__text`}>
                  {mainNode}
                </span>
              </div>
            ) : (
              [
                prefixNode ? (
                  <span class={`${mergedClsPrefix}-text-show__prefix`}>
                    {prefixNode}
                  </span>
                ) : null,
                <span class={`${mergedClsPrefix}-text-show__text`}>
                  {mainNode}
                </span>
              ]
            )}
            {suffixNode ? (
              <span class={`${mergedClsPrefix}-text-show__suffix`}>
                {suffixNode}
              </span>
            ) : null}
          </div>
        </div>
        {mergedExpanded ? (
          <div
            class={`${mergedClsPrefix}-text-show__expanded`}
            ref="expandedElRef"
            style={expandedStyle}
            tabindex={-1}
            onClick={(e) => {
              e.stopPropagation()
              this.handleToggleExpanded()
            }}
          >
            <div
              class={[
                `${mergedClsPrefix}-text-show__expanded-bg`,
                this.expandedBackgroundClass
              ]}
              style={this.expandedBackgroundStyle}
            />
            <div
              class={`${mergedClsPrefix}-text-show__expanded-content`}
              style={groupStyle}
            >
              {prefixNode ? (
                <span class={`${mergedClsPrefix}-text-show__prefix`}>
                  {prefixNode}
                </span>
              ) : null}
              <span class={`${mergedClsPrefix}-text-show__expanded-text`}>
                {mainNode}
              </span>
              {suffixNode ? (
                <span class={`${mergedClsPrefix}-text-show__suffix`}>
                  {suffixNode}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
})
