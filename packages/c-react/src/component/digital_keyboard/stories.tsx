import React, { useRef } from 'react'
import { Meta, Story } from '@storybook/react'
import { TextField } from '../text_field'
import { DigitalKeyboard, DigitalKeyboardProps } from '.'
import { Text } from '../text'
import Btn from './Btn'
import { View } from '../view'
import { Toast } from '../toast'
import { Page } from '../page'
import { Flex } from '../flex'

const Template: Story<DigitalKeyboardProps> = (args) => {
  const form = {
    apple: '1.00',
    peach: '0.50',
  }
  const { current: keyboard } = useRef(
    new DigitalKeyboard({
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
  )

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
export const Usage = Template.bind({})
Usage.argTypes = {
  form: {
    description: '`Object` 表单的字段键值对',
    type: {
      required: true,
    },
  },
  active: {
    description: '`String` form的key，默认活动字段',
    type: {
      name: 'string',
      required: false,
    },
  },
  withSafeArea: {
    description: '`boolean` 下方用上安全边距(ios)',
    type: {
      name: 'boolean',
      required: false,
    },
  },
  rewriteMode: {
    description:
      '`boolean` rewrite mode下，切换输入框焦点后(即active改变后)，输入前先清空输入框',
    type: {
      name: 'boolean',
      required: false,
    },
  },
  fractionDigits: {
    description: '`number` 浮点模式下(int:false)，小数位个数限制，默认为2',
    type: {
      name: 'number',
      required: false,
    },
  },
  min: {
    description: '`number` 最小值',
    type: {
      name: 'number',
      required: false,
    },
  },
  max: {
    description: '`number` 最大值',
    type: {
      name: 'number',
      required: false,
    },
  },
  int: {
    description: '`boolean` 整数类型键盘',
    type: {
      name: 'boolean',
      require: false,
    },
  },
  header: {
    description: '`ReactNode` 键盘上方额外内容',
    control: false,
    type: {},
  },
  onInput: {
    description:
      '`(value: string | undefined, key: Btn) => void` 虚拟键盘的点击事件',
    control: false,
    type: {},
  },
  onAction: {
    description:
      '`(value: string | undefined, key: Btn) => void` 虚拟键盘的功能键(actionKeys)点击事件',
    control: false,
    type: {},
  },
  actionKeys: {
    description: '`typeof defaultActionKeys` 自定义功能键盘',
    control: false,
    type: {},
  },
  digitalKeys: {
    description: '`typeof defaultActionKeys` 自定义数字键盘',
    control: false,
    type: {},
  },
  '.show()': {
    description: '`()=>void` 使用Popup.layout(...)从下方弹出键盘组件。',
    type: {
      name: 'function',
    },
  },
  '.hide()': {
    description: '`()=>void` 关闭弹出。等同于Popup.hide()',
    type: {
      name: 'function',
    },
  },
  '.children': {
    description: '`ReactComponent` 键盘组件节点',
    type: {
      name: 'function',
    },
  },
  '.active': {
    description: 'keyboard当前活动于的form key',
    control: false,
    type: {
      name: 'string',
    },
  },
  '.setInt()': {
    description: '`(int?: boolean)=>void` 设置为整数型键盘',
    type: {
      name: 'function',
    },
  },
  '.get()': {
    description: '`(key?: string)=>string` 取指定form key的值',
    type: {
      name: 'function',
    },
  },
  '.set()': {
    description: '`(key?: string, value?:string)=>void` 设置指定form key的值',
    type: {
      name: 'function',
    },
  },
  '.setActive()': {
    description: '`(key?: string)=>void` 设置active',
    type: {
      name: 'function',
    },
  },
  '.next()': {
    description: '`()=>void` 设置active为form中的当前key的下一个key',
    type: {
      name: 'function',
    },
  },
}
Usage.args = {
  rewriteMode: true,
  fractionDigits: 2,
  min: 0,
  max: 9999.99,
}

export const CustomLayout = () => {
  const form = {
    apple: '1.00',
    peach: '0.50',
  }
  const { current: keyboard } = useRef(
    new DigitalKeyboard({
      form: form,
      active: '',
    })
  )

  return (
    <Page>
      <Flex
        height='100px'
        className='m-bg-accent m-margin-tb-10'
        alignCenter
        justifyCenter
      >
        头部
      </Flex>
      <View>显示在指定位置</View>
      <View>{keyboard.children}</View>
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

export const CustomActions = () => {
  // 通过继承的方式自定义keys
  class Keyboard extends DigitalKeyboard {
    get actionKeys() {
      return [
        new Btn({
          className: 'm-bg-accent m-text-white',
          label: '自定义',
          fn: (value) => {
            Toast.success({ children: '按下了自定义按钮' })
            return '一键输入自定义内容'
          },
        }),
        new Btn({
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

  const { current: keyboard } = useRef(
    new Keyboard({
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
  )
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

export default {
  title: '表单/DigitalKeyboard',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
}
