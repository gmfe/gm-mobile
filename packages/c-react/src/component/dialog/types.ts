import { CSSProperties, InputHTMLAttributes, ChangeEvent } from 'react'

interface ErrorInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  getError: (value: string) => string
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

interface DialogStaticsTypes {
  render: (options, type?: string) => Promise<void | string>
  alert: (options) => Promise<void | string>
  confirm: (options) => Promise<void | string>
  delete: (options) => Promise<void | string>
  prompt: (options) => Promise<void | string>
  hide: () => void
}

type InputProps = InputHTMLAttributes<HTMLInputElement>
type DialogTypes = DialogBaseProps & DialogStaticsTypes

export {
  ErrorInputProps,
  DialogBaseProps,
  InputProps,
  DialogStaticsTypes,
  DialogTypes,
}
