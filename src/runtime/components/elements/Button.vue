<script lang="ts">
import { twJoin, twMerge } from 'tailwind-merge'
import { computed, defineComponent, toRef, type PropType } from 'vue'
import { getNonUndefinedValuesFromObject } from '../../utils'
import { nuxtLinkProps } from '../../utils/link'
import { button } from '../../themes'
import type { ButtonColor, ButtonSize, ButtonVariant, DeepPartial, Strategy } from '../../types/index'
import { useRayUI } from '#build/imports'

const config = button

export default defineComponent({
  inheritAttrs: false,
  props: {
    ...nuxtLinkProps,
    class: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    padded: {
      type: Boolean,
      default: true,
    },
    square: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: () => config.default.size,
    },
    color: {
      type: String as PropType<ButtonColor>,
      default: () => config.default.color,
    },
    variant: {
      type: String as PropType<ButtonVariant>,
      default: () => config.default.variant,
    },
    loadingIcon: {
      type: String,
      default: () => config.default.loadingIcon,
    },
    icon: {
      type: String,
      default: null,
    },
    ui: {
      type: Object as PropType<DeepPartial<typeof config> & { strategy?: Strategy }>,
      default: () => ({}),
    },
  },
  setup(props) {
    const extProps = computed(() => getNonUndefinedValuesFromObject(props, nuxtLinkProps))

    const { ui, attrs } = useRayUI('button', toRef(props, 'ui'), config)

    const buttonClass = computed(() => {
      // @ts-ignore
      const variant = ui.value.color?.[props.color as string]?.[props.variant as string] || ui.value.variant[props.variant]
      return twMerge(twJoin(
        ui.value.base,
        ui.value.font,
        ui.value.rounded,
        ui.value.gap[props.size],
        ui.value.size[props.size],
        props.padded && ui.value.padding[props.size],
        variant?.replaceAll('{color}', props.color),
        props.block ? ui.value.block : ui.value.inline,
      ), props.class)
    })

    const iconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        ui.value.icon.size[props.size],
      )
    })

    const leadingIconName = computed(() => props.loading ? props.loadingIcon : props.icon)

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      extProps,
      buttonClass,
      iconClass,
      leadingIconName,
    }
  },
})
</script>

<template>
  <RayLink type="button" :disabled="disabled || loading" :class="buttonClass" v-bind="{ ...extProps, ...attrs }">
    <slot name="leading" :disabled="disabled" :loading="loading">
      <RayIcon v-if="leadingIconName" :name="leadingIconName" :class="iconClass" />
    </slot>
    <slot>
      <span v-if="label">{{ label }}</span>
    </slot>
  </RayLink>
</template>

<style scoped></style>
