import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { View } from '../view'
import { SwitchProps } from './types'

export const Switch: FC<SwitchProps> = ({
  checked,
  disabled,
  onChange = _.noop,
  className,
  ...rest
}) => {
  const handleClick = () => {
    if (disabled) return
    onChange()
  }
  return (
    <View
      {...rest}
      className={classNames(
        'm-switch',
        {
          'm-switch-on': checked,
          disabled: disabled,
        },
        className
      )}
      onClick={handleClick}
    />
  )
}

export default Switch
