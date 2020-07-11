import React, { useRef } from 'react'
import Nav from './'
import { observable } from 'mobx'
import View from '../view'
import Button from '../button'

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

export const Normal = () => {
  const ref = useRef(null)

  return (
    <View>
      <View style={{ width: '100px', height: '200px' }}>
        <Nav
          ref={ref}
          data={data}
          selected={store.value}
          onSelect={(value) => store.setValue(value)}
        />
      </View>
      <Button
        onClick={() => {
          ref.current.apiDoScrollToValue(8)
        }}
      >
        滚动到 安心蔬菜
      </Button>
    </View>
  )
}

export const horizontal = () => {
  return (
    <View style={{ width: '300px' }}>
      <Nav
        horizontal
        data={data}
        selected={store.value}
        onSelect={(value) => store.setValue(value)}
      />
    </View>
  )
}

export default {
  title: '布局/Nav',
}
