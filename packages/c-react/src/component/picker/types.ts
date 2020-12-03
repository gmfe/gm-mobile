import { ReactNode } from 'react'
import { PopupProps } from '../popup'
import { Value, Option } from './component/types'

type OptionsProps = PopupProps

interface PickerStaticTypes {
  render: (option: PopupProps) => void
  hide: () => void
}

interface BasePickerTypes<T> {
  render: (option: T) => Promise<any>
  hide: () => void
}

interface SelectPickerProps {
  /** 格式:[{ value, text }] */
  data: Option[]
  /** 底部弹框标题展示 */
  title?: string
  /** 当前选中项, 默认第一个 */
  value?: Value
}
type SelectPickerTypes = BasePickerTypes<SelectPickerProps>

interface ConfirmPickerProps {
  title?: string
  datas: Option[][]
  headers?: string[]
  values: Value[]
  renderOption?: (index: number, options: Option) => string | ReactNode
  onConfirm?: (values: Value[]) => void
  onCancel?: () => void
}
type ConfirmPickerTypes = BasePickerTypes<ConfirmPickerProps>

interface ConfirmCouplingPickerProps extends Omit<ConfirmPickerProps, 'datas'> {
  datas: Option[]
}
type ConfirmCouplingPickerTypes = BasePickerTypes<ConfirmCouplingPickerProps>

export type {
  Option,
  OptionsProps,
  PickerStaticTypes,
  SelectPickerTypes,
  SelectPickerProps,
  ConfirmPickerProps,
  ConfirmPickerTypes,
  ConfirmCouplingPickerTypes,
  ConfirmCouplingPickerProps,
}
