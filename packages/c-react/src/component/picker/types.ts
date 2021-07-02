import { ReactNode } from 'react'
import { PopupProps } from '../popup'
import { Value, Option } from './component/types'
import { ViewProps } from '../view'

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

interface PickerTextProps {
  selected?: (string | number)[]
  placeholder?: string
  /** 文本是否靠右 */
  textRight?: boolean
  map: { [k: string]: string }
}
interface PickerV1Props<T extends string | number = string>
  extends Pick<
      ConfirmCouplingPickerProps,
      'title' | 'headers' | 'renderOption'
    >,
    Omit<ViewProps, 'onChange'>,
    Pick<PickerTextProps, 'placeholder' | 'textRight'> {
  data?: Option<T>[]
  value?: T[] | T
  onChange?(value?: T[] | T): void
  /**  onChange时回调的value是否要array */
  valueArr?: boolean
}
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
  PickerV1Props,
  PickerTextProps,
}
