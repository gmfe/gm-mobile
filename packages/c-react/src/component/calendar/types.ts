import { HTMLAttributes } from 'react'
import { Dayjs } from 'dayjs'

type CalendarType = 'single' | 'range' | 'multiple'

interface DayProps {
  selected: Date[]
  /** 内部定义的选择日期类型 */
  type: CalendarType
  onClick: (date: Date) => void
  /** 日期，可能是该月 / 上月 / 下月 */
  value: Dayjs
  /** 当前日历所在月份 */
  currentMonth: number
  disabled: boolean
  showDateLabel?: boolean
  /** 内部用，当前渲染日期所在日历位置index */
  locIndex: number
}

interface MonthProps {
  currentMoment: Dayjs
  selected: Date[]
  type: CalendarType
  onSelectDay: (date: Date) => void
  showDateLabel?: boolean
  min?: Date
  max?: Date
  disabledDate?: (date: Date) => boolean
}

interface MonthListProps extends Omit<MonthProps, 'currentMoment'> {
  height: number
  canScrollWhenMaxOrMinChange?: boolean
  itemHeight?: number
}

interface BaseCalendarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** 选择日期数组 */
  selected: Date[]
  /** 选择日期类型：one，range，multiple -- 单选，日期段，多个日期 */
  type: CalendarType
  /** 回调函数 */
  onSelect?: (dates: Date[]) => void
  /** 可选日期最小值 */
  min?: Date
  /** 可选日期最大值 */
  max?: Date
  /** 显示日期下方标签备注, 备注包括：单天，开始，结束, 一般配合 日期段选择 使用 */
  showDateLabel?: boolean
  /** 自定义不可选日期 */
  disabledDate?: (date: Date) => boolean
  /** 定义日历高度，默认400 */
  height?: number
  /** 当min 和max 改变时是否滚动 */
  canScrollWhenMaxOrMinChange: boolean
}

interface CalendarProps
  extends Omit<BaseCalendarProps, 'selected' | 'onSelect' | 'type'> {
  selected?: Date
  onSelect?: (date: Date) => void
}

interface RangeCalendarProps
  extends Omit<BaseCalendarProps, 'selected' | 'onSelect' | 'type'> {
  /** 开始日期 */
  begin?: Date
  /** 结束日期 */
  end?: Date
  /** 回调函数 */
  onSelect?: (selected: { begin: Date; end: Date }) => void
}

type MultipleCalendarProps = Omit<BaseCalendarProps, 'type'>

export type {
  DayProps,
  MonthProps,
  CalendarType,
  CalendarProps,
  MonthListProps,
  BaseCalendarProps,
  RangeCalendarProps,
  MultipleCalendarProps,
}
