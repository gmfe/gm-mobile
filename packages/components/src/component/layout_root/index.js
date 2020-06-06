import React from 'react'
import _noop from 'lodash/noop'
import View from '../view'
import { is } from '@gm-mobile/tool'
import getPath from './get_path'

const TYPE = {
  INNERLAYER: 'innerLayer',
  POPUP: 'popup',
  PICKER: 'picker',
  KEYBOARD: 'keyboard', // 和 picker 平级
  MODAL: 'modal',
  TOAST: 'toast',
  NPROGRESS: 'nprogress',
}

const cbMap = {}

class LayoutRoot extends React.Component {
  constructor(props) {
    super(props)

    this.path = getPath()

    this.state = {
      innerLayer: null,
      popup: null,
      picker: null,
      keyboard: null,
      modal: null,
      toast: null,
      nprogress: null,
    }
  }

  componentDidMount() {
    cbMap[this.path] = (type, component) => {
      this.setState({
        [type]: component,
      })
    }
  }

  componentWillUnmount() {
    cbMap[this.path] = null
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
        {this.state.nprogress}
      </View>
    )
  }
}

LayoutRoot.TYPE = TYPE

LayoutRoot.setComponent = (type, com) => {
  const path = getPath()
  if (cbMap[path]) {
    cbMap[path](type, com)
  } else {
    console.warn('LayoutRoot is uninitialized')
  }
}

LayoutRoot.removeComponent = (type) => {
  LayoutRoot.setComponent(type, null)
}

// 这种写法 附带 History 功能
LayoutRoot.renderWith = (type, Component, options) => {
  options = Object.assign({ onPopStateCallback: _noop }, options)

  LayoutRoot.setComponent(type, Component)

  // 小程序没有 history，也不需要
  if (!is.weApp()) {
    const popstate = (e) => {
      const typeStack = [
        TYPE.INNERLAYER,
        TYPE.POPUP,
        TYPE.PICKER,
        TYPE.KEYBOARD,
        TYPE.MODAL,
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

    window.history.pushState({ type }, null)
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
