import React from 'react'
import { observable } from 'mobx'
import { is } from '@gm-mobile/c-tool'
import Cells from './cells'
import Cell from './cell'
import CellsForm from './cells_form'
import CellForm from './cell_form'
import { Flex } from '../flex'
import { ButtonTime } from '../button'
import { View } from '../view'
import { Text } from '../text'
import { Toast } from '../toast'

import { Input, InputPassword } from '../input'
import Textarea from '../textarea'

export const normal = () => {
  return (
    <View className='m-bg-back m-padding-tb-10'>
      <Cells title='title 说明'>
        <Cell>children 文字</Cell>
        <Cell right='right 说明文字'>children 文字</Cell>
        <Cell access right='right 说明文字'>
          children 文字
        </Cell>
        <Cell
          access
          right='right 说明文字'
          onClick={() => {
            if (is.weApp()) {
              Toast.tip('小程序自主处理跳转')
            } else {
              window.location.href = 'https://www.guanmai.cn'
            }
          }}
        >
          点击去官网
        </Cell>
      </Cells>

      <Cells title='带 icon'>
        <Cell
          access
          icon={
            <Text
              className='m-font m-font-search'
              style={{ fontSize: '16px', lineHeight: 1 }}
            />
          }
          right='right 说明文字'
        >
          children 文字
        </Cell>
        <Cell
          access
          icon={
            <Text
              className='m-font m-font-search'
              style={{ fontSize: '20px' }}
            />
          }
          right='right 说明文字'
        >
          children 文字
        </Cell>
      </Cells>
    </View>
  )
}

export const mini = () => {
  return (
    <View className='m-bg-back m-padding-tb-10'>
      <Cells title='title 说明' mini>
        <Cell
          access
          right={<View className='m-text-accent m-text-12'>兑换商品</View>}
        >
          <View className='m-text-desc'>积分已1000，可兑换商品</View>
        </Cell>
        <Cell
          access
          right={<View className='m-text-desc m-text-12'>共 20 件</View>}
        >
          <Flex>
            <View
              style={{ width: '50px', height: '50px' }}
              className='m-bg-back m-margin-right-10'
            />
            <View
              style={{ width: '50px', height: '50px' }}
              className='m-bg-back m-margin-right-10'
            />
            <View
              style={{ width: '50px', height: '50px' }}
              className='m-bg-back m-margin-right-10'
            />
          </Flex>
        </Cell>
        <Cell
          access
          right={<View className='m-text-12'>2020年04月22日20:13:32</View>}
        >
          <View className='m-text-desc'>收货时间</View>
        </Cell>
        <Cell right={<View className='m-text-12'>-￥1312313</View>}>
          <View className='m-text-desc'>限时优惠</View>
        </Cell>
        <Cell
          right={
            <View className='m-text-12 m-text-desc'>
              拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉
            </View>
          }
        >
          <View className='m-text-desc'>订单备注</View>
        </Cell>
      </Cells>
    </View>
  )
}

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

export const form = () => {
  return (
    <View className='m-padding-tb-10'>
      <View className='m-text-red m-text-20'>Input 记得加 isForm </View>

      <CellsForm title='啦啦啦啦'>
        <CellForm required>
          <Input
            type='text'
            isForm
            value={store.username}
            onChange={(e) => {
              store.setValue('username', e.target.value)
            }}
            placeholder='请输入用户名'
          />
        </CellForm>
        <CellForm required label='名字' labelWidth='100px'>
          <Input
            type='text'
            isForm
            value={store.name}
            onChange={(e) => {
              store.setValue('name', e.target.value)
            }}
            placeholder='请输入名字'
            onClick={() => {
              console.log('click')
            }}
            onFocus={() => {
              console.log('focus')
            }}
          />
        </CellForm>
      </CellsForm>
      <CellsForm title='啦啦啦啦'>
        <CellForm label='年龄' labelWidth='100px'>
          <Input
            type='number'
            isForm
            value={store.age}
            onChange={(e) => {
              store.setValue('age', e.target.value)
            }}
            placeholder='请输入年龄'
          />
        </CellForm>
        <CellForm label='密码' labelWidth='100px' error='填错啦'>
          <InputPassword
            isForm
            value={store.password}
            onChange={(e) => {
              store.setValue('password', e.target.value)
            }}
            placeholder='请输入密码'
          />
        </CellForm>
        <CellForm
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
        </CellForm>
        <CellForm
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
        </CellForm>
        <CellForm label='收货地址' labelWidth='100px'>
          <Textarea
            form
            value={store.address}
            onChange={(e) => {
              store.setValue('address', e.target.value)
            }}
            placeholder='请填写详细地址便于联系，如：深圳南山科技园腾讯大厦'
          />
        </CellForm>
        <CellForm
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
        >
          <Input
            value={store.code}
            onChange={(e) => {
              store.setValue('code', e.target.value)
            }}
          />
        </CellForm>
      </CellsForm>
      <CellsForm title='带标题的情况'>
        <CellForm label='名字' labelWidth='100px'>
          <Input
            isForm
            type='text'
            value={store.value}
            onChange={(e) => {
              store.setValue('value', e.target.value)
            }}
            placeholder='请输入名字'
          />
        </CellForm>
        <CellForm label='年龄' labelWidth='100px'>
          <Input
            isForm
            type='number'
            value={store.age}
            onChange={(e) => {
              store.setValue('age', e.target.value)
            }}
            placeholder='请输入年龄'
          />
        </CellForm>
      </CellsForm>
    </View>
  )
}

export default {
  title: '表单/Cell',
}
