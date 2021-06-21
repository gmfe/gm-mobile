import React, { useState } from 'react'
import { TextField } from '.'
import { TextFieldProps } from './types'
import { Meta, Story } from '@storybook/react'
import { Text } from '../text/text'
import { Button } from '../button'
import { View } from '../view'
import { Page } from '../page'

const Template: Story<TextFieldProps> = ({ value = '输入内容', ...rest }) => {
  const [state, setState] = useState({
    value,
  })
  return (
    <TextField
      value={state.value}
      onChange={(e) => {
        setState({ ...state, value: e.target.value })
      }}
      err={state.value === '' ? '不能为空' : undefined}
      {...rest}
    />
  )
}

export const Usage = Template.bind({})
Usage.args = {
  prefix: '用户名: ',
  right: '×',
  bottomLined: true,
  errClassName: 'm-text-right',
}

export const MultiLine = Template.bind({})
MultiLine.args = {
  ...Usage.args,
  multiLines: true,
  prefix: <Text className='m-margin-top-10'>备注</Text>,
}

export const Background = Template.bind({})
Background.args = {
  ...Usage.args,
  bottomLined: false,
  className: 'm-bg-light m-padding-lr-5',
}

export const Outlined = Template.bind({})
Outlined.args = {
  outlined: true,
  left: <Text className='m-text-desc m-margin-right-5'>密码：</Text>,
  type: 'password',
  right: Usage.args.suffix,
  placeholder: '请输入内容...',
  value: '...',
}

export const Round = Template.bind({})
Round.args = {
  className: 'm-text-20',
  large: true,
  value: 'set border-radius',
  round: true,
  outlined: true,
}

export const WithButton = Template.bind({})
WithButton.args = {
  large: true,
  value: '9527',
  outlined: true,
  width: '300px',
  right: (
    <Button
      mini
      noRound
      onClick={() => new Promise((resolve) => setTimeout(resolve, 3000))}
    >
      获取验证码
    </Button>
  ),
}

export const Misc = Template.bind({})
Misc.args = {
  placeholder: '请输入密码',
  value: '',
  type: 'password',
  outlined: true,
  err: '密码不能为空',
}

export const Search = () => {
  return (
    <Page
      style={{ height: '100px' }}
      top={
        <View className='m-padding-tb-10 m-padding-lr-10'>
          <TextField
            block
            round
            mini
            innerClassName='m-bg-white m-padding-lr-10 m-padding-tb-5'
            placeholder='搜索'
            left={<Text className='m-font-search' />}
            value=''
          />
        </View>
      }
    >
      page
    </Page>
  )
}

export default {
  title: '表单/TextField',
  component: TextField,
  argTypes: {
    onChange: {
      action: 'onChange',
    },
  },
} as Meta
