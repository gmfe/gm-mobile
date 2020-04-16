import React from 'react'
import _ from 'lodash'

export const spacing = () => {
  return <div>5 超小号间距 10 小号间距 15 中号间距 20 大号间距</div>
}

export const font = () => {
  const arr = [11, 13, 14, 17, 18, 20]
  return (
    <div>
      大小
      {_.map(arr, (v) => (
        <div className={`m-text-${v}`}>
          m-text-{v} 字体大小 {v === 14 && '默认'}
        </div>
      ))}
      颜色
      <div>主内容</div>
      <div className='gm'>次要内容</div>
    </div>
  )
}

export default {
  title: '开发/Design',
}
