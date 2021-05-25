import React from 'react'
import { observable } from 'mobx'
import { CellsForm } from '../cell'

import { ButtonTime, Button } from '../button'
import { View } from '../view'

import { Toast } from '../toast'
import FormItem from './items'
import { default as TempForm } from './form'
import { Input, InputPassword } from '../input'
import { Textarea } from '../textarea'
import { useFormRef } from '../../hooks'

const initStore: { [key: string]: any } = {
  username: '',
  name: '',
  value: '',
  age: '',
  password: '',
  area: '',
  position: '',
  address: '',
  code: '',
  setValue(field: string, value: string) {
    this[field] = value
  },
}

const store = observable(initStore)

export const Form = () => {
  const form = useFormRef()
  return (
    <View className='m-padding-tb-10'>
      <View className='m-text-red m-text-20'>Input 记得加 isForm </View>
      <TempForm initialValues={{ ...initStore }} form={form}>
        <CellsForm title='啦啦啦啦'>
          <FormItem required noActive name='username'>
            <Input isForm placeholder='请输入用户名' />
          </FormItem>
          <FormItem required label='名字' labelWidth='100px' name='name'>
            <Input isForm placeholder='请输入名字' />
          </FormItem>
        </CellsForm>
        <CellsForm title='啦啦啦啦'>
          <FormItem label='年龄' labelWidth='100px' name='age'>
            <Input type='number' isForm placeholder='请输入年龄' />
          </FormItem>
          <FormItem
            label='密码'
            labelWidth='100px'
            error='填错啦'
            name='password'
          >
            <InputPassword isForm placeholder='请输入密码' />
          </FormItem>
          <FormItem
            label='地理标签'
            labelWidth='100px'
            access
            right={<View>请选择</View>}
            onClick={() => {
              Toast.tip('push 地理标签页面')
            }}
          >
            {store.area ? (
              <View>{store.area}</View>
            ) : (
              <View className='m-text-placeholder'>省市区县、乡镇</View>
            )}
          </FormItem>
          <FormItem
            label='商户位置'
            labelWidth='100px'
            access
            right={<View>定位</View>}
            onClick={() => {
              Toast.tip('push 商户位置页面')
            }}
          >
            {store.position ? (
              <View>{store.position}</View>
            ) : (
              <View className='m-text-placeholder'>省市区县、乡镇</View>
            )}
          </FormItem>
          <FormItem label='收货地址' labelWidth='100px' name='address'>
            <Textarea
              isForm
              placeholder='请填写详细地址便于联系，如：深圳南山科技园腾讯大厦'
            />
          </FormItem>
          <FormItem
            label='短信验证'
            labelWidth='100px'
            right={
              <ButtonTime
                mini
                type='primary'
                onClick={() => {
                  Toast.tip('do 发送验证码')
                  return false
                }}
              >
                重新发送
              </ButtonTime>
            }
            name='primary'
          >
            <Input />
          </FormItem>
        </CellsForm>
        <CellsForm title='带标题的情况'>
          <FormItem label='名字' labelWidth='100px' name='value'>
            <Input isForm placeholder='请输入名字' />
          </FormItem>
          <FormItem label='年龄' labelWidth='100px' name='age'>
            <Input isForm type='number' placeholder='请输入年龄' />
          </FormItem>
        </CellsForm>
      </TempForm>
      <Button
        type='primary'
        className='m-margin-top-10'
        onClick={() => console.log(form.current.getFieldsValue())}
      >
        点击打印所有表单项数据(getFieldsValue)
      </Button>
      <View>
        <Button
          type='primary'
          className='m-margin-top-10'
          onClick={() =>
            console.log(form.current.setFieldsValue({ name: '暴走', age: 24 }))
          }
        >
          {
            '点击设置名字(name)为暴走，年龄(age)为24(setFieldsValue({name: 暴走, age: 24})'
          }
        </Button>
      </View>
      <View>
        <Button
          type='primary'
          className='m-margin-top-10'
          onClick={() => console.log(form.current.resetFields())}
        >
          点击重置所有所有表单项数据(resetFields)
        </Button>
      </View>
    </View>
  )
}

export default {
  title: '表单/Form',
}
