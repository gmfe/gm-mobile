import React from 'react'
import { LayoutRoot } from '@gm-mobile/c-react'

let timer = null
let key = null
const NProgressStatics = {
  start: function () {
    clearTimeout(timer)
    key = Math.random()
    LayoutRoot.setComponent(LayoutRoot.Type.N_PROGRESS, <NProgress key={key} />)
  },
  done: function () {
    clearTimeout(timer)
    LayoutRoot.setComponent(
      LayoutRoot.Type.N_PROGRESS,
      <NProgress key={key} percent={100} />
    )
    timer = setTimeout(function () {
      LayoutRoot.removeComponent(LayoutRoot.Type.N_PROGRESS)
    }, 250)
  },
}

class NProgress extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percent: props.percent || 0,
    }

    this.timer = null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.percent !== undefined) {
      clearTimeout(this.timer)
      this.setState({
        percent: nextProps.percent,
      })
    }
  }

  componentDidMount() {
    this.doInc()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  doInc() {
    this.timer = setTimeout(() => {
      this.setState({
        percent: this.state.percent + (100 - this.state.percent) * 0.2,
      })
      if (this.state.percent < 90) {
        this.doInc()
      }
    }, 150)
  }

  render() {
    const percent = 100 - this.state.percent
    return (
      <div
        className='m-nprogress'
        style={{ transform: 'translate3d(-' + percent + '%, 0, 0)' }}
      >
        <div className='m-nprogress-head' />
      </div>
    )
  }
}

Object.assign(NProgress, NProgressStatics)

export default NProgress
