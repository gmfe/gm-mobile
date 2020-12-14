import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import View from '../view'

interface SwitchProps extends HTMLAttributes<HTMLDivElement> {
  checked: boolean
  onChange: () => void
  disabled?: boolean
}

const Switch: FC<SwitchProps> = ({
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
