import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import View from '../view'
import { ScrollView } from '@tarojs/components'
import { Events } from '@tarojs/taro'

const events = new Events()
const Item = React.memo(
  ({
    itemId,
    itemHeight,
    itemIndex,
    delay,
    visibleItemCount, // 列表渲染展示数据数量
    children,
  }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
      const doLazy = _.throttle((countOffset) => {
        // 通过偏移值判断是否需要展示
        if (
          itemIndex >= countOffset - 1 &&
          itemIndex <= visibleItemCount + countOffset
        ) {
          setShow(true)
        } else {
          setShow(false)
        }
      }, delay)

      // 初始偏移值默认为0
      doLazy(0)

      events.on('scroll', doLazy)

      return () => {
        events.off('scroll', doLazy)
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
  delay: PropTypes.number,
  /** 列表渲染展示数据数量 */
  visibleItemCount: PropTypes.number.isRequired,
}

const LazyList = forwardRef(
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
      visibleItemCount,
      ...rest
    },
    ref
  ) => {
    const [scrollTargetId, setScrollTargetId] = useState('')
    // 默认当前滚动处为第一个
    let currentItemKey = itemKey({ item: data[0], index: 0 })

    useImperativeHandle(ref, () => ({
      apiDoScrollToKey: (key) => {
        const target = `m-lazy-item-${key}`
        setScrollTargetId(target)
      },
    }))

    const handleScroll = (event) => {
      const { scrollTop } = event.detail
      // 计算滑动数据量偏移
      const countOffset = Math.ceil(scrollTop / itemHeight)
      events.trigger('scroll', countOffset)
      currentItemKey = itemKey({
        item: data[countOffset],
        index: countOffset,
      })

      onScroll({ currentItemKey, scrollTop })
    }

    const s = Object.assign({ height }, style || {})

    return (
      <ScrollView
        {...rest}
        scrollY
        scrollIntoView={scrollTargetId}
        onScroll={handleScroll}
        style={s}
      >
        {_.map(data, (item, index) => {
          const key = itemKey({ item, index })

          return (
            <Item
              key={key}
              itemHeight={itemHeight}
              itemId={`m-lazy-item-${key}`}
              itemIndex={index}
              visibleItemCount={visibleItemCount || height / itemHeight + 1}
              delay={delay}
            >
              {renderItem({ item, index })}
            </Item>
          )
        })}
      </ScrollView>
    )
  }
)

LazyList.Item = Item
LazyList.propTypes = {
  data: PropTypes.array.isRequired,
  /** ({item, index}) */
  renderItem: PropTypes.func.isRequired,
  /** 以固定高度计算 */
  itemHeight: PropTypes.number.isRequired,
  /** ({item, index}) */
  itemKey: PropTypes.func,
  /** 列表高度, 计算当前需要渲染数据量 */
  height: PropTypes.number.isRequired,
  /** 滚动事件, 参数为 当前滚可视区域内第一项数据的itemKey及scrollTop,{ currentItemKey, scrollTop } */
  onScroll: PropTypes.func,
  /** 设置滚动throttle delay 参数 */
  delay: PropTypes.number,
  /** 自定义一次渲染数据量 */
  visibleItemCount: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}

LazyList.defaultProps = {
  itemKey: ({ item, index }) => {
    return index
  },
  onScroll: _.noop,
  delay: 100,
}

export default React.memo(LazyList)
