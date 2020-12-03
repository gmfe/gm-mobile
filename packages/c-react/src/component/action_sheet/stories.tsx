import React from 'react'
import { ActionSheet } from './index'
import { View } from '../view'
import classNames from 'classnames'
import { Button } from '../button'

export const normal = () => {
  const data = [
    { text: '菜单一', value: 1 },
    { text: '菜单二', value: 2 },
    { text: '菜单三', value: 3 },
  ]

  const handleClick = () => {
    ActionSheet.render({
      data,
      title: 'title',
    }).then(
      (value) => {
        console.log(value)
        return null
      },
      () => {
        console.log('reject')
      }
    )
  }
  return <Button onClick={handleClick}>ActionSheet</Button>
}

export const customItem = () => {
  const data = [
    { text: '菜单一', value: 1 },
    { text: '菜单二', value: 2 },
    { text: '删除', value: 3 },
  ]

  const handleClick = () => {
    ActionSheet.render({
      data,
      title: 'title',
      renderItem: (option) => {
        return (
          <View className={classNames({ 'm-text-red': option.value === 3 })}>
            {option.text}
          </View>
        )
      },
    }).then(
      (value) => {
        console.log(value)
        return null
      },
      () => {
        console.log('reject')
      }
    )
  }
  return <Button onClick={handleClick}>ActionSheet</Button>
}

export default {
  title: '浮层/ActionSheet',
}
