import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { InputProps } from './type'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ form, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        className={classNames(
          'm-input',
          {
            'm-input-form': form,
          },
          className
        )}
      />
    )
  }
)

export default Input
