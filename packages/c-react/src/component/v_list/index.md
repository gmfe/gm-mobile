# 布局/VList

```tsx
import React, { useRef, useState } from 'react'
import _ from 'lodash'
import { VList } from '.'
import { View } from '../view'
import { Button } from '../button'
import { Page } from '../page'
import { VListRef } from './types'

const Item = ({ data }: any) => {
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

const VListDemo = () => {
  const ref = useRef<VListRef>(null)

  return (
    <Page>
      <Button
        onClick={() => {
          ref.current!.apiDoScrollToKey('29')
        }}
      >
        scroll to 29
      </Button>
      <VList
        ref={ref}
        height={500}
        data={_.range(30)}
        renderItem={({ item }: any): React.ReactElement => {
          return <Item data={item} />
        }}
        itemHeight={100}
      />
    </Page>
  )
}

export default VListDemo
```
