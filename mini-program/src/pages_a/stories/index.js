import React, { useEffect, useMemo } from 'react'
import { useRouter } from '@tarojs/taro'
import { Observer } from 'mobx-react'
import { PageMP } from '../../../../packages/mp'

const Index = () => {
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
    if (packageName === 'c-react') {
      return require(`../../../../packages/c-react/src/component/${folder}/stories`)
    }
    if (packageName === 'c-qrcode') {
      return require(`../../../../packages/c-qrcode/src/stories`)
    }
    if (packageName === 'c-business') {
      return require(`../../../../packages/c-business/src/component/${folder}/stories`)
    }
    if (packageName === 'c-cookie') {
      return require(`../../../../packages/c-cookie/src/stories`)
    }
    if (packageName === 'c-service-time') {
      return require(`../../../../packages/c-service-time/src/component/stories`)
    }
    if (packageName === 'c-tool') {
      return require(`../../../../packages/c-tool/src/${folder}/stories`)
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

export default Index
