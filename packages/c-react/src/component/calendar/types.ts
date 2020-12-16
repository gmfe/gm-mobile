// months_list.js
// • 高度的定义交给month定义，因为属于 month 的，months_list 只是使用者。
// • 在 Month 挂个变量
// • month.js
// • 固定高度

import { HTMLAttributes } from 'react'
import { Moment } from 'moment'

type CalendarType = 'single' | 'range' | 'multiple'

interface DayProps {
  selected: Date[]
  /** 内部定义的选择日期类型 */
  type: CalendarType
  onClick: (date: Moment) => void
  /** 日期，可能是该月 / 上月 / 下月 */
  value: Moment
  /** 当前日历所在月份 */
  currentMonth: number
  disabled?: boolean
  showDateLabel?: boolean
  /** 内部用，当前渲染日期所在日历位置 */
  locIndex: number
}

interface MonthProps {
  currentMoment: Moment
  selected: Date[]
  type: CalendarType
  onSelectDay: (date: Moment) => void
  getDisabled: (date: Moment) => boolean
  showDateLabel?: boolean
}

interface MonthListProps {
  monthsList: Moment[]
  height: number
  selected: Date[]
  type: CalendarType
  onSelectDay: (date: Moment) => void
  getDisabled: (date: Moment) => boolean
  showDateLabel?: boolean
}

interface BaseCalendarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** 选择日期数组 */
  selected: Date[]
  /** 选择日期类型：one，range，multiple -- 单选，日期段，多个日期 */
  type: CalendarType
  /** 回调函数 */
  onSelect: (dates: Date[]) => void
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
  onSelect: (selected: { begin: Date; end: Date }) => void
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
