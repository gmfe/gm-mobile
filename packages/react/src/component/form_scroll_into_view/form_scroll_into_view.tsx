import { Component, cloneElement, ReactElement } from 'react'
import { findDOMNode } from 'react-dom'
import { is } from '@gm-mobile/c-tool'

export class FormScrollIntoView extends Component {
  __mounted = false

  componentWillUnmount() {
    this.__mounted = true
  }

  handleFocus = () => {
    const { onFocus } = (this.props.children as ReactElement).props

    onFocus && onFocus()

    if (!is.iOS()) {
      setTimeout(() => {
        if (!this.__mounted) {
          const target = findDOMNode(this)
          if (target) {
            // @ts-ignore
            target.scrollIntoViewIfNeeded()
          }
        }
      }, 500)
    }
  }

  render() {
    const { children } = this.props
    return cloneElement(children as ReactElement, {
      onFocus: this.handleFocus,
    })
  }
}

export default FormScrollIntoView
