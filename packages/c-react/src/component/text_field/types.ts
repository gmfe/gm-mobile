import { CSSProperties, ReactNode, RefObject } from 'react'
import { InputProps } from '../input'

interface TextFieldProps
  extends Omit<
    InputProps,
    'style' | 'onBlur' | 'onFocus' | 'onClick' | 'onChange'
  > {
  value: string
  /** 输入事件, e在web中为ChangeEvent，在小程序中为onInputEventDetail */
  onChange?: (e: any) => void
  /** 输入框类型, web端和小程序端取值有差异 */
  type?: InputProps['type']
  /** 输入框前置组件(边框内) */
  left?: ReactNode
  /** 输入框后置组件(边框内) */
  right?: ReactNode
  /** 输入框前置组件(边框外) */
  prefix?: ReactNode
  /** 输入框后置组件(边框外) */
  suffix?: ReactNode
  /** 语法糖： display:show ? undefined : 'none' */
  show?: boolean
  /** 是否显示边框 */
  outlined?: boolean
  /** 是否显示下划线 */
  bottomLined?: boolean
  /** 小尺寸 */
  mini?: boolean
  /** 普通尺寸 */
  normal?: boolean
  /** 大尺寸 */
  large?: boolean
  /** 圆角 */
  round?: boolean
  /** 最大宽度 */
  block?: boolean
  /** textarea 模式 */
  multiLines?: boolean
  /** textarea 模式时输入框的行数（高度） */
  lines?: number
  /** 表单验证 */
  err?: ReactNode
  /** 是否没有错误时也保留错误容器的位置，以免错误信息出现时破坏布局 */
  keepErrPlace?: boolean
  /** 禁止输入 */
  disabled?: boolean
  /** 高亮强调，使用var(--m-color-bg-secondary)作为高亮颜色 */
  highlight?: boolean
  /** 限制长度 */
  maxLength?: number
  /** 数字类型时的最小值限制 */
  min?: number
  /** 数字类型时的最大值限制 */
  max?: number
  style?: CSSProperties
  width?: string
  /** padding内元素类 */
  innerClassName?: string
  /** 校验报错后的错误类 */
  errClassName?: string
  /** 键盘和输入框距离 */
  cursorSpacing?: number
  onBlur?: () => void
  onFocus?: () => void
  /**  e在web中和小程序中不一样 */
  onClick?: (e: any) => void
}

export type { TextFieldProps }
