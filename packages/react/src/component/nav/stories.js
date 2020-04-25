import React from 'react'
import List from './'
import { observable } from 'mobx'

const data = [
  {
    value: 1,
    text: '白菜',
  },
  {
    value: 2,
    text: '啦啦啦啦',
  },
  {
    value: 3,
    text: '熟食冻品',
  },
  {
    value: 4,
    text: '新鲜水果',
  },
  {
    value: 5,
    text: '肉禽蛋',
  },
  {
    value: 6,
    text: '调料干货',
  },
  {
    value: 7,
    text: '豆制品',
  },
  {
    value: 8,
    text: '安心蔬菜',
  },
]

const store = observable({
  value: 1,
  setValue(value) {
    this.value = value
  },
})

export const normal = () => {
  return (
    <div style={{ width: '100px', height: '300px' }}>
      <List
        data={data}
        selected={store.value}
        onSelect={(value) => store.setValue(value)}
      />
    </div>
  )
}

export const horizontal = () => {
  return (
    <div style={{ width: '300px' }}>
      <List
        horizontal
        data={data}
        selected={store.value}
        onSelect={(value) => store.setValue(value)}
      />
    </div>
  )
}

export default {
  title: '布局/Nav',
}
