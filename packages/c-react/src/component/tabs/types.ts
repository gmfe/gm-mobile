interface TabsProps {
  /** tabs数据 */
  tabs: { value: number; text: string }[]
  /** 当前选中tab对应value值 */
  active: any
  onChange?: (index: number) => void
  type?: 'default' | 'label' | 'capsule'
  className?: string
}

export type { TabsProps }
