import React, { useRef } from 'react'
import { Meta, Story } from '@storybook/react'
import { TextField } from '../text_field'
import { CustomKeyboard, CustomKeyboardProps } from '.'
import { Text } from '../text'
import Btn from './Btn'
import { View } from '../view'
import { Toast } from '../toast'

const Template: Story<CustomKeyboardProps> = (args) => {
  const form = {
    apple: '1.00',
    peach: '0.50',
  }
  const { current: keyboard } = useRef(
    new CustomKeyboard({
      ...args,
      form: form,
      active: 's',
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
  show: {
    description: '`boolean` 是否显示',
    defaultValue: true,
    type: {
      name: 'boolean',
      require: false,
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
}
Usage.args = {
  rewriteMode: true,
  fractionDigits: 2,
  min: 0,
  max: 9999.99,
}

export const CustomActions = () => {
  // 通过继承的方式自定义keys
  class Keyboard extends CustomKeyboard {
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
  title: '表单/Digital Keyboard',
}
