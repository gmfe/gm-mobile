import React from 'react'
import { View, Button } from '../../../../packages/mp'
import { observable } from 'mobx'
import { Observer } from 'mobx-react'

const store = observable({
  count: 0,
  addCount() {
    this.count += 1
  },
})

const Index = () => {
  return (
    <View>
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
            </View>
          )
        }}
      </Observer>
    </View>
  )
}

export default Index
