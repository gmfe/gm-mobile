import React, { Component } from 'react'
import './app.less'

window.Symbol = window.Symbol || Symbol
window.Map = window.Map || Map
window.Set = window.Set || Set

Object.assign(global, {
  Array: Array,
  Date: Date,
  Error: Error,
  Function: Function,
  Math: Math,
  Object: Object,
  RegExp: RegExp,
  String: String,
  Symbol: Symbol,
  Map: Map,
  Set: Set,
  TypeError: TypeError,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
})

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
