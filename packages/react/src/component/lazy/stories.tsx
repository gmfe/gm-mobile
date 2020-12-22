import React, { useRef, useState, FC } from 'react'
import _ from 'lodash'
import { Page } from '@gm-mobile/c-react'
import { Lazy, LazyList } from '.'
import { LazyListRef } from './types'

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

const Item: FC<{ data: any }> = ({ data }) => {
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

export const LazyListDemo = () => {
  const ref = useRef<LazyListRef>(null)

  return (
    <Page>
      <button
        onClick={() => {
          ref.current && ref.current.apiDoScrollToKey(29)
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
