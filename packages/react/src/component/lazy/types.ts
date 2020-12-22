import {
  HTMLAttributes,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  FC,
} from 'react'

interface LazyProps extends HTMLAttributes<HTMLDivElement> {
  /** 指定监听滚动的dom id */
  targetId?: string
  /** throttle delay */
  delay?: number
}

interface ItemProps {
  targetId: string
  minHeight: number
  delay?: number
}

type ItemParm = {
  item: any
  index: number
}

interface LazyListProps extends HTMLAttributes<HTMLDivElement> {
  data: any[]
  renderItem: (param: ItemParm) => any
  itemMinHeight: (param: ItemParm) => any
  itemKey?: (param: ItemParm) => any
  /** 设置滚动throttle delay 参数 */
  delay?: number
}

interface LazyListFC<T, P>
  extends ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  Item?: FC<ItemProps>
}

interface LazyListRef {
  apiDoScrollToKey: (key: number | string) => void
}

export type {
  LazyProps,
  ItemProps,
  LazyListProps,
  ItemParm,
  LazyListRef,
  LazyListFC,
}
