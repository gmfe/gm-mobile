import React, { useState } from 'react'
import { observable } from 'mobx'
import { PullUpDown, ListPullUpDown } from './index'

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

const store = observable({
  listLength: 20,
  setListLength(v) {
    this.listLength = v
  },
})

export const list = () => {
  const handlePullDown = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('fetch data')
        store.setListLength(20)
        resolve()
      }, 2000)
    })
  }

  const handlePullUp = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('load data')
        store.setListLength(store.listLength + 10)
        resolve()
      }, 2000)
    })
  }

  return (
    <div style={{ height: '300px' }}>
      <ListPullUpDown onPullDown={handlePullDown} onPullUp={handlePullUp}>
        {_.times(store.listLength, (i) => (
          <div className='m-text-center' key={`${i}`}>{`item${i+1}`}</div>
        ))}
      </ListPullUpDown>
    </div>
  )
}

export default {
  title: '基础/PullUpDown',
}
