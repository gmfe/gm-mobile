import { CSSProperties, ReactNode } from 'react'

type Value = any

interface Option {
  value: Value
  text: Value
  children?: Option[]
}

interface PickerColumnProps {
  options: Option[]
  index: number
  value: Value
  columnHeight: number
  itemHeight: number
  onChange: (index: number, newOption: Option) => void
  renderOption: (index: number, option: Option) => ReactNode
  style?: CSSProperties
}

interface PickerColumnState {
  isMoving: boolean
  startTouchY: number
  startScrollerTranslate: number
  scrollerTranslate: number
  minTranslate: number
  maxTranslate: number
}

interface PickerProps {
  datas: Option[][]
  values: Value[]
  /** 每列数据title, 格式为 [header, ...] */
  headers?: string[]
  itemHeight?: number
  onChange: (newValues: Value[]) => void
  renderOption?: (index: number, option: Option) => ReactNode
  className?: string
  style?: CSSProperties
}

interface CouplingPickerState {
  selected: Value[]
}

interface CouplingPickerProps extends Omit<PickerProps, 'datas' | 'headers'> {
  datas: Option[]
}

export type {
  Option,
  PickerProps,
  PickerColumnProps,
  PickerColumnState,
  CouplingPickerState,
  CouplingPickerProps,
}
