import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  FC,
  memo,
} from 'react'
import _ from 'lodash'
import { Events } from '@gm-mobile/c-tool'

import { View } from '../view'
import EVENT_TYPE from '../../event_type'
import { ScrollIntoView } from '../scroll_into_view'
import { VListItemProps, VListProps, VListRef } from './types'

const Item: FC<VListItemProps> = memo(
  ({
    itemId,
    itemHeight,
    itemIndex,
    scrollEventName,
    distance,
    listHeight,
    children,
  }) => {
    const [show, setShow] = useState(false)
    const refShow = useRef(false)

    useEffect(() => {
      const doLazy = (event: CustomEvent<{ scrollTop: number }>): void => {
        const { scrollTop } = event.detail
        if (
          (itemIndex + 2) * itemHeight < scrollTop - distance ||
          itemIndex * itemHeight > scrollTop + listHeight + distance
        ) {
          // unshow
          if (refShow.current === true) {
            refShow.current = false
            setShow(false)
          }
        } else {
          // show
          if (refShow.current === false) {
            refShow.current = true
            setShow(true)
          }
        }
      }

      Events.add(scrollEventName, doLazy)

      // 初始偏移值默认为0
      Events.dispatch(scrollEventName, { scrollTop: 0 })
      return (): void => {
        Events.remove(scrollEventName, doLazy)
      }
    }, [])

    return (
      <View style={{ height: `${itemHeight}px` }} id={itemId}>
        {show && children}
      </View>
    )
  }
)

export const VList = forwardRef<VListRef, VListProps>(
  (
    {
      data,
      renderItem,
      itemHeight,
      itemKey = (data: { item: any; index: number }) => {
        return _.toString(data.index)
      },
      style,
      height,
      onScroll = _.noop,
      delay = 100,
      distance = 100,
      onScrollToKey,
      bottomNode,
      ...rest
    },
    ref
  ) => {
    const [scrollTargetId, setScrollTargetId] = useState('')
    // 保证唯一性
    const tag = useRef((Math.random() + '').slice(2))
    const SCROLL_EVENT = `${EVENT_TYPE.V_LIST_SCROLL}_${tag.current}`
    const SCROLL_ITEM = `m-v-list-item-${tag.current}`

    useImperativeHandle(ref, () => ({
      apiDoScrollToKey: (key: string) => {
        setScrollTargetId(`${SCROLL_ITEM}-${key}`)
      },
    }))

    // 保持不变
    const doLazy = useRef(
      _.throttle((scrollTop) => {
        const detail = { scrollTop }
        Events.dispatch(SCROLL_EVENT, detail)

        // 有定义才做，不消耗多余性能
        if (onScrollToKey) {
          const countOffset = Math.ceil(scrollTop / itemHeight)
          const currentItemKey = itemKey({
            item: data[countOffset],
            index: countOffset,
          })

          onScrollToKey(currentItemKey)
        }
      }, delay)
    )

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      onScroll(event)

      const scrollTop = (event.target as HTMLDivElement).scrollTop
      doLazy.current(scrollTop)
    }

    const s = Object.assign(
      { height, overflowY: 'auto', overflowX: 'hidden' },
      style || {}
    )

    return (
      <ScrollIntoView
        {...rest}
        onScroll={handleScroll}
        style={s}
        targetId={scrollTargetId}
      >
        {_.map(data, (item, index) => {
          const key = itemKey({ item, index })

          return (
            <Item
              key={key}
              itemHeight={itemHeight}
              itemId={`${SCROLL_ITEM}-${key}`}
              itemIndex={index}
              distance={distance}
              listHeight={height}
              scrollEventName={SCROLL_EVENT}
            >
              {renderItem({ item, index })}
            </Item>
          )
        })}
        {bottomNode}
      </ScrollIntoView>
    )
  }
)

export default memo(VList)
