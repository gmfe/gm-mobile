import React, { Component, ReactNode } from 'react'
import _ from 'lodash'
import { View } from '../view'
import { is } from '@gm-mobile/c-tool'
import getPath from './get_path'
import {
  LayoutRootType,
  LayoutRootState,
  CBMapType,
  LayoutRootStaticsTypes,
  LayoutRootProps,
} from './types'

const cbMap: CBMapType = {}

class LayoutRootBase extends Component<LayoutRootProps, LayoutRootState> {
  path: string

  readonly state: LayoutRootState = {
    innerLayer: null,
    popup: null,
    picker: null,
    keyboard: null,
    modal: null,
    toast: null,
    nProgress: null,
  }

  constructor(props: LayoutRootProps) {
    super(props)

    this.path = getPath()
  }

  componentDidMount() {
    cbMap[this.path] = (type: LayoutRootType, component: null | ReactNode) => {
      this.setState({
        [type]: component,
      })
    }
  }

  componentWillUnmount() {
    delete cbMap[this.path]
  }

  render() {
    // 有层级关系
    return (
      <View>
        {this.state.innerLayer}
        {this.state.popup}
        {this.state.picker}
        {this.state.keyboard}
        {this.state.modal}
        {this.state.toast}
        {this.state.nProgress}
      </View>
    )
  }
}

const LayoutRootStatics: LayoutRootStaticsTypes = {
  setComponent(type, com) {
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
        cbMap[path](type, com)
      } else {
        console.warn('LayoutRoot is uninitialized')
      }
    }
  },
  removeComponent(type) {
    this.setComponent(type, null)
  },
  // 这种写法 附带 History 功能
  renderWith(type, component, option) {
    const options = Object.assign({ onPopStateCallback: _.noop }, option)

    this.setComponent(type, component)
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

        this.removeComponent(type)

        // 需要给个回调，响应 popstate 的情况。否则没其他办法通知回去。
        options.onPopStateCallback()

        window.removeEventListener('popstate', popstate)
      }

      window.addEventListener('popstate', popstate)

      window.history.pushState({ type }, '')
    }
  },
  hideWith(type) {
    this.removeComponent(type)

    // 小程序没有 history，也不需要
    if (!is.weApp()) {
      window.history.go(-1)
    }
  },
}

const LayoutRoot = Object.assign(LayoutRootBase, LayoutRootStatics)

export default LayoutRoot
