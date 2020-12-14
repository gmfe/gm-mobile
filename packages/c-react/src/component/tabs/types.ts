interface TabsProps {
  tabs: { value: number; text: string }[] // tabs数据
  active: any // 当前选中tab对应value值
  onChange: (index: number) => void
  type?: 'default' | 'label' | 'capsule'
  className?: string
}

export type { TabsProps }
