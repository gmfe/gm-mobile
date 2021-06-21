import React, { FC } from 'react'
import QRCodeReact from 'qrcode.react'
import { QRCodeProps } from './type'

export const QRCode: FC<QRCodeProps> = (props) => {
  return <QRCodeReact {...props} />
}

QRCode.defaultProps = {
  size: 200,
  level: 'L',
}

export default QRCode
