import React, { FC } from 'react'
import { InputProps } from './types'

const Input: FC<InputProps> = (props) => {
  return <input type='text' {...props} />
}

export default Input
