import React, { FC } from 'react'
import { Input as TInput, BaseEventOrig } from '@tarojs/components'
import { TInputProps } from './types'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'

const Input: FC<TInputProps> = ({ autoFocus, onChange, ...rest }) => {
  const handleInput = (e: BaseEventOrig<TaroInputProps.inputEventDetail>) => {
    onChange && onChange(e)
  }

  return <TInput {...rest} focus={autoFocus} onInput={handleInput} />
}

export default Input
