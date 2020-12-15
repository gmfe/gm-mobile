import React, { FC } from 'react'
import { Input as TInput } from '@tarojs/components'
import { TInputProps } from './types'

const Input: FC<TInputProps> = ({ autoFocus, onChange, ...rest }) => {
  const handleInput = (e) => {
    onChange && onChange(e)
  }

  return <TInput {...rest} focus={autoFocus} onInput={handleInput} />
}

export default Input
