import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

import { View } from '../view'

const Square: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  const cn = classNames('m-square-inner', className)

  return (
    <View className='m-square'>
      <View {...rest} className={cn}>
        {children}
      </View>
    </View>
  )
}

export default Square
