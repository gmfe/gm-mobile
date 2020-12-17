import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { WInputProps } from './type'

const Input = forwardRef<HTMLInputElement, WInputProps>(
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
