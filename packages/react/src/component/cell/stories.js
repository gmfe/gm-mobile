import React from 'react'
import Cells from './cells'
import Cell from './cell'
import CellsForm from './cells_form'
import CellForm from './cell_form'
import { Input, InputPassword } from '../input'
import Textarea from '../textarea'
import { ButtonTime } from '../button'
import Flex from '../flex'
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

export const mini = () => {
  return (
    <div className='m-bg-back m-padding-tb-10'>
      <Cells title='title 说明' mini>
        <Cell
          access
          right={<div className='m-text-accent m-text-12'>兑换商品</div>}
        >
          <div className='m-text-desc'>积分已1000，可兑换商品</div>
        </Cell>
        <Cell
          access
          right={<div className='m-text-desc m-text-12'>共 20 件</div>}
        >
          <Flex>
            <div
              style={{ width: '50px', height: '50px' }}
              className='m-bg-back m-margin-right-10'
            />
            <div
              style={{ width: '50px', height: '50px' }}
              className='m-bg-back m-margin-right-10'
            />
            <div
              style={{ width: '50px', height: '50px' }}
              className='m-bg-back m-margin-right-10'
            />
          </Flex>
        </Cell>
        <Cell
          access
          right={<div className='m-text-12'>2020年04月22日20:13:32</div>}
        >
          <div className='m-text-desc'>收货时间</div>
        </Cell>
        <Cell right={<div className='m-text-12'>-￥1312313</div>}>
          <div className='m-text-desc'>限时优惠</div>
        </Cell>
        <Cell
          right={
            <div className='m-text-12 m-text-desc'>
              拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉
            </div>
          }
        >
          <div className='m-text-desc'>订单备注</div>
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
      <CellsForm title='啦啦啦啦'>
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
      </CellsForm>
      <CellsForm title='啦啦啦啦'>
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
