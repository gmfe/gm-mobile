import { HTMLAttributes } from 'react'
interface TabsProps<T = any>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** tabs数据 */
  tabs: { value: T; text: string }[]
  /** 当前选中tab对应value值 */
  active: T
  onChange?: (value: T) => void
  type?: 'default' | 'label' | 'capsule'
}

export type { TabsProps }
