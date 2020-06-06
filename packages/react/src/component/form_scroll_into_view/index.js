import React from 'react'
import { findDOMNode } from 'react-dom'
import { is } from '@gm-mobile/tool'

class FormScrollIntoView extends React.Component {
  __mounted = false

  componentWillUnmount() {
    this.__mounted = true
  }

  handleFocus = () => {
    const { onFocus } = this.props.children.props

    onFocus && onFocus()

    if (!is.iOS()) {
      setTimeout(() => {
        if (!this.__mounted) {
          const target = findDOMNode(this)
          target.scrollIntoViewIfNeeded()
        }
      }, 500)
    }
  }

  render() {
    return React.cloneElement(this.props.children, {
      onFocus: this.handleFocus,
    })
  }
}

export default FormScrollIntoView
