import React from 'react'
import List from './index'
import { observable } from 'mobx'

const data = [
  { value: '南山', text: '南山' },
  { value: '福田', text: '福田', disabled: true },
  { value: '龙岗', text: '龙岗' },
  { value: '罗湖', text: '罗湖' },
  { value: '罗湖1', text: '罗湖1' },
  { value: '罗湖2', text: '罗湖2' },
  { value: '罗湖3', text: '罗湖3' },
  { value: '罗湖4', text: '罗湖4' },
  { value: '罗湖5', text: '罗湖5' },
]

const groupData = [
  {
    label: '分组一',
    children: [
      { value: '南山', text: '南山' },
      { value: '福田', text: '福田' },
    ],
  },
  {
    label: '分组二',
    children: [
      { value: '龙岗', text: '龙岗' },
      { value: '罗湖', text: '罗湖' },
    ],
  },
]

const store = observable({
  selected: null,
  mulSelected: [],
  groupSelected: [],
  setSelected(selected) {
    this.selected = selected
  },
  setMulSelected(selected) {
    this.mulSelected = selected
  },
  setGroupSelected(selected) {
    this.groupSelected = selected
  },
})

export const normal = () => (
  <div className='m-padding-bottom-20'>
    <List
      data={data}
      selected={store.selected}
      onSelect={(selected) => store.setSelected(selected)}
    />
  </div>
)

export const multiple = () => (
  <div className='m-padding-bottom-20'>
    <List
      multiple
      data={data}
      selected={store.mulSelected}
      onSelect={(selected) => store.setMulSelected(selected)}
    />
  </div>
)

export const group = () => (
  <div className='m-padding-bottom-20'>
    <List
      data={groupData}
      multiple
      isGroupList
      selected={store.groupSelected}
      onSelect={(selected) => store.setGroupSelected(selected)}
    />
  </div>
)

export default {
  title: '布局/List',
  component: List,
}
