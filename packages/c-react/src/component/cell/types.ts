import { ReactNode, CSSProperties, MouseEvent } from 'react'

export interface CellProps {
  /** 右边带箭头 */
  access?: boolean
  /** 左边有图标的情况 */
  icon?: ReactNode
  left?: ReactNode | string
  right?: ReactNode | string
  className?: string
  style?: CSSProperties
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

export interface CellsProps {
  title?: string
  mini?: boolean
  className?: string
  style?: CSSProperties
}

export interface CellFormProps extends CellProps {
  /** 标签 */
  label?: string
  /** 标签宽度 */
  labelWidth?: string
  /** 错误信息显示 */
  error?: string
  /** 必填项 */
  required?: boolean
  className?: string
  style?: CSSProperties
}

export type CellsFormProps = CellsProps
