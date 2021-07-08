import React, { FC, ChangeEvent, forwardRef } from 'react'
import { Textarea } from '@tarojs/components'
import _ from 'lodash'

import { BaseTextareaProps } from './types'

const Base: FC<BaseTextareaProps> = forwardRef(
  ({ onChange = _.noop, ...rest }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)
    }

    return (
      <Textarea
        ref={ref}
        {...rest}
        placeholderClass='m-text-placeholder'
        /** @ts-ignore */
        onInput={handleChange}
      />
    )
  }
)

export default Base
