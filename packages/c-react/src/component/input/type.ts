import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>
interface InputMaxLengthProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export type { InputProps, InputMaxLengthProps }
