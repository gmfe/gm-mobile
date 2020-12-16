import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Text } from '../text'
import { Flex } from '../flex'
import { TabsProps } from './types'

const Tabs: FC<TabsProps> = ({
  tabs,
  active,
  onChange = _.noop,
  type = 'default',
  className,
  ...rest
}) => {
  const handleChange = (value: string) => {
    onChange(value)
  }

  return (
    <Flex {...rest} className={classNames(`m-tabs m-tabs-${type}`, className)}>
      <Flex className='m-tabs-content'>
        {_.map(tabs, (tab) => (
          <Flex
            justifyCenter
            alignCenter
            className={classNames('m-tabs-item', {
              active: active === tab.value,
            })}
            key={tab.value}
            onClick={() => handleChange(tab.value)}
          >
            <Text className='m-tabs-item-text'>{tab.text}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default Tabs
