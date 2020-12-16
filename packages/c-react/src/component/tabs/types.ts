import { HTMLAttributes } from 'react'
interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** tabs数据 */
  tabs: { value: string; text: string }[]
  /** 当前选中tab对应value值 */
  active: string
  onChange?: (value: string) => void
  type?: 'default' | 'label' | 'capsule'
  className?: string
}

export type { TabsProps }
