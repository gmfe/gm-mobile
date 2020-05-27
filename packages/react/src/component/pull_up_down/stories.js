import React, { useState } from 'react'
import PullUpDown from './index'
import _ from 'lodash'

export const top = () => {
  const renderTop = () => <div>Top</div>

  const handlePullDown = () => {
    console.log('pull down')
  }

  return (
    <PullUpDown
      scrollEl='.content'
      topRender={renderTop}
      onPullDown={handlePullDown}
    >
      <div className='content m-overflow-y' style={{ height: '300px' }}>
        {_.times(50, (i) => (
          <div key={i}>请在此区域往下拉</div>
        ))}
      </div>
    </PullUpDown>
  )
}

export const bottom = () => {
  const renderBottom = () => <div>Bottom</div>
  const renderTop = () => <div>Top</div>
  const handlePullUp = () => {
    console.log('pull up')
  }
  const handlePullDown = () => {
    console.log('pull down')
  }

  return (
    <PullUpDown
      scrollEl='.content'
      bottomRender={renderBottom}
      onPullUp={handlePullUp}
      topRender={renderTop}
      onPullDown={handlePullDown}
    >
      <div className='m-overflow-y content' style={{ height: '300px' }}>
        {_.times(50, (i) => (
          <div key={i}>请在此区域上下拉</div>
        ))}
      </div>
    </PullUpDown>
  )
}

export default {
  title: '布局/PullUpDown',
}
