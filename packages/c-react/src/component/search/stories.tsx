import React from 'react'
import Search from './search'
import SearchPage from './page'
import FakeSearch from './fake_search'
import { Flex } from '../flex'
import { View } from '../view'
import { Button } from '../button'
import { observable } from 'mobx'

const store = observable({
  value: '',
  searchValue: '', // 搜索结果用的值
  active: false,
  setValue(value: string) {
    this.value = value
  },
  setActive(active: boolean) {
    this.active = active
  },
  setSearchValue(value: string) {
    this.searchValue = value
  },
})

export const normal = () => {
  return (
    <View>
      <View>带搜索按钮 （一般一个路由承载的搜索页）</View>
      <View>
        <Search
          placeholder='在站内搜索'
          value={store.value}
          autoFocus
          onChange={(value) => store.setValue(value)}
          onSearch={(value) => console.log('搜索拉', value)}
        />
      </View>
    </View>
  )
}

export const cancel = () => {
  return (
    <View>
      <View>带取消按钮（点Header的搜索按钮）</View>
      <View>
        <Search
          type='cancel'
          placeholder='在站内搜索'
          value={store.value}
          onChange={(value) => store.setValue(value)}
          onCancel={() => console.log('cancel')}
        />
      </View>
    </View>
  )
}

export const fakeSearch = () => {
  return (
    <View>
      <FakeSearch
        placeholder='站内搜索'
        className='text-center'
        onClick={() => {}}
      />
      center
      <FakeSearch center />
      light
      <FakeSearch light />
    </View>
  )
}

export const searchPage = () => {
  return (
    <SearchPage
      header={
        <Flex
          justifyBetween
          className='m-bg-primary m-padding-lr-15'
          style={{
            height: '50px',
            lineHeight: '50px',
          }}
        >
          <View className='m-text-white'>返回</View>
          <View
            className='m-text-white m-cursor-pointer'
            onClick={() => {
              // 同时初始化下搜索数据
              store.setActive(true)
              store.setValue('')
              store.setSearchValue('')
            }}
          >
            搜索
          </View>
        </Flex>
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
      <View>
        输入框值:{store.value}
        <br />
        搜索值:{store.searchValue}
        <br />
        历史搜索:
        <Button
          onClick={() => {
            store.setActive(true)
            store.setValue('青菜')
            store.setSearchValue('青菜')
          }}
        >
          青菜
        </Button>
        <Button
          onClick={() => {
            store.setActive(true)
            store.setValue('黄瓜')
            store.setSearchValue('黄瓜')
          }}
        >
          黄瓜
        </Button>
      </View>
    </SearchPage>
  )
}

export default {
  title: '其他/Search',
  component: Search,
}
