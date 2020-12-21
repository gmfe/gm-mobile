import React, { FC } from 'react'
import _ from 'lodash'

import { BaseTextareaProps } from './types'

const Base: FC<BaseTextareaProps> = ({ onChange = _.noop, ...rest }) => {
  return <textarea {...rest} onChange={onChange} />
}

export default Base
