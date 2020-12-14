import { HTMLAttributes } from 'react'

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  flex?: number | boolean
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

export { FlexProps }
