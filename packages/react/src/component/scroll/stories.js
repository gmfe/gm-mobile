import React, { useRef } from 'react'
import _ from 'lodash'
import Scroll from './scroll'
import { observable } from 'mobx'

const store = observable({
  data: _.range(20),
  noMore: false,
  loadMore() {
    this.data = _.range(30)
    if (this.data.length === 30) {
      this.noMore = true
    }
  },
})

const Item = ({ item, index }) => {
  if (index % 5 === 0) {
    return <div className='m-bg-back'>title {index}</div>
  }
  return (
    <div style={{ height: '50px' }}>
      {item} {index}
    </div>
  )
}

const handleLoadMore = () => {
  console.log('onLoadMore')

  return new Promise((resolve) => {
    setTimeout(() => {
      store.loadMore()
      resolve()
    }, 1000)
  })
}

export const Normal = () => {
  const ref = useRef(null)

  return (
    <div>
      <button
        onClick={() => {
          ref.current.apiDoScrollToKey(10)
        }}
      >
        click to scroll to 10
      </button>
      <Scroll
        ref={ref}
        style={{ height: '300px' }}
        data={store.data}
        renderItem={Item}
        onLoadMore={handleLoadMore}
        noMore={store.noMore}
      />
    </div>
  )
}

export const Lazy = () => {
  return (
    <div>
      <Scroll
        style={{ height: '300px' }}
        data={store.data}
        renderItem={Item}
        onLoadMore={handleLoadMore}
        noMore={store.noMore}
        lazy
        itemMinHeight={() => {
          return '50px'
        }}
      />
    </div>
  )
}

export default {
  title: '基础/Scroll',
}
