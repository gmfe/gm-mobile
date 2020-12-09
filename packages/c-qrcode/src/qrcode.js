import React from 'react'
import PropTypes from 'prop-types'
import QRCodeReact from 'qrcode.react'

const QRCode = (props) => {
  return <QRCodeReact {...props} />
}

QRCode.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
}

QRCode.defaultProps = {
  size: 200,
  level: 'L',
}

export default QRCode
