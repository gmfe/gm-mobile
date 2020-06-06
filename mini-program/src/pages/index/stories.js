import React, { useEffect, useMemo } from 'react'
import { useRouter } from '@tarojs/taro'
import { Observer } from 'mobx-react'
import { View, Page, LayoutRoot } from '../../../../packages/mp/src/index'

const Stories = () => {
  const {
    params: { packageName, root, component, store },
  } = useRouter()

  useEffect(() => {
    // eslint-disable-next-line
    wx.setNavigationBarTitle({
      title: `${decodeURI(root)}/${component} - ${store}`,
    })
  })

  const stories = useMemo(() => {
    const dir = component.toLocaleLowerCase()
    if (packageName === 'components') {
      return require(`../../../../packages/components/src/component/${dir}/stories`)
    }
    return require(`../../../../packages/mp/src/component/${dir}/stories`)
  }, [])

  return (
    <View>
      <Page>
        <Observer>
          {() => {
            return stories[store] && stories[store]()
          }}
        </Observer>
      </Page>
      <LayoutRoot />
    </View>
  )
}

export default Stories
