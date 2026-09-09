import { Component, cloneElement, ReactElement, ReactNode } from 'react'
import { findDOMNode } from 'react-dom'
import { is } from '@gm-mobile/c-tool'

interface FormScrollIntoViewProps {
  children?: ReactNode
}

export class FormScrollIntoView extends Component<FormScrollIntoViewProps> {
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
