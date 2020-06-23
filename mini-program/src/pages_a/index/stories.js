import React, { useEffect, useMemo } from 'react'
import { useRouter } from '@tarojs/taro'
import { Observer } from 'mobx-react'
import { View, PageMP } from '../../../../packages/mp/src'

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
    if (packageName === 'qrcode') {
      return require(`../../../../packages/qrcode/src/stories`)
    }
    if (packageName === 'business-components') {
      return require(`../../../../packages/business-components/src/component/${folder}/stories`)
    }
    return require(`../../../../packages/mp/src/component/${folder}/stories`)
  }, [])

  return (
    <PageMP>
      <Observer>
        {() => {
          return stories[store] && stories[store]()
        }}
      </Observer>
    </PageMP>
  )
}

export default Stories
