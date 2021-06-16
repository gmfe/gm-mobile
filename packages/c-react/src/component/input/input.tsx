import React, { createRef, forwardRef } from 'react'
import classNames from 'classnames'
import { InputProps } from './type'

export const Input = forwardRef<HTMLInputElement, Omit<InputProps, 'onInput'>>(
  ({ isForm, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
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
  }
)

export default Input
