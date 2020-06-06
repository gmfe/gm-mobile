import React from 'react'
import { Input as TInput } from '@tarojs/components'

const Input = ({ autoFocus, onChange, ...rest }) => {
  const handleInput = (e) => {
    onChange(e)
  }

  return <TInput {...rest} focus={autoFocus} onInput={handleInput} />
}

export default Input
