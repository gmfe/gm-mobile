import { HTMLAttributes } from 'react'

interface PriceProps extends HTMLAttributes<HTMLDivElement> {
  /** 展示数值 */
  value: number
  /** 精度， 展示几位小数 */
  precision?: number
  /** 是否使用千分符 */
  useGrouping?: boolean
  /** 货币符号的缩放大小 */
  currencyScale?: number
  /** 是否保留小数点后无效的零 */
  keepZero?: boolean
  isFenUnit?: boolean
  /** 多币种 */
  feeType?: string
}

interface PriceStaticsTypes {
  format: (value: number, isFenUnit?: boolean, formatOptions?: object) => string
  setCurrencyList: (list: []) => void
  setCurrency: (symbol: string) => void
  getCurrency: (type: string) => void
  setUnit: (unit: string) => void
  getUnit: (type: string) => void
}

export type { PriceProps, PriceStaticsTypes }
