import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Canvas } from '@tarojs/components'
import drawQrCode from 'weapp-qrcode'

const levelMap = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2,
}

const QRCode = ({ value, size, level }) => {
  const id = useMemo(() => Math.random(), [])

  useEffect(() => {
    drawQrCode({
      width: size,
      height: size,
      canvasId: id,
      text: value,
      correctLevel: levelMap[level],
    })
  }, [])

  return (
    <Canvas
      // type='2d'
      canvasId={id}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  )
}

QRCode.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
}

QRCode.defaultProps = {
  size: 200,
}

export default QRCode
