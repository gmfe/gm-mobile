import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

import View from '../view'

interface TagWrapProps {
  tag: string | ReactNode
  bottom?: boolean
  block?: boolean
  className?: string
  style?: object
}

const TagWrap: FC<TagWrapProps> = ({
  tag,
  bottom,
  block,
  className,
  children,
  ...rest
}) => {
  return (
    <View
      {...rest}
      className={classNames(
        'm-tag-wrap',
        {
          'm-tag-wrap-bottom': bottom,
          'm-tag-wrap-block': block,
        },
        className
      )}
    >
      {children}
      {tag && <View className='m-tag'>{tag}</View>}
    </View>
  )
}

export default TagWrap
