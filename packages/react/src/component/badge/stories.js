import React from 'react'
import Badge from './index'

export const normal = () => (
  <div style={{ padding: '20px' }}>
    <Badge count={8} />
    <div/>
    <Badge count={100}/>
    <div/>
    <Badge showOverflow count={100} />
  </div>
)

export const dot = () => (
  <div style={{ padding: '20px' }}>
    <Badge dot count={2}>
      <div>消息</div>
    </Badge>
  </div>
)


export const corner = () => (
  <div style={{ padding: '20px' }}>
    <Badge corner count={100}>
      <div style={{ padding: '5px' }}>消息</div>
    </Badge>
  </div>
)

export default {
  title: 'Badge',
}
