import React, { FC, ChangeEvent } from 'react'
import { Textarea, BaseEventOrig } from '@tarojs/components'
import { TextareaProps as TaroTextareaProps } from '@tarojs/components/types/Textarea'
import _ from 'lodash'

import { BaseTextareaProps } from './types'

const Base: FC<BaseTextareaProps> = ({
  onChange = _.noop,
  onInput,
  ...rest
}) => {
  const handleChange = (
    e:
      | BaseEventOrig<TaroTextareaProps.onInputEventDetail>
      | ChangeEvent<HTMLInputElement>
  ) => {
    onChange && onChange(e as ChangeEvent<HTMLInputElement>)
    onInput && onInput(e as BaseEventOrig<TaroTextareaProps.onInputEventDetail>)
  }

  return (
    <Textarea
      {...rest}
      placeholderClass='m-text-placeholder'
      onInput={handleChange}
    />
  )
}

export default Base
