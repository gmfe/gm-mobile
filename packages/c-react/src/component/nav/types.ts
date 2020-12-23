import { HTMLAttributes } from 'react'

interface NavRef {
  apiDoScrollToValue: (value: any) => void
}

interface NavProps extends HTMLAttributes<HTMLDivElement> {
  data: { value: any; text: string }[]
  selected: any
  onSelect: (value: any) => void
  horizontal?: boolean
}

export type { NavProps, NavRef }
