import React, { CSSProperties, FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import View from '../view'

interface CheckboxProps {
  /** 选中态 */
  checked: boolean
  /** 圆形 */
  circle?: boolean
  /** 主题色 */
  primary?: boolean
  disabled?: boolean
  /** 回调函数 */
  onChange?: () => void
  className?: string
  style?: CSSProperties
}

const Checkbox: FC<CheckboxProps> = ({
  className,
  disabled,
  checked,
  onChange = _.noop,
  circle,
  primary,
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
        'm-checkbox',
        {
          disabled,
          'm-checkbox-checked': checked,
          'm-checkbox-circle': circle,
          'm-checkbox-primary': primary,
        },
        className
      )}
      onClick={handleChange}
    >
      <View className='m-checkbox-tick' />
      <View className='m-checkbox-child'>{children}</View>
    </View>
  )
}

export default Checkbox

export { CheckboxProps }
