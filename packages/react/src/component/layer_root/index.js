import React from 'react'

const TYPE = {
  INNERLAYER: 'innerLayer',
  POPUP: 'popup',
  MODAL: 'modal',
  PICKER: 'picker',
  TOAST: 'toast',
  NPROGRESS: 'nprogress',
}

let setComponentFunc = null

class LayerRoot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      innerLayer: null,
      popup: null,
      modal: null,
      picker: null,
      toast: null,
      nprogress: null,
    }
  }

  componentDidMount() {
    setComponentFunc = (type, component) => {
      this.setState({
        [type]: component,
      })
    }
  }

  componentWillUnmount() {
    setComponentFunc = null
  }

  render() {
    // 有层级关系
    return (
      <div>
        {this.state.innerLayer}
        {this.state.popup}
        {this.state.modal}
        {this.state.picker}
        {this.state.toast}
        {this.state.nprogress}
      </div>
    )
  }
}

LayerRoot.TYPE = TYPE

/* 基础功能 */

LayerRoot.setComponent = (type, com) => {
  if (setComponentFunc) {
    LayerRoot.removeComponent(type)
    setComponentFunc(type, com)
  } else {
    console.warn('LayerRoot is uninitialized')
  }
}

LayerRoot.removeComponent = (type) => {
  if (setComponentFunc) {
    setComponentFunc(type, null)
  } else {
    console.warn('LayerRoot is uninitialized')
  }
}

LayerRoot.renderWith = (type, Component) => {
  const popstate = (e) => {
    const typeStack = [TYPE.INNERLAYER, TYPE.POPUP, TYPE.MODAL, TYPE.PICKER]
    // 代表还有其他state，即浮层，所以不采取任务逻辑
    if (e.state && typeStack.indexOf(e.state.type) >= typeStack.indexOf(type)) {
      return
    }
    LayerRoot.removeComponent(type)
    window.removeEventListener('popstate', popstate)
  }

  window.addEventListener('popstate', popstate)

  window.history.pushState({ type }, null)

  LayerRoot.setComponent(type, Component)
}

LayerRoot.hideWith = (type) => {
  LayerRoot.removeComponent(type)

  window.history.go(-1)
}

export default LayerRoot
