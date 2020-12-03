import { HTMLAttributes } from 'react'

interface SwitchProps extends HTMLAttributes<HTMLDivElement> {
  checked: boolean
  onChange?: () => void
  disabled?: boolean
}

export type { SwitchProps }
