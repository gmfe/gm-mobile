import React, { useRef, useState } from 'react'
import _ from 'lodash'
import { Page } from '@gm-mobile/components'
import { Lazy, LazyList } from './'

export const normal = () => {
  return (
    <Page>
      {_.map(_.range(30), (v) => (
        <Lazy key={v} style={{ height: '100px' }}>
          {v}
        </Lazy>
      ))}
    </Page>
  )
}

const Item = ({ data }) => {
  const [show, setShow] = useState(false)
  return (
    <div
      onClick={() => {
        setShow(!show)
      }}
    >
      {data}
      {show && <div style={{ height: '200px' }}>100px</div>}
    </div>
  )
}

export const lazyList = () => {
  const ref = useRef(null)

  return (
    <Page>
      <button
        onClick={() => {
          ref.current.apiDoScrollToKey(29)
        }}
      >
        scroll to 29
      </button>
      <LazyList
        ref={ref}
        style={{ height: '100vh' }}
        data={_.range(30)}
        renderItem={({ item, index }) => {
          return <Item data={item} />
        }}
        itemMinHeight={() => 100}
      />
    </Page>
  )
}

export default {
  title: '布局/Lazy',
}
