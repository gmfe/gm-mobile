import React, { useRef, memo, FC } from 'react'
import Lazy from './lazy'
import _ from 'lodash'
import { LazyListItemProps } from './types'

const Item: FC<LazyListItemProps> = memo(
  ({ targetId, minHeight, children, ...rest }) => {
    // minHeight 不会变，提高性能
    const refStyle = useRef({
      minHeight: `${minHeight}px`,
    })
    return (
      <Lazy {...rest} style={refStyle.current} targetId={targetId}>
        {children}
      </Lazy>
    )
  }
)

export default Item
