import React, { ChangeEvent, FC } from 'react'
import { Textarea, BaseEventOrig } from '@tarojs/components'
import { TextareaProps as TaroTextareaProps } from '@tarojs/components/types/Textarea'
import _ from 'lodash'

import { BaseTextareaProps } from './types'

const Base: FC<BaseTextareaProps> = ({
  onChange = _.noop,
  // onInput,
  ...rest
}) => {
  const handleChange = (
    e:
      | ChangeEvent<HTMLTextAreaElement>
      | BaseEventOrig<TaroTextareaProps.onInputEventDetail>
  ) => {
    onChange && onChange(e as ChangeEvent<HTMLTextAreaElement>)
    // onInput && onInput(e as BaseEventOrig<TaroTextareaProps.onInputEventDetail>)
  }

  return <Textarea {...rest} onInput={handleChange} />
}

export default Base
