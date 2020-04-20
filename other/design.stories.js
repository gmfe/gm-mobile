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

export const border = () => {
  return (
    <div>
      <div>
        <h3>常规border</h3>
        .m-border .m-border-top .m-border-left .m-border-right .m-border-bottom
      </div>
      <div>
        <h3>圆角</h3>
        .m-border-radius .m-border-radius-top-left .m-border-radius-top-right
        .m-border-bottom-left .m-border-bottom-right
      </div>
      <div>
        <h3>1px border</h3>
        <div>.m-border-1px-before .m-border-1px-after</div>
        <div>.m-border-1px-top-before .m-border-1px-top-after</div>
        <div>.m-border-1px-left-before .m-border-1px-left-after</div>
        <div>.m-border-1px-right-before .m-border-1px-right-after</div>
        <div>.m-border-1px-bottom-before .m-border-1px-bottom-after</div>
      </div>
      <div>
        <h3>border none</h3>
        .m-border-none
      </div>
    </div>
  )
}

export default {
  title: '开发/Design',
}
