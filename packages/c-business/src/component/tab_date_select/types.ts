import { Option } from '@gm-mobile/c-react/src/component/picker/types'
import { DurationInputArg1 } from 'moment'

interface TabDateSelectServiceTime extends Option {
  type: number
  receive_time_limit: { e_span_time: DurationInputArg1 }
  order_time_limit: { e_span_time: DurationInputArg1 }
}

interface TabDateSelectItem {
  text: string
  value: string
  min: Date
  max: Date
  selectedServiceTime?: TabDateSelectServiceTime
}

interface TabDataSelectSaveParams {
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
  onSelect: (data: TabDataSelectSaveParams) => void
  /** 运营周期列表 */
  serviceTimeList?: TabDateSelectServiceTime[]
}

interface TabDateSelectStaticProps {
  render(
    data: Omit<TabDateSelectProps, 'onSelect'> & {
      title?: string
    } // 使用promise形式，去掉onSelect
  ): Promise<TabDataSelectSaveParams>
  hide(): void
}

export type {
  TabDateSelectProps,
  TabDateSelectItem,
  TabDateSelectServiceTime,
  TabDataSelectSaveParams,
  TabDateSelectStaticProps,
}
