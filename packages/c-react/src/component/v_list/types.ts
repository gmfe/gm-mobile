import { ScrollIntoViewProps } from '../scroll_into_view'

interface VListItemProps {
  itemId: string
  itemHeight: number
  itemIndex: number
  // 内部监听事件用
  scrollEventName: string
  /** 列表高度 */
  listHeight: number
  distance: number
}

interface VListProps extends Omit<ScrollIntoViewProps, 'targetId'> {
  data: any[]
  /** ({item, index}) */
  renderItem: (data: { item: any; index: number }) => React.ReactElement
  /** 以固定高度计算 */
  itemHeight: number
  /** 列表高度 */
  height: number
  /** 定义item key值({item, index}) */
  itemKey?: (data: { item: any; index: number }) => string
  /** 设置滚动throttle delay 参数, 默认100ms */
  delay?: number
  /** 定义可视区域外增加的渲染距离, 默认为itemHeight */
  distance?: number
  /** 设置滚动到Key事件, 参数为当前可视区域内第一个元素itemKey */
  onScrollToKey?: (key: string | number) => void
}

interface VListRef {
  apiDoScrollToKey: (key: string) => void
}

export type { VListItemProps, VListProps, VListRef }
