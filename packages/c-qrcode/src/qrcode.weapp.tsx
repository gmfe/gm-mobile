import React, { useEffect, useMemo, FC } from 'react'
import { Canvas } from '@tarojs/components'
import drawQrCode from 'weapp-qrcode'
import { LevelMapProps, QRCodeProps } from './type'

const levelMap: LevelMapProps = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2,
}

const QRCode: FC<QRCodeProps> = ({ value, size = 200, level = 'L' }) => {
  const id = useMemo(() => Math.random().toString(), [])

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

export default QRCode
