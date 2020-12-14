import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import Text from '../text'
import Flex from '../flex'

interface TabsProps {
  tabs: { value: number; text: string }[] // tabs数据
  active: any // 当前选中tab对应value值
  onChange: (index: number) => void
  type?: 'default' | 'label' | 'capsule'
  className?: string
}

const Tabs: FC<TabsProps> = ({
  tabs,
  active,
  onChange = _.noop,
  type = 'default',
  className,
  ...rest
}) => {
  const handleChange = (value: number) => {
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
