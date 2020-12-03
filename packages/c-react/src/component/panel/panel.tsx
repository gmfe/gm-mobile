import React, { FC } from 'react'
import classNames from 'classnames'
import { Flex } from '../flex'
import { View } from '../view'
import { Text } from '../text'
import { PanelProps } from './types'

const Panel: FC<PanelProps> = ({
  title,
  onTitle,
  action,
  top,
  bottom,
  className,
  children,
}) => {
  return (
    <View
      className={classNames(
        'm-panel',
        {
          'm-panel-top': top,
          'm-panel-bottom': bottom,
        },
        className
      )}
    >
      <Flex alignCenter>
        {title && (
          <Flex
            alignCenter
            flex={!action}
            justifyBetween={!action}
            className='m-panel-title'
            onClick={onTitle}
          >
            {title}
            {onTitle && (
              <Text className='m-font m-font-angle-right m-margin-left-5' />
            )}
          </Flex>
        )}
        {action && <Flex flex />}
        {action && <View className='m-panel-action'>{action}</View>}
      </Flex>
      <View className='m-panel-content'>{children}</View>
    </View>
  )
}

export default Panel
