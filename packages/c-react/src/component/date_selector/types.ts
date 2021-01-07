import { HTMLAttributes } from 'react'

interface DateSelectorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** 默认从当前日期开始 */
  min?: Date
  /** 默认展示当前日期内四周 */
  max?: Date
  selected: Date[]
  /** 选择日期回传 */
  onSelect: (dates: Date[]) => void
  /** 最高优先级, 若设置, 直接以此判断日期的disable态 */
  disabledDate?: (date: Date) => boolean
}

interface ContainerProps {
  min: Date
  max: Date
  selected: Date[]
  onSelect: (dates: Date[]) => void
  disabledDate?: (date: Date) => boolean
}

interface DayProps {
  min: Date
  max: Date
  selected: Date[]
  currentDate: Date
  onSelect: (dates: Date[]) => void
  disabledDate?: (date: Date) => boolean
}

export type { DayProps, ContainerProps, DateSelectorProps }
