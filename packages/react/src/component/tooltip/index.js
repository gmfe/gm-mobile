import React from 'react'
import PropTypes from 'prop-types'
import { Popup } from '@gm-mobile/components'

const Tooltip = ({ title, content, onClick, children }) => {
  const handleClick = (e) => {
    Popup.render({
      title,
      bottom: true,
      children: <div style={{ minHeight: '100px' }}>{content}</div>,
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
