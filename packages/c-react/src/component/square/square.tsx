import React, { FC } from 'react'
import classNames from 'classnames'
import { SquareProps } from './types'

import { View } from '../view'

const Square: FC<SquareProps> = ({ className, children, ...rest }) => {
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
