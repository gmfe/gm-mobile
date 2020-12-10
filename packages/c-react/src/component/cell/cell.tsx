import React, { FC, ReactNode, CSSProperties, MouseEvent } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import Flex from '../flex'
import View from '../view'
import Text from '../text'

interface CellProps {
  /** 右边带箭头 */
  access?: boolean
  /** 左边有图标的情况 */
  icon?: ReactNode
  left?: ReactNode | string
  right?: ReactNode | string
  className?: string
  style?: CSSProperties
  onClick: (event: MouseEvent<HTMLDivElement>) => void
}

const Cell: FC<CellProps> = ({
  access,
  icon,
  left,
  right,
  onClick = _.noop,
  children,
  className,
  ...rest
}) => {
  return (
    <Flex
      {...rest}
      alignCenter
      className={classNames(
        'm-cell',
        {
          'm-cell-access': access,
          'm-cell-with-icon': icon,
        },
        className
      )}
      onClick={onClick}
    >
      {icon && <View className='m-cell-icon'>{icon}</View>}
      {left && <View className='m-cell-left'>{left}</View>}
      <View className='m-cell-body'>{children}</View>
      <Flex alignCenter>
        {right &&
          (_.isString(right) ? (
            <View className='m-cell-right'>{right}</View>
          ) : (
            right
          ))}
        {access && (
          <Text className='m-font m-font-angle-right m-cell-access-icon' />
        )}
      </Flex>
    </Flex>
  )
}

export default Cell
export type { CellProps }
