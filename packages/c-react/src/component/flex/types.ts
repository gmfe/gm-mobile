import { HTMLAttributes } from 'react'

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  flex?: number | boolean
  /** 本身是 display:flex，flex 会使子元素 flex-item。设置 block 即可 */
  block?: boolean
  auto?: boolean
  none?: boolean
  width?: string
  height?: string
  row?: boolean
  column?: boolean
  wrap?: boolean
  nowrap?: boolean
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyCenter?: boolean
  justifyBetween?: boolean
  justifyAround?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  alignCenter?: boolean
  alignBaseline?: boolean
  alignStretch?: boolean
  alignContentStart?: boolean
  alignContentEnd?: boolean
  alignContentCenter?: boolean
  alignContentBetween?: boolean
  alignContentAround?: boolean
  alignContentStretch?: boolean
}

export type { FlexProps }
