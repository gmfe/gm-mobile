import React, { useImperativeHandle, useRef, forwardRef, memo } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { LazyListProps, ItemParams, LazyListRef, LazyListFC } from './types'
import Item from './item'

const LazyList: LazyListFC<LazyListRef, LazyListProps> = forwardRef<
  LazyListRef,
  LazyListProps
>(
  (
    {
      data,
      renderItem,
      itemMinHeight,
      itemKey = (parm: ItemParams) => {
        return parm.index
      },
      delay = 100,
      className,
      ...rest
    },
    ref
  ) => {
    const refList = useRef<HTMLDivElement>(null)
    const refId = useRef<string>('' + Math.random())

    useImperativeHandle(ref, () => ({
      apiDoScrollToKey: (key) => {
        const d = refList.current
          ? refList.current.querySelector(`[data-key="${key}"]`)
          : null
        if (d) {
          d.scrollIntoView()
        }
      },
    }))

    return (
      <div
        ref={refList}
        {...rest}
        className={classNames('m-overflow-y', className)}
        id={refId.current}
      >
        {_.map(data, (item, index) => {
          const key = itemKey({ item, index })

          return (
            <Item
              key={key}
              targetId={refId.current}
              minHeight={itemMinHeight({ item, index })}
              data-index={index}
              data-key={key}
              delay={delay}
            >
              {renderItem({ item, index })}
            </Item>
          )
        })}
      </div>
    )
  }
)

LazyList.Item = Item

export default memo(LazyList)
