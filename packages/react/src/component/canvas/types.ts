interface CanvasProps {
  /** 背景 */
  background?: string
  width: number
  height: number
}

interface CanvasRef {
  reset: () => void
  toBlob: (
    callback: BlobCallback,
    type?: string | undefined,
    encoderOptions?: any
  ) => void
  toDataURL: (type?: string | undefined, quality?: any) => string
}

export type { CanvasProps, CanvasRef }
