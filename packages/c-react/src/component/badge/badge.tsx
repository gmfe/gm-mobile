import React, { CSSProperties, FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { View } from '../view'

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** 徽章显示的数字 */
  count?: number
  /** 是否仅显示红点 */
  dot?: boolean
  /** 是否在子元素右上角显示徽章数 */
  corner?: boolean
  /** 徽章显示的最大数值 */
  overflowCount?: number
  /** 是否显示 '+' 表示数值溢出 */
  showOverflow?: boolean
  className?: string
  style?: CSSProperties
}

const Badge: FC<BadgeProps> = (props) => {
  const {
    children,
    count,
    className,
    corner = false,
    dot = false,
    overflowCount = 99,
    showOverflow = false,
    ...rest
  } = props

  const badgeCls = classNames('m-badge', className)

  const textCls = classNames({
    'm-badge-dot': dot,
    'm-badge-text': !dot,
    'm-badge-round': !showOverflow && overflowCount < 100,
    'm-badge-corner': corner,
  })

  let displayText = !dot ? count : ''

  if (count && count > overflowCount) {
    displayText = overflowCount + (showOverflow ? '+' : '')
  }

  return (
    <View {...rest} className={badgeCls}>
      {children}
      <View className={textCls}>{displayText}</View>
    </View>
  )
}

export default Badge
export type { BadgeProps }
