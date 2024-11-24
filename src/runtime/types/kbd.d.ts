import type { AppConfig } from 'nuxt/schema'
import type { kbd } from '../ui.config'
import type { ExtractDeepKey } from './utils'

export type KbdSize =
  | keyof typeof kbd.size
  | ExtractDeepKey<AppConfig, ['rayui', 'kbd', 'size']>