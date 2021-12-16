import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Flex } from '../flex'
import { View } from '../view'
import { Text } from '../text'

import { CellProps } from './types'

export const Cell: FC<CellProps> = ({
  access,
  icon,
  left,
  right,
  onClick = _.noop,
  children,
  className,
  noActive,
  ...rest
}) => {
  return (
    <>
      <Flex
        {...rest}
        alignCenter
        className={classNames(
          'm-cell',
          {
            'm-cell-access': access,
            'm-cell-with-icon': icon,
            'm-cell-no-active': noActive,
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
    </>
  )
}

export default Cell
