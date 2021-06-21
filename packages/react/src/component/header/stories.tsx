import React from 'react'
import { Header } from '.'

export const normal = () => {
  return (
    <div>
      <Header
        onBack={() => {
          console.log('点击返回拉')
        }}
      />
      <Header title='标题' />
    </div>
  )
}

export default {
  title: '布局/Header',
  component: Header,
}
