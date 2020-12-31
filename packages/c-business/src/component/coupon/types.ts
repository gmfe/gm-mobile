import { HTMLAttributes, ReactNode } from 'react'

interface CouponProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'default' | 'vip'
  /** 折扣金额货币符号 */
  currency: string
  /** 折扣金额 */
  discount: number
  /** 满减说明 */
  totalInfo?: string
  /** 优惠券标签展示文字，不传不展示标签 */
  labels?: string[]
  /** 优惠券标题 */
  title?: string
  /** 是否有使用说明 */
  hasUseInfo?: boolean
  /** 优惠券使用说明 */
  useInfo?: ReactNode
  /** 使用日期说明 */
  dateInfo?: string | ReactNode
  /** 立即使用回调函数 */
  onUse?: () => void
  /** 不可用状态 */
  disabled?: boolean
  /** 优惠券的勾选状态 */
  checked?: boolean
  /** 优惠券勾选回调函数 */
  onCheck?: () => void
  /** 优惠券是否过期 */
  isExpired?: boolean
  /** 优惠券是否已使用 */
  isUsed?: boolean
  /** 使用回调函数 */
  onReceived?: () => void
  /** 优惠券数量 */
  couponAmount?: number
}

interface LabelsProps {
  /** 优惠券标签展示文字，必传，不考虑为空的情况 */
  labels: string[]
}

interface ReceivedCouponProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'default' | 'vip'
  /** 折扣金额货币符号 */
  currency: string
  /** 折扣金额 */
  discount: string
  /** 可领的优惠券数量 */
  couponAmount?: number
  /** 满减说明 */
  totalInfo?: string
  /** 领取状态 */
  isReceived?: boolean
  /** 领取回调函数 */
  onReceived?: () => void
}

export type { CouponProps, LabelsProps, ReceivedCouponProps }
