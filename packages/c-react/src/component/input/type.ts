import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>
interface InputMaxLengthProps extends InputHTMLAttributes<HTMLInputElement> {
  maxLength: number
}

export type { InputProps, InputMaxLengthProps }
