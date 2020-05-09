import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import LayoutRoot from '../layout_root'

const InnerLayerStatics = {
  render(props) {
    LayoutRoot.renderWith(LayoutRoot.TYPE.INNERLAYER, <InnerLayer {...props} />)
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.INNERLAYER)
  },
}

const InnerLayer = ({ className, children, ...rest }) => (
  <div
    {...rest}
    className={classNames(
      'm-inner-layer-container m-container-full',
      className
    )}
  >
    {children}
  </div>
)

Object.assign(InnerLayer, InnerLayerStatics)

InnerLayer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default InnerLayer
