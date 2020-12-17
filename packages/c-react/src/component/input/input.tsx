import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { InputProps } from './type'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isFrom, className, ...rest }, ref) => {
    console.log('form', isFrom)
    return (
      <input
        ref={ref}
        {...rest}
        className={classNames(
          'm-input',
          {
            'm-input-form': isFrom,
          },
          className
        )}
      />
    )
  }
)

export default Input
