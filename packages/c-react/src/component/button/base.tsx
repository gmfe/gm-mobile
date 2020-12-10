import React, { forwardRef } from 'react'
import { BaseButtonProps } from './types'

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />
  }
)

export default BaseButton
