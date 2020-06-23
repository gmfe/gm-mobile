import React, { useState } from 'react'
import { View, Text } from '@gm-mobile/components'
import FlowBtnTabbar from './'

export const normal = () => {
  const [active, setActive] = useState('/my')

  const handleTabChange = (config, index) => {
    setActive(config.to)
  }

  const left = [
    {
      name: '订单',
      to: '/order',
      icon: <Text className='m-font m-font-plus' />,
      activeIcon: <Text className='m-font m-font-close-circle' />,
    },
    {
      name: '我的',
      to: '/my',
      icon: <Text className='m-font m-font-plus' />,
    },
  ]

  const right = [
    {
      name: '其他',
      to: '/other',
      icon: <Text className='m-font m-font-plus' />,
    },
    {
      name: '购物车',
      icon: <Text className='m-font m-font-close-circle' />,
      to: '/cart',
      showBadge: true,
      badge: { count: 7, corner: true },
    },
  ]

  return (
    <View style={{ marginTop: '50px' }}>
      <FlowBtnTabbar
        rightConfigs={right}
        leftConfigs={left}
        onFlowButtonClick={() => console.log('click')}
        onTabChange={handleTabChange}
        selected={active}
        FlowButton={<Text>+</Text>}
      />
    </View>
  )
}

export default {
  title: '布局/FlowBtnTabbar',
}
