import React from 'react'
import { PageMP, Cells, Cell, View, Button } from '../../../../packages/mp'
import { observable, autorun } from 'mobx'
import { Observer } from 'mobx-react'

const store = observable({
  // 模拟订单数量
  count: 0,
  addCount() {
    this.count += 1
  },
  reduceCount() {
    this.count -= 1
  },
})

autorun(() => {
  if (store.count) {
    wx.showTabBarRedDot({
      index: 1,
    })
  } else {
    wx.hideTabBarRedDot({
      index: 1,
    })
  }
})

const Other = () => {
  return (
    <PageMP>
      <View>
        设置 Tabbar Badge
        <Observer>
          {() => {
            return (
              <View>
                <View>{store.count}</View>
                <Button
                  onClick={() => {
                    wx.setTabBarBadge({
                      index: 0,
                      text: '10',
                    })
                  }}
                >
                  set 10
                </Button>
                <Button
                  onClick={() => {
                    wx.setTabBarBadge({
                      index: 0,
                      text: 'new',
                    })
                  }}
                >
                  set new
                </Button>
              </View>
            )
          }}
        </Observer>
      </View>
      <View>
        设置 Tabbar 红点
        <Observer>
          {() => {
            return (
              <View>
                <View>{store.count}</View>
                <Button
                  onClick={() => {
                    store.addCount()
                  }}
                >
                  +1
                </Button>
                <Button
                  onClick={() => {
                    store.reduceCount()
                  }}
                >
                  -1
                </Button>
              </View>
            )
          }}
        </Observer>
      </View>

      <Cells>
        <Cell
          access
          onClick={() => {
            wx.navigateTo({
              url: '/pages_b/page/index',
            })
          }}
        >
          page
        </Cell>
        <Cell
          access
          onClick={() => {
            wx.navigateTo({
              url: '/pages_b/tabbar/index',
            })
          }}
        >
          tabbar
        </Cell>
      </Cells>
    </PageMP>
  )
}

export default Other
