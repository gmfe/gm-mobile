import React, { useRef, useState } from 'react'
import _ from 'lodash'
import vListMP from '.'
import { View, Button, Page } from '@gm-mobile/components'

const Item = ({ data }) => {
  const [show, setShow] = useState(false)
  return (
    <View
      onClick={() => {
        setShow(!show)
      }}
    >
      {data}
      {show && <View style={{ height: '200px' }}>100px</View>}
    </View>
  )
}

export const releaseList = () => {
  const ref = useRef(null)

  return (
    <Page>
      <Button
        onClick={() => {
          ref.current.apiDoScrollToKey(29)
        }}
      >
        scroll to 29
      </Button>
      <vListMP
        ref={ref}
        height={500}
        data={_.range(30)}
        renderItem={({ item, index }) => {
          return <Item data={item} />
        }}
        itemHeight={100}
      />
    </Page>
  )
}

export default {
  title: '布局/ReleaseList',
}
