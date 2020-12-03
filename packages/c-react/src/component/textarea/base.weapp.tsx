import React, { FC, ChangeEvent } from 'react'
import { Textarea } from '@tarojs/components'
import _ from 'lodash'

import { BaseTextareaProps } from './types'

const Base: FC<BaseTextareaProps> = ({ onChange = _.noop, ...rest }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
  }

  return (
    <Textarea
      {...rest}
      placeholderClass='m-text-placeholder'
      /** @ts-ignore */
      onInput={handleChange}
    />
  )
}

export default Base
