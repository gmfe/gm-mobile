declare module 'weapp-qrcode' {
  interface drawQrCodeProps {
    width: number
    height: number
    canvasId: string
    text: string
    correctLevel: number
  }

  function drawQrCode(props: drawQrCodeProps): void

  export default drawQrCode
}
