import { ReactNode, MouseEvent, HTMLAttributes } from 'react'

interface CellProps extends HTMLAttributes<HTMLDivElement> {
  /** 用于右侧需要带箭头的情况 */
  access?: boolean
  /** 点击的时候不要闪烁 */
  noActive?: boolean
  /** 用于左侧有图标的情况 */
  icon?: ReactNode
  /** 左侧内容 */
  left?: ReactNode | string
  /** 右侧内容 */
  right?: ReactNode | string
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

interface CellsProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  mini?: boolean
}

interface CellFormProps extends CellProps {
  /** 标签 */
  label?: ReactNode
  /** 标签宽度 */
  labelWidth?: string
  /** 错误信息显示 */
  error?: string
  /** 是否为必填项 */
  required?: boolean
}

export type CellsFormProps = CellsProps

export type { CellProps, CellsProps, CellFormProps }
