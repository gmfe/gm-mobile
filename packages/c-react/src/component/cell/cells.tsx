import React, { FC, CSSProperties } from 'react'
import classNames from 'classnames'
import View from '../view'

interface CellsProps {
  title?: string
  mini?: boolean
  className?: string
  style?: CSSProperties
}

const Cells: FC<CellsProps> = ({
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
