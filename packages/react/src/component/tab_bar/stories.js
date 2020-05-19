import Tabbar from './index'
import React, { useState } from 'react'
import SvgPlus from '../../../svg/plus.svg'
import SvgClose from '../../../svg/close-circle.svg'

export const normal = () => {
  const [active, setActive] = useState('/my')

  const handleTabChange = (config, index) => {
    setActive(config.to)
  }

  const configs = [
    {
      name: '订单',
      to: '/order',
      icon: <SvgPlus />,
      activeIcon: <SvgClose />,
    },
    {
      name: '我的',
      to: '/my',
      icon: <SvgPlus />,
    },
    {
      name: '购物车',
      icon: <SvgClose />,
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
