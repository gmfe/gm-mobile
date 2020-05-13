import React from 'react'
import RepeatTimes from './index'

export const Normal = () => {
  return (
    <RepeatTimes
      onRepeat={() => {
        console.log('hello')
      }}
    >
      <div>点我5次</div>
    </RepeatTimes>
  )
}

export default {
  title: '基础/RepeatTimes',
}
