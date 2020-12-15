import { HTMLAttributes, MouseEvent } from 'react'

type ButtonType = 'default' | 'primary' | 'danger' | 'link'
type ButtonHTMLType = 'submit' | 'button' | 'reset'

interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className: string
  disabled: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  type: ButtonHTMLType
}
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType
  plain?: boolean
  mini?: boolean
  block?: boolean
  noRound?: boolean
  loading?: boolean
  /** 仅web 用。原生的 type */
  htmlType?: ButtonHTMLType
  /** 仅小程序 */
  formType?: string
  /** 仅小程序 */
  openType?: string
  /** 返回 Promise 才有 loading */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}
interface ButtonTimeProps extends ButtonProps {
  /** 计时的时间 */
  time?: number
  /** 函数需要返回 bool 值, true 开始计时，false 不计时 */
  onClick: (event: MouseEvent<HTMLButtonElement>) => boolean | Promise<void>
}

export type { BaseButtonProps, ButtonProps, ButtonTimeProps }
