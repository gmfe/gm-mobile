import React from 'react'

import { Popup } from './'
import { View } from '../view'
import { Button } from '../button'

export const normal = () => {
  return (
    <View>
      <Button
        onClick={() => {
          Popup.render({
            left: true,
            children: (
              <View>
                <View>adsfas</View>
              </View>
            ),
            onHide: Popup.hide,
          })
        }}
      >
        left
      </Button>
      <Button
        onClick={() => {
          Popup.render({
            right: true,
            children: <View>lala</View>,
            onHide: Popup.hide,
          })
        }}
      >
        right
      </Button>
      <Button
        onClick={() => {
          Popup.render({
            bottom: true,
            children: <View>lala</View>,
            onHide: Popup.hide,
          })
        }}
      >
        bottom
      </Button>
      <Button
        onClick={() => {
          Popup.render({
            style: {
              top: '50%',
              left: '50%',
              marginTop: '-200px',
              marginLeft: '-150px',
              width: '300px',
              height: '400px',
            },
            children: <View>center</View>,
            disabledHeader: true,
            onHide: Popup.hide,
          })
        }}
      >
        center
      </Button>
    </View>
  )
}

export const title = () => {
  return (
    <Button
      onClick={() => {
        Popup.render({
          title: '啦啦啦',
          bottom: true,
          children: <View>lala</View>,
          onHide: Popup.hide,
        })
      }}
    >
      bottom
    </Button>
  )
}

export default {
  title: '浮层/Popup',
  component: Popup,
}
