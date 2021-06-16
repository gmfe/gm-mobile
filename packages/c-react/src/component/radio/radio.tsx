import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { View } from '../view'
import { RadioProps } from './types'

export const Radio: FC<RadioProps> = ({
  className,
  disabled,
  checked,
  onChange = _.noop,
  children,
  ...rest
}) => {
  const handleChange = () => {
    if (disabled) return
    onChange()
  }

  return (
    <View
      {...rest}
      className={classNames(
        'm-radio',
        {
          disabled,
          'm-radio-checked': checked,
        },
        className
      )}
      onClick={handleChange}
    >
      <View className='m-radio-tick' />
      {children}
    </View>
  )
}

export default Radio
