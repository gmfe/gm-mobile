import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { View } from '../view'

interface MaskProps extends HTMLAttributes<HTMLDivElement> {
  opacity?: number
}

const Mask: FC<MaskProps> = ({ opacity = 0.5, className, style, ...rest }) => {
  return (
    <View
      {...rest}
      className={classNames('m-mask', className)}
      style={{
        ...style,
        opacity,
      }}
    />
  )
}

export default Mask
export type { MaskProps }
