import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { View } from '../view'
import { ErrorProps } from './types'
import { Text } from '../text'

export const Error: FC<ErrorProps> = ({ className, topLine, children }) => {
  return children ? (
    <View
      className={classNames('error', className, {
        'm-border-1px-top-before': topLine,
        'has-error': !!children,
      })}
    >
      <View className='error-message'>{children}</View>
    </View>
  ) : (
    <></>
  )
}

export default Error
