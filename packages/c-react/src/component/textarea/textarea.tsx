import React, { FC } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { View } from '../view'
import Base from './base'

import { TextareaProps } from './types'

const Textarea: FC<TextareaProps> = ({
  value = '',
  disabled,
  maxLength,
  isForm,
  className,
  ...rest
}) => {
  return (
    <View className='m-textarea-container'>
      <Base
        {...rest}
        value={value}
        className={classNames(
          'm-textarea',
          {
            'm-textarea-form': isForm,
            disabled,
          },
          className
        )}
        disabled={disabled}
      />
      {maxLength && (
        <View className='m-textarea-max-length'>
          {value?.length || 0}/{maxLength}
        </View>
      )}
    </View>
  )
}

export default Textarea
