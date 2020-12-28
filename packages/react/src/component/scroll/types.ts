import { ReactNode, UIEvent, HTMLAttributes } from 'react'

type ItemParams = {
  item: any
  index: number
}

interface ScrollProps extends HTMLAttributes<HTMLDivElement> {
  data: any[]
  renderItem: (params: ItemParams) => ReactNode
  itemKey?: (params: ItemParams) => string
  onLoadMore: () => Promise<any>
  noMore?: boolean
  /** item 是否lazy，如果是，需要提供 itemMinHeight */
  lazy?: boolean
  itemMinHeight?: (params?: ItemParams) => string
  onScroll?: (event: UIEvent<HTMLDivElement>) => void
}

interface ScrollRef {
  apiDoScrollToKey: (key: string) => void
}

export type { ScrollProps, ScrollRef }
