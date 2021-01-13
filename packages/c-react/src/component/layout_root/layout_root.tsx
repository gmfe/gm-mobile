import React, { FC, useState, ReactNode, useEffect } from 'react'
import _ from 'lodash'
import { is } from '@gm-mobile/c-tool'

import { View } from '../view'
import getPath from './get_path'
import {
  LayoutRootType,
  LayoutRootState,
  CBMapType,
  LayoutRootStatic,
} from './types'

const cbMap: CBMapType = {}

const LayoutRoot: FC & LayoutRootStatic = () => {
  const [state, setState] = useState<LayoutRootState>({})
  const path: string = getPath()

  useEffect(() => {
    cbMap[path] = (type: LayoutRootType, component: null | ReactNode) => {
      setState((s) => ({
        ...s,
        [type]: component,
      }))
    }

    return () => {
      delete cbMap[path]
    }
  }, [])

  // 有层级关系
  return (
    <View>
      {state.innerLayer}
      {state.popup}
      {state.picker}
      {state.keyboard}
      {state.modal}
      {state.toast}
      {state.nProgress}
    </View>
  )
}

LayoutRoot.Type = LayoutRootType

LayoutRoot.setComponent = (type, com) => {
  // 说明：针对toast在切换页面后没有正常消失做清除处理
  if (type === LayoutRootType.TOAST && com === null) {
    _.forIn(cbMap, (cb) => {
      if (cb) {
        cb(type, com)
      }
    })
  } else {
    const path = getPath()
    if (cbMap[path]) {
      cbMap[path]!(type, com)
    } else {
      console.warn('LayoutRoot is uninitialized')
    }
  }
}

LayoutRoot.removeComponent = (type) => {
  LayoutRoot.setComponent(type, null)
}

// 这种写法 附带 History 功能
LayoutRoot.renderWith = (type, component, option) => {
  const options = Object.assign({ onPopStateCallback: _.noop }, option)

  LayoutRoot.setComponent(type, component)
  // 小程序没有 history，也不需要
  if (!is.weApp()) {
    const popstate = (e: any) => {
      const typeStack = [
        LayoutRootType.INNER_LAYER,
        LayoutRootType.POPUP,
        LayoutRootType.PICKER,
        LayoutRootType.KEYBOARD,
        LayoutRootType.MODAL,
      ]
      // 浮层会有很多，popstate 都会响应。 但是如果浮层之上还有其他浮层的话不应该响应。
      // 所以判断下
      if (
        e.state &&
        typeStack.indexOf(e.state.type) >= typeStack.indexOf(type)
      ) {
        return
      }

      LayoutRoot.removeComponent(type)

      // 需要给个回调，响应 popstate 的情况。否则没其他办法通知回去。
      options.onPopStateCallback()

      window.removeEventListener('popstate', popstate)
    }

    window.addEventListener('popstate', popstate)

    window.history.pushState({ type }, '')
  }
}

LayoutRoot.hideWith = (type) => {
  LayoutRoot.removeComponent(type)

  // 小程序没有 history，也不需要
  if (!is.weApp()) {
    window.history.go(-1)
  }
}

export default LayoutRoot
