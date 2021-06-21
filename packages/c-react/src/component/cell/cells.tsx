import React, { FC } from 'react'
import classNames from 'classnames'
import { View } from '../view'

import { CellsProps } from './types'

export const Cells: FC<CellsProps> = ({
  title,
  mini,
  className,
  children,
  ...rest
}) => {
  return (
    <View
      {...rest}
      className={classNames(
        'm-cells',
        {
          'm-cells-mini': mini,
        },
        className
      )}
    >
      {title && <View className='m-cells-title'>{title}</View>}
      <View className='m-cells-content'>{children}</View>
    </View>
  )
}

export default Cells
