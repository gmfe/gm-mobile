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
import { Events, is } from '@gm-mobile/c-tool'

import { View } from '../view'
import EVENT_TYPE from '../../event_type'
import { ScrollIntoView } from '../scroll_into_view'
import { VListItemProps, VListProps } from './type'

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
      const doLazy = (
        event: Event | { detail: { scrollTop: number } }
      ): void => {
        const { scrollTop } = event.detail
        if (
          (itemIndex + 1) * itemHeight < scrollTop - distance ||
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
      doLazy({ detail: { scrollTop: 0 } })
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

const VList: FC<VListProps> = forwardRef(
  (
    {
      data,
      renderItem,
      itemHeight,
      itemKey = (data: { item: any; index: number }) => {
        return data.index
      },
      style,
      height,
      onScroll = _.noop,
      delay = 100,
      distance = 100,
      onScrollToKey,
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

    const handleScroll = (event: Event) => {
      onScroll(event)

      let scrollTop = 0
      if (is.weApp()) {
        scrollTop = event.detail.scrollTop
      } else {
        scrollTop = event.target.scrollTop
      }

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
      </ScrollIntoView>
    )
  }
)

export default memo(VList)
