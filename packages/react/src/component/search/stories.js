import React from 'react'
import Search from './search'
import SearchPage from './page'
import FakeSearch from './fake_search'
import Header from '../header'
import Flex from '../flex'
import { observable } from 'mobx'

const store = observable({
  value: '',
  searchValue: '', // 搜索结果用的值
  active: false,
  setValue(value) {
    this.value = value
  },
  setActive(active) {
    this.active = active
  },
  setSearchValue(value) {
    this.searchValue = value
  },
})

export const normal = () => {
  return (
    <div>
      <h3>带搜索按钮 （一般一个路由承载的搜索页）</h3>
      <div className='m-bg-back'>
        <Search
          placeholder='在站内搜索'
          value={store.value}
          onChange={(value) => store.setValue(value)}
          onSearch={(value) => console.log('搜索拉', value)}
        />
      </div>
    </div>
  )
}

export const light = () => {
  return (
    <div>
      <h3>深色</h3>
      <Search
        light
        placeholder='在站内搜索'
        value={store.value}
        onChange={(value) => store.setValue(value)}
      />
    </div>
  )
}

export const cancel = () => {
  return (
    <div>
      <h3>带取消按钮（点Header的搜索按钮）</h3>
      <div className='m-bg-back'>
        <Search
          type={'cancel'}
          placeholder='在站内搜索'
          value={store.value}
          onChange={(value) => store.setValue(value)}
          onCancel={() => console.log('cancel')}
        />
      </div>
    </div>
  )
}

export const fakeSearch = () => {
  return (
    <div className='m-bg-back'>
      <FakeSearch
        placeholder='站内搜索'
        className='text-center'
        onClick={() => {}}
      />
      <FakeSearch center />
      <FakeSearch light placeholder='啦啦' />
    </div>
  )
}

export const searchPage = () => {
  return (
    <SearchPage
      header={
        <Header
          title='demo'
          right={
            <Flex
              alignCenter
              className='m-padding-lr-15'
              onClick={() => {
                // 同时初始化下搜索数据
                store.setActive(true)
                store.setValue('')
                store.setSearchValue('')
              }}
            >
              搜索
            </Flex>
          }
        />
      }
      active={store.active}
      value={store.value}
      onChange={(value) => store.setValue(value)}
      onSearch={() => {
        console.log('搜索拉')
        store.setSearchValue(store.value)
      }}
      onCancel={() => {
        console.log(store.searchValue)
        store.setActive(false)
        store.setValue(store.searchValue)
      }}
    >
      <div>
        输入框值:{store.value}
        <br />
        搜索值:{store.searchValue}
        <br />
        历史搜索:
        <button
          onClick={() => {
            store.setActive(true)
            store.setValue('青菜')
            store.setSearchValue('青菜')
          }}
        >
          青菜
        </button>
        <button
          onClick={() => {
            store.setActive(true)
            store.setValue('黄瓜')
            store.setSearchValue('黄瓜')
          }}
        >
          黄瓜
        </button>
      </div>
    </SearchPage>
  )
}

export default {
  title: '其他/Search',
}
