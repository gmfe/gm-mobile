import { InputHTMLAttributes, ChangeEvent } from 'react'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'
import { CommonEventFunction } from '@tarojs/components'

interface ErrorInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  getError: (value: string) => string
  autoFocus: boolean
  className?: string
  defaultValue?: string
}

interface DialogBaseProps {
  onConfirm?: (value: string) => Promise<void>
  title?: string
  confirmText?: string
  onCancel?: () => Promise<void>
  cancelText?: string
  otherText?: string // 当有三个按钮时
  onOther?: () => void
  /** prompt 的时候有用 */
  promptText?: string
  /** prompt 的时候有用 */
  promptInputProps?: { [key: string]: string }
  /**  */
  promptGetError?: (value: string) => string
}
interface RenderOptions extends PromptOptions {
  children?: string | React.ReactNode
  confirmText?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  otherText?: string
  onOther?: () => void
}

interface PromptOptions {
  promptGetError?: (value: string) => string
  promptText?: string
  promptInputProps?: {
    [key: string]: string
  }
  onConfirm?: (value: string) => void | boolean
}

interface DialogStaticsTypes {
  render: (
    options: RenderOptions & string,
    type?: string
  ) => Promise<void | string>
  alert: (options: string) => Promise<void | string>
  confirm: (options: string) => Promise<void | string>
  delete: (options: string) => Promise<void | string>
  prompt: (options: PromptOptions) => Promise<void | string>
  hide: () => void
}

type InputProps = InputHTMLAttributes<HTMLInputElement>
type DialogTypes = DialogBaseProps & DialogStaticsTypes

interface TInputProps extends TaroInputProps {
  onChange?: CommonEventFunction<TaroInputProps.inputEventDetail>
}

export type {
  ErrorInputProps,
  DialogBaseProps,
  InputProps,
  DialogStaticsTypes,
  DialogTypes,
  TInputProps,
}
