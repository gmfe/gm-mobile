# 浮层/Mask
```tsx
import React from 'react'
import { View } from '../view'
import { Button } from '../button'
import { Popup } from '../popup'

const normal = () => {
  return (
    <View>
      一般与浮层类组件搭配使用，遮罩作用，可设置背景深浅
      <View>
        <Button
          onClick={() => {
            Popup.render({
              left: true,
              children: <View>adsfas</View>,
              onHide: Popup.hide,
            })
          }}
        >
          normal opacity
        </Button>
        <View>
          <Button
            onClick={() => {
              Popup.render({
                left: true,
                children: <View>adsfas</View>,
                onHide: Popup.hide,
                opacity: 0.2,
              })
            }}
          >
            change opacity
          </Button>
        </View>
      </View>
    </View>
  )
}

export default normal
```
