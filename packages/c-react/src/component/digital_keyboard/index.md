
# 表单/DigitalKeyboard

```tsx
import React, { useRef, FC } from 'react'
import { TextField } from '../text_field'
import { DigitalKeyboard, DigitalKeyboardProps } from '.'
import { Text } from '../text'
import { DKBtn } from './Btn'
import { View } from '../view'
import { Toast } from '../toast'
import { Page } from '../page'
import { Flex } from '../flex'

const Template: FC<DigitalKeyboardProps> = (args) => {
  Object.keys(args).forEach((key) => {
    // @ts-ignore
    if (args[key] === undefined) delete args[key]
  })

  const form = {
    apple: '1.00',
    peach: '0.50',
  }
  const keyboard = new DigitalKeyboard({
    ...args,
    form: form,
    active: '',
    async onAction(btn) {
      if (btn.label === '确认') {
        console.log('result:', 'apple', keyboard.get('apple'))
        keyboard.hide()
      }
    },
  })

  return (
    <View style={{ height: '300px' }}>
      <View className='m-margin-tb-20'>请在Canvas中预览键盘</View>
      {Object.keys(form).map((name) => {
        return (
          <TextField
            className='m-margin-bottom-5 m-bg-white'
            key={name}
            left={<Text className='m-text-desc m-margin-right-5'>{name}:</Text>}
            value={keyboard.get(name)}
            placeholder='type your price...'
            highlight={name === keyboard.active}
            onFocus={() => {
              keyboard.setActive(name)
              keyboard.show()
            }}
            outlined
            large
          />
        )
      })}
    </View>
  )
}
export default Template
```

```tsx
import React, { useRef } from 'react'
import { Story } from '@storybook/react'
import { TextField } from '../text_field'
import { DigitalKeyboard, DigitalKeyboardProps } from '.'
import { Text } from '../text'
import { DKBtn } from './Btn'
import { View } from '../view'
import { Toast } from '../toast'
import { Page } from '../page'
import { Flex } from '../flex'

const CustomLayout = () => {
  const form = {
    apple: '1.00',
    peach: '0.50',
  }
  const keyboard = new DigitalKeyboard({
    form: form,
    active: '',
  })

  return (
    <Page style={{ width: '100%' }}>
      <Flex
        height='100px'
        className='m-bg-accent m-margin-tb-10'
        alignCenter
        justifyCenter
      >
        头部
      </Flex>
      <View>显示在指定位置</View>
      <View>{keyboard.node}</View>
      <Flex
        height='100px'
        className='m-bg-accent m-margin-tb-10'
        alignCenter
        justifyCenter
      >
        尾部
      </Flex>
    </Page>
  )
}

export default CustomLayout 
```

```tsx
import React, { useRef } from 'react'
import { Story } from '@storybook/react'
import { TextField } from '../text_field'
import { DigitalKeyboard, DigitalKeyboardProps } from '.'
import { Text } from '../text'
import { DKBtn } from './Btn'
import { View } from '../view'
import { Toast } from '../toast'
import { Page } from '../page'
import { Flex } from '../flex'

const CustomActions = () => {
  // 通过继承的方式自定义keys
  class Keyboard extends DigitalKeyboard {
    get actionKeys() {
      return [
        new DKBtn({
          className: 'm-bg-accent m-text-white',
          label: '自定义',
          fn: (value) => {
            Toast.success({ children: '按下了自定义按钮' })
            return '一键输入自定义内容'
          },
        }),
        new DKBtn({
          label: '确认',
          flex: 3,
          className: 'm-bg-primary m-text-white',
          fn: (value) => {
            this.hide()
            return this.get(this.active)
          },
        }),
      ]
    }
  }

  const keyboard = new Keyboard({
    rewriteMode: true,
    fractionDigits: 2,
    min: 0,
    max: 9999.99,
    // 也可以通过这里自定义keys
    // digitalKeys: [],
    // actionKeys: [],
    form: {
      input: '',
    },
  })
  return (
    <View style={{ height: '300px' }}>
      <TextField
        className='m-margin-bottom-5'
        left={<Text className='m-text-desc m-margin-right-5'>name:</Text>}
        value={keyboard.get('input')}
        placeholder='type the fruit price...'
        highlight
        outlined
        large
        onFocus={() => keyboard.show()}
      />
    </View>
  )
}

export default CustomActions
```
