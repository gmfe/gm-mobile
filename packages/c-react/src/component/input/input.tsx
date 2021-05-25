import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { InputProps } from './type'

const Input = forwardRef<
  HTMLInputElement,
  Omit<InputProps, 'onInput' | 'value' | 'onChange'> &
    Partial<Pick<InputProps, 'value' | 'onChange'>>
>(({ isForm, className, value = '', ...rest }, ref) => {
  return (
    <input
      ref={ref}
      value={value}
      {...rest}
      className={classNames(
        'm-input',
        {
          'm-input-form': isForm,
        },
        className
      )}
    />
  )
})

export default Input
