import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Events, is } from '@gm-mobile/tool'

import View from '../view'
import EVENT_TYPE from '../../event_type'
import ScrollIntoView from '../scroll_into_view'

const Item = React.memo(
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
      const doLazy = (event) => {
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

      Events.on(scrollEventName, doLazy)

      // 初始偏移值默认为0
      doLazy({ detail: { scrollTop: 0 } })
      return () => {
        Events.off(scrollEventName, doLazy)
      }
    }, [])

    return (
      <View style={{ height: `${itemHeight}px` }} id={itemId}>
        {show && children}
      </View>
    )
  }
)

Item.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemHeight: PropTypes.number.isRequired,
  itemIndex: PropTypes.number.isRequired,
  // 内部监听事件用
  scrollEventName: PropTypes.string,
  /** 列表高度 */
  listHeight: PropTypes.number.isRequired,
  distance: PropTypes.number,
}

const VList = forwardRef(
  (
    {
      data,
      renderItem,
      itemHeight,
      itemKey,
      style,
      height,
      onScroll,
      delay,
      distance,
      onScrollToKey,
      ...rest
    },
    ref
  ) => {
    const [scrollTargetId, setScrollTargetId] = useState('')
    // 保证唯一性
    const tag = useRef((Math.random() + '').slice(2))
    const SCROLL_EVENT = `${EVENT_TYPE.V_LIST_SCROLL}_${tag.current}`
    const SCROLL_ITEM = `m-list-item-${tag.current}`

    useImperativeHandle(ref, () => ({
      apiDoScrollToKey: (key) => {
        setScrollTargetId(`${SCROLL_ITEM}-${key}`)
      },
    }))

    // 保持不变
    const doLazy = useRef(
      _.throttle((scrollTop) => {
        const detail = { scrollTop }
        Events.trigger(SCROLL_EVENT, detail)

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

    const handleScroll = (event) => {
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
              distance={distance || itemHeight}
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

VList.propTypes = {
  data: PropTypes.array.isRequired,
  /** ({item, index}) */
  renderItem: PropTypes.func.isRequired,
  /** 以固定高度计算 */
  itemHeight: PropTypes.number.isRequired,
  /** 列表高度 */
  height: PropTypes.number.isRequired,
  /** 定义item key值({item, index}) */
  itemKey: PropTypes.func,
  /** 滚动事件 */
  onScroll: PropTypes.func,
  /** 设置滚动throttle delay 参数, 默认100ms */
  delay: PropTypes.number,
  /** 定义可视区域外增加的渲染距离, 默认为itemHeight */
  distance: PropTypes.number,
  /** 设置滚动到Key事件, 参数为当前可视区域内第一个元素itemKey */
  onScrollToKey: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

VList.defaultProps = {
  itemKey: ({ item, index }) => {
    return index
  },
  onScroll: _.noop,
  delay: 100,
}

export default React.memo(VList)
