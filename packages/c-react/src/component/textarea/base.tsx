import React, { forwardRef } from 'react'
import _ from 'lodash'

import { BaseTextareaProps } from './types'

const Base = forwardRef<HTMLTextAreaElement, BaseTextareaProps>(
  ({ onChange = _.noop, onInput, ...rest }, ref) => {
    return <textarea ref={ref} {...rest} onChange={onChange} />
  }
)

export default Base
