import React, { FC, useEffect } from 'react'
import { Events } from '..'

import { View, Button, Dialog, Flex } from '../../../c-react/src'

interface MyCustomEvent {
  name: string
  value: string
}

export const Normal: FC = () => {
  useEffect(() => {
    const listener = (event: CustomEvent<MyCustomEvent>) => {
      console.log(event)
      Dialog.render({
        children: (
          <Flex column>
            <View>这是自定义的scroll_customer事件</View>
            <View>事件名：{event.detail.name}</View>
          </Flex>
        ),
      })
    }

    Events.add('scroll_customer', listener)

    return () => Events.remove('scroll_customer', listener)
  }, [])
  return (
    <View>
      自定义事件：
      <Button
        onClick={(): void =>
          Events.dispatch<MyCustomEvent>('scroll_customer', {
            name: 'any',
            value: 'hhhh',
          })
        }
      >
        点击触发事件
      </Button>
    </View>
  )
}

export default {
  title: '工具/Event',
  component: Events,
}
