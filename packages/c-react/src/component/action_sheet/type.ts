import { ReactNode } from 'react'
interface SelectData {
  text: string
  value: string | number
}
interface ActionSheetStatic {
  render: (value: {
    data: SelectData[]
    title?: string
    renderItem?: (option: SelectData, index?: number) => string | ReactNode
  }) => Promise<string | number>
  hide: () => void
}

interface ActionSheetBaseProps {
  renderItem?: (option: SelectData, index?: number) => string | ReactNode
  data?: SelectData[]
  onSelect?: (value: string | number) => void
  onCancel?: () => void
}

type ActionSheetProps = ActionSheetStatic & ActionSheetBaseProps

export type {
  ActionSheetProps,
  ActionSheetBaseProps,
  SelectData,
  ActionSheetStatic,
}
