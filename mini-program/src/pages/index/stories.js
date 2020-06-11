import React, { useEffect, useMemo } from 'react'
import { useRouter } from '@tarojs/taro'
import { Observer } from 'mobx-react'
import { View, Page, LayoutRoot } from '../../../../packages/mp/src/index'
import queryString from 'query-string'

const Stories = () => {
  const {
    params: { packageName, root, component, store, folder },
  } = useRouter()

  useEffect(() => {
    // eslint-disable-next-line
    wx.setNavigationBarTitle({
      title: `${decodeURI(root)}/${component} - ${store}`,
    })
  })

  const stories = useMemo(() => {
    if (packageName === 'components') {
      return require(`../../../../packages/components/src/component/${folder}/stories`)
    }
    return require(`../../../../packages/mp/src/component/${folder}/stories`)
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
