import { HTMLAttributes } from 'react'

interface RadioProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  checked: boolean
  disabled?: boolean
  onChange?: () => void
}

export type { RadioProps }
