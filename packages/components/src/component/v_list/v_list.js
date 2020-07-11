import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import View from '../view'
import EVENT_TYPE from '../../event_type'

const Item = React.memo(
  ({
    itemId,
    itemHeight,
    itemIndex,
    visibleItemCount, // 列表渲染展示数据数量
    scrollEventName,
    children,
  }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
      // const target = document.getElementById(itemId)
      const doLazy = (event) => {
        const { countOffset } = event.detail
        // 通过偏移值判断是否需要展示
        if (
          itemIndex >= countOffset - 1 &&
          itemIndex <= visibleItemCount + countOffset
        ) {
          setShow(true)
        } else {
          setShow(false)
        }
      }

      window.addEventListener(scrollEventName, doLazy)

      // 初始偏移值默认为0
      doLazy({ detail: { countOffset: 0 } })
      return () => {
        window.removeEventListener(scrollEventName, doLazy)
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
  /** 列表渲染展示数据数量 */
  visibleItemCount: PropTypes.number.isRequired,
  // 内部监听事件用
  scrollEventName: PropTypes.string,
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
    // 默认当前滚动处为第一个
    let currentItemKey = itemKey({ item: data[0], index: 0 })
    // 保证唯一性
    const tag = useMemo(() => {
      return Math.random()
    }, [])
    const SCROLL_EVENT = `${EVENT_TYPE}_${tag}`
    const SCROLl_ITEM = `m-list-item-${tag}`

    useImperativeHandle(ref, () => ({
      apiDoScrollToKey: (key) => {
        const target = document.getElementById(`${SCROLl_ITEM}-${key}`)
        if (target) {
          target.scrollIntoViewIfNeeded()
        }
      },
    }))

    const handleScroll = (event) => {
      const { scrollTop } = event.target
      // 计算滑动数据量偏移
      const countOffset = Math.ceil(scrollTop / itemHeight)

      const doLazy = _.throttle((countOffset) => {
        const detail = { countOffset }
        window.dispatchEvent(new window.CustomEvent(SCROLL_EVENT, { detail }))
        currentItemKey = itemKey({
          item: data[countOffset],
          index: countOffset,
        })

        onScroll(event)
        onScrollToKey(currentItemKey)
      }, delay)

      doLazy(countOffset)
    }

    const s = Object.assign(
      { height, overflowX: 'hidden', overflowY: 'auto' },
      style || {}
    )
    const totalHeight = height + (distance || itemHeight)

    return (
      <View {...rest} onScroll={handleScroll} style={s}>
        {_.map(data, (item, index) => {
          const key = itemKey({ item, index })

          return (
            <Item
              key={key}
              itemHeight={itemHeight}
              itemId={`${SCROLl_ITEM}-${key}`}
              itemIndex={index}
              visibleItemCount={Math.ceil(totalHeight / itemHeight)}
              scrollEventName={SCROLL_EVENT}
            >
              {renderItem({ item, index })}
            </Item>
          )
        })}
      </View>
    )
  }
)

VList.Item = Item
VList.propTypes = {
  data: PropTypes.array.isRequired,
  /** ({item, index}) */
  renderItem: PropTypes.func.isRequired,
  /** 以固定高度计算 */
  itemHeight: PropTypes.number.isRequired,
  /** 列表高度, 计算当前需要渲染数据量 */
  height: PropTypes.number.isRequired,
  /** 定义item key值({item, index}) */
  itemKey: PropTypes.func,
  /** 滚动事件, 参数为 scrollTop */
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
  onScrollToKey: _.noop,
  delay: 100,
}

export default React.memo(VList)
