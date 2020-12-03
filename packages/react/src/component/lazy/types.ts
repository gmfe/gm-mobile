import {
  HTMLAttributes,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  FC,
  ReactNode,
} from 'react'

interface LazyProps extends HTMLAttributes<HTMLDivElement> {
  /** 指定监听滚动的dom id */
  targetId?: string
  /** throttle delay */
  delay?: number
}

interface LazyListItemProps {
  targetId: string
  minHeight: number
  delay?: number
}

type ItemParams = {
  item: any
  index: number
}

interface LazyListProps extends HTMLAttributes<HTMLDivElement> {
  data: any[]
  renderItem: (param: ItemParams) => ReactNode
  itemMinHeight: (param: ItemParams) => number
  itemKey?: (param: ItemParams) => string
  /** 设置滚动throttle delay 参数 */
  delay?: number
}

interface LazyListFC<T, P>
  extends ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  Item?: FC<LazyListItemProps>
}

interface LazyListRef {
  apiDoScrollToKey: (key: string) => void
}

export type {
  LazyProps,
  LazyListItemProps,
  LazyListProps,
  ItemParams,
  LazyListRef,
  LazyListFC,
}
