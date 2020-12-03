import { Option } from '@gm-mobile/c-react/src/component/picker/types'

interface TabDateSelectServiceTime extends Option {
  type: number
  receive_time_limit: { e_span_time: number }
  order_time_limit: { e_span_time: number }
}

interface TabDateSelectItem {
  text: string
  value: string
  min: Date
  max: Date
  selectedServiceTime?: TabDateSelectServiceTime
}

interface TabDateSelectSaveParams {
  selectedTab: string
  begin: Date
  end: Date
  serviceTimeId: any
}

interface TabDateSelectProps {
  /** 切换 tabs 配置 [{ text, value, min, max, selectedServiceTime }] */
  tabs: TabDateSelectItem[]
  /** 选中的 tab value */
  selectedTab?: string
  /** 开始日期 */
  begin: Date
  /** 结束日期 */
  end: Date
  /** 确定回调 */
  onSelect: (data: TabDateSelectSaveParams) => void
  /** 运营周期列表 */
  serviceTimeList?: TabDateSelectServiceTime[]
}

interface TabDateSelectStaticTypes {
  render(
    data: Omit<TabDateSelectProps, 'onSelect'> & {
      title?: string
    } // 使用promise形式，去掉onSelect
  ): Promise<TabDateSelectSaveParams>
  hide(): void
}

export type {
  TabDateSelectProps,
  TabDateSelectItem,
  TabDateSelectServiceTime,
  TabDateSelectSaveParams,
  TabDateSelectStaticTypes,
}
