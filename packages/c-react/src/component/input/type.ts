import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isFrom?: boolean
}
interface InputMaxLengthProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export type { InputProps, InputMaxLengthProps }
