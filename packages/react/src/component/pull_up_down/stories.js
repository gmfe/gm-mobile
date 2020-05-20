import React, { useState } from 'react'
import PullUpDown from './index'

export const top = () => {
  const renderTop = () => <div>Top</div>

  const handlePullDown = () => {
    console.log('pull down')
  }

  return (
    <PullUpDown topRender={renderTop} onPullDown={handlePullDown}>
      <div style={{ height: '300px' }}>请在此区域往下拉</div>
    </PullUpDown>
  )
}

export const bottom = () => {
  const renderBottom = () => <div>Bottom</div>

  const handlePullUp = () => {
    console.log('pull up')
  }

  return (
    <PullUpDown bottomRender={renderBottom} onPullUp={handlePullUp}>
      <div className='bottom-content' style={{ height: '300px' }}>
        请在此区域往上拉
      </div>
    </PullUpDown>
  )
}

export default {
  title: '布局/PullUpDown',
}
