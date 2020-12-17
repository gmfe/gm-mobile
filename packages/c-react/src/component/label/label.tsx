import React, { HTMLAttributes, FC } from 'react'
import classNames from 'classnames'
import { View } from '../view'

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  /** 标签显示的文字 */
  text: string
  /** 标签样式种类 */
  type?: 'default' | 'plain' | 'accent' | 'primary'
}

const Label: FC<LabelProps> = ({
  text,
  type = 'default',
  className,
  ...rest
}) => {
  return (
    <View
      {...rest}
      className={classNames('m-label', className, `m-label-${type}`)}
    >
      {text}
    </View>
  )
}

export default Label
export type { LabelProps }
