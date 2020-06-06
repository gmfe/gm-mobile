import React from 'react'
import { Textarea } from '@tarojs/components'

const Base = ({ onChange, onInput, ...rest }) => {
  const handleChange = (e) => {
    onChange && onChange(e)
    onInput && onInput(e)
  }

  return <Textarea {...rest} onInput={handleChange} />
}

export default Base
