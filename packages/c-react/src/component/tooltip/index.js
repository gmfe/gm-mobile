import React from 'react'
import PropTypes from 'prop-types'

import Popup from '../popup'
import { View } from '../view'

const Tooltip = ({ title, content, onClick, children }) => {
  const handleClick = (e) => {
    Popup.render({
      title,
      bottom: true,
      children: <View style={{ minHeight: '100px' }}>{content}</View>,
      onHide: Popup.hide,
    })

    onClick && onClick(e)
  }

  return React.cloneElement(children, {
    onClick: handleClick,
  })
}

Tooltip.propTypes = {
  title: PropTypes.string,
  content: PropTypes.element.isRequired,
}

export default Tooltip
