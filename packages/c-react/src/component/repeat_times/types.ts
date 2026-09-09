import { ReactNode } from 'react'

interface RepeatTimesProps {
  children?: ReactNode
  repeat?: number
  onRepeat: () => void
}

export type { RepeatTimesProps }
