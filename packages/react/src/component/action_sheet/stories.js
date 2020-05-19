import React from 'react'
import ActionSheet from './index'

export const normal = () => {
  const data = [
    { text: '菜单一', value: 1 },
    { text: '菜单二', value: 2 },
    { text: '菜单三', value: 3 },
  ]

  const handleClick = () => {
    ActionSheet.render({
      data,
      title: 'title',
    }).then((value) => {
      console.log(value)
    })
  }
  return <button onClick={handleClick}>ActionSheet</button>
}

export default {
  title: '浮层/ActionSheet',
}
