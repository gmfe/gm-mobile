import React, { HTMLAttributes, InputHTMLAttributes } from 'react'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'
import { CommonEventFunction } from '@tarojs/components'

interface ErrorInputProps extends InputProps {
  getError?: (value: string) => string | void
  defaultValue?: string
}

interface DialogBaseProps extends HTMLAttributes<HTMLDivElement> {
  onConfirm?: (value?: string) => Promise<void>
  title?: string
  confirmText?: string
  onCancel?: () => Promise<void>
  cancelText?: string
  otherText?: string // 当有三个按钮时
  onOther?: () => void
  /** prompt 的时候有用 */
  promptText?: string
  /** prompt 的时候有用 */
  promptInputProps?: ErrorInputProps
  /**  */
  promptGetError?: (value: string) => string | void
  hideBottom?: boolean
}

interface PromptOptions {
  title?: string
  promptGetError?: (value: string) => string | void
  promptText?: string
  promptInputProps?: ErrorInputProps
  onConfirm?: (value: string) => void | boolean
}

interface RenderOptions extends PromptOptions, HTMLAttributes<HTMLDivElement> {
  children?: string | React.ReactNode
  confirmText?: React.ReactNode
  onCancel?: () => void
  otherText?: string
  onOther?: () => void
  hideBottom?: boolean
}
interface DialogStaticsTypes<T> {
  render: (options: T, type?: string) => Promise<void | string>
  alert: (options: string | RenderOptions) => Promise<void | string>
  confirm: (options: string) => Promise<void | string>
  delete: (options: string) => Promise<void | string>
  prompt: (options: PromptOptions) => Promise<void | string>
  hide: () => void
}

type InputProps = InputHTMLAttributes<HTMLInputElement>
type DialogProps = DialogBaseProps & DialogStaticsTypes<string | RenderOptions>

interface TInputProps extends TaroInputProps {
  onChange?: CommonEventFunction<TaroInputProps.inputEventDetail>
}

export type {
  ErrorInputProps,
  DialogBaseProps,
  InputProps,
  DialogStaticsTypes,
  DialogProps,
  TInputProps,
  RenderOptions,
}
