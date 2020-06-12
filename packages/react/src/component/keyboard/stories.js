import React, { useState } from 'react'
import { observable } from 'mobx'

import Button from '../button'
import KeyboardWrap from './wrap'
import Page from '../page'
import KeyboardFuncBox from './func_box'
import KeyboardStatic from './statics'

const numStore = observable({
  one: '',
  two: '',
  three: '',
  data: [
    {
      value: '',
      id: 'one',
    },
    {
      value: '',
      id: 'two',
    },
    {
      value: '',
      id: 'four',
    },
    {
      value: '',
      id: 'three',
    },
  ],
  setValue(id, v) {
    this[id] = v
  },
  setData(data) {
    this.data = data
  },
})

const KeyboardInput = ({ id, value, title, useFuncBar, onFocus, onChange }) => {
  return (
    <div className='m-margin-tb-20'>
      <span
        className='m-inline-block m-margin-left-10'
        style={{ width: '100px', height: '30px' }}
      >
        商品{id}:
      </span>
      <KeyboardWrap
        title={title ? `商品${id}` : null}
        defaultValue={value}
        onSubmit={(v) => numStore.setValue(id, v)}
        min={2}
        max={100}
        className='m-inline-block'
        useFuncBar={useFuncBar}
        onFocus={onFocus}
        onChange={onChange}
      >
        <span
          className='m-border-1px-before m-inline-block m-keybaord-input'
          style={{
            height: '30px',
            width: '100px',
            lineHeight: '30px',
            verticalAlign: 'middle',
          }}
          id={id}
        >
          {value}
        </span>
      </KeyboardWrap>
    </div>
  )
}

export const normal = () => {
  return (
    <Page
      bottom={<div className='m-border-top m-padding-10'>bottom bottom</div>}
      tabbar={<div className='m-border-top m-padding-10'>tabbar tabbar</div>}
    >
      <div>切成移动端，否则好像有问题，暂时不知道为什么</div>
      <KeyboardInput id='one' value={numStore.one} />
      <KeyboardInput id='two' value={numStore.two} />
      <KeyboardInput id='three' value={numStore.three} />
    </Page>
  )
}

// const initList = numStore.data
export const func = () => {
  const _list = _.cloneDeep(numStore.data)
  const [list, setList] = useState(_list)
  const [value, setValue] = useState('')
  const [currentActive, setCurrentActive] = useState(null)

  const handleNextItem = () => {
    const activeIndex = _.findIndex(list, (item) => item.id === currentActive)
    let newIndex = activeIndex + 1
    if (activeIndex === list.length - 1) newIndex = activeIndex
    document.getElementById(list[newIndex].id).focus()
    // 已输入的值是确定的
    numStore.setData(list)
  }

  const handleLastItem = () => {
    const activeIndex = _.findIndex(list, (item) => item.id === currentActive)
    let newIndex = activeIndex - 1
    if (activeIndex === 0) newIndex = activeIndex
    document.getElementById(list[newIndex].id).focus()
    // 已输入的值是确定的
    numStore.setData(list)
  }

  const handleChange = (index, value) => {
    const new_list = list.slice()
    new_list[index].value = value
    setList(new_list)
  }

  const handleCancel = () => {
    const activeIndex = _.findIndex(list, (item) => item.id === currentActive)
    handleChange(activeIndex, _list[activeIndex].value)
  }

  return (
    <Page
      bottom={
        <KeyboardFuncBox
          onNextItem={handleNextItem}
          onLastItem={handleLastItem}
          onCancel={handleCancel}
        />
      }
      tabbar={<div className='m-border-top m-padding-10'>tabbar tabbar</div>}
    >
      <div>切成移动端，否则好像有问题，暂时不知道为什么</div>
      <div style={{ height: '400px' }} />
      <KeyboardInput
        id='one'
        value={list[0].value}
        useFuncBar
        onFocus={() => setCurrentActive('one')}
        onChange={(v) => handleChange(0, v)}
      />
      <KeyboardInput
        id='two'
        value={list[1].value}
        useFuncBar
        onFocus={() => setCurrentActive('two')}
        onChange={(v) => handleChange(1, v)}
      />
      <input
        id='four'
        value={value}
        onFocus={() => KeyboardStatic.hide()}
        onChange={(e) => setValue(e.target.value)}
      />
      <KeyboardInput
        id='three'
        value={list[3].value}
        useFuncBar
        onFocus={() => setCurrentActive('three')}
        onChange={(v) => handleChange(3, v)}
      />
    </Page>
  )
}

export default {
  title: '表单/Keyboard',
}
