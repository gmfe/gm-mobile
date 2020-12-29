interface QRCodeProps {
  value: string
  level?: 'L' | 'M' | 'Q' | 'H'
  size?: number
}

interface LevelMapProps {
  L: number
  M: number
  Q: number
  H: number
}

export type { QRCodeProps, LevelMapProps }
