import React from 'react'
import Cells from './cells'
import Cell from './cell'
import CellsForm from './cells_form'
import CellForm from './cell_form'
import { Input, InputPassword } from '../input'
import Textarea from '../textarea'
import { ButtonTime } from '../button'
import SVGSearch from '../../../svg/search.svg'
import { observable } from 'mobx'

export const normal = () => {
  return (
    <div className='m-bg-back m-padding-tb-10'>
      <Cells title='title 说明'>
        <Cell>children 文字</Cell>
        <Cell right={'right 说明文字'}>children 文字</Cell>
        <Cell access right={'right 说明文字'}>
          children 文字
        </Cell>
        <Cell access right={'right 说明文字'} href='https://www.guanmai.cn'>
          点击去官网
        </Cell>
      </Cells>

      <Cells title='带 icon'>
        <Cell
          access
          icon={<SVGSearch style={{ fontSize: '20px' }} />}
          right={'right 说明文字'}
        >
          children 文字
        </Cell>
        <Cell
          access
          icon={<SVGSearch style={{ fontSize: '20px' }} />}
          right={'right 说明文字'}
        >
          children 文字
        </Cell>
      </Cells>
    </div>
  )
}

const store = observable({
  value: '',
  age: '',
  password: '',
  area: '',
  position: '',
  address: '',
  code: '',
  setValue(field, value) {
    this[field] = value
  },
})

export const form = () => {
  return (
    <div className='m-padding-tb-10'>
      <CellsForm>
        <CellForm required>
          <Input
            type='text'
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
            value={store.name}
            onChange={(e) => {
              store.setValue('name', e.target.value)
            }}
            placeholder='请输入名字'
          />
        </CellForm>
        <CellForm label='年龄' labelWidth='100px'>
          <Input
            type='number'
            value={store.age}
            onChange={(e) => {
              store.setValue('age', e.target.value)
            }}
            placeholder='请输入年龄'
          />
        </CellForm>
        <CellForm label='密码' labelWidth='100px' error='填错啦'>
          <InputPassword
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
          right={<div>请选择</div>}
          onClick={() => {
            alert('push 地理标签页面')
          }}
        >
          {store.area ? (
            <div>{store.area}</div>
          ) : (
            <div className='m-text-placeholder'>省市区县、乡镇</div>
          )}
        </CellForm>
        <CellForm
          label='商户位置'
          labelWidth='100px'
          access
          right={<div>定位</div>}
          onClick={() => {
            alert('push 商户位置页面')
          }}
        >
          {store.position ? (
            <div>{store.position}</div>
          ) : (
            <div className='m-text-placeholder'>省市区县、乡镇</div>
          )}
        </CellForm>
        <CellForm label='收货地址' labelWidth='100px'>
          <Textarea
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
                alert('do 发送验证码')
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
            type='number'
            value={store.age}
            onChange={(e) => {
              store.setValue('age', e.target.value)
            }}
            placeholder='请输入年龄'
          />
        </CellForm>
      </CellsForm>
    </div>
  )
}

export default {
  title: '表单/Cell',
}
