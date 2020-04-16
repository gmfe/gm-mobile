import React from 'react'
import Cells from './cells'
import Cell from './cell'
import CellsForm from './cells_form'
import CellForm from './cell_form'
import Input from '../input'
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
  gender: '',
  setValue(field, value) {
    this[field] = value
  },
})

export const form = () => {
  return (
    <div className='m-padding-tb-10'>
      <CellsForm>
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
