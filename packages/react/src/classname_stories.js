import React from 'react'
import _ from 'lodash'

export const spacing = () => {
  const arr = [5, 10, 15, 20]
  return (
    <div>
      5 超小号间距 10 小号间距 15 中号间距 20 大号间距
      <hr />
      <div>{_.map(arr, (v) => '.m-gap-' + v).join(' ')}</div>
      {_.map(['padding', 'margin'], (t) => (
        <div key={t}>
          {_.map(['top', 'bottom', 'left', 'right', 'tb', 'lr'], (d) => (
            <div key={d}>{_.map(arr, (v) => `${t}-${d}-${v}`).join(' ')}</div>
          ))}
        </div>
      ))}
    </div>
  )
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
    </div>
  )
}

export default {
  title: 'ClassName',
}
