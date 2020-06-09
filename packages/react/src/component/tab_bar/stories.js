import Tabbar from './index'
import React, { useState } from 'react'

export const normal = () => {
  const [active, setActive] = useState('/my')

  const handleTabChange = (config, index) => {
    setActive(config.to)
  }

  const configs = [
    {
      name: '订单',
      to: '/order',
      icon: <i className='m-font m-font-plus' />,
      activeIcon: <i className='m-font m-font-close-circle' />,
    },
    {
      name: '我的',
      to: '/my',
      icon: <i className='m-font m-font-plus' />,
    },
    {
      name: '购物车',
      icon: <i className='m-font m-font-close-circle' />,
      to: '/cart',
      showBadge: true,
      badge: { count: 7, corner: true },
    },
  ]
  return (
    <div className='m-padding-top-10'>
      <Tabbar
        configs={configs}
        onTabChange={handleTabChange}
        selected={active}
      />
    </div>
  )
}

export default {
  title: '布局/Tabbar',
}
