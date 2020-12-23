import { getLocale } from '@gm-mobile/locales'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Flex, Loading } from '@gm-mobile/c-react'
import _ from 'lodash'
import { Lazy } from '../lazy'

const Scroll = forwardRef(
  (
    {
      data,
      renderItem,
      itemKey,
      onLoadMore,
      noMore,
      lazy,
      itemMinHeight,
      onScroll,
      className,
      ...rest
    },
    ref
  ) => {
    const [loadingMore, setLoadingMore] = useState(false)
    const refScrollTop = useRef(0)
    const refList = useRef(null)
    const refId = useRef(Math.random() + '')

    useEffect(() => {}, [])

    useImperativeHandle(ref, () => ({
      apiDoScrollToKey: (key) => {
        const dom = refList.current.querySelector(`[data-key="${key}"]`)
        if (dom) {
          dom.scrollIntoViewIfNeeded()
        }
      },
    }))

    const handleBottom = () => {
      // 没更多数据了，下拉没意义
      if (noMore) {
        return
      }

      setLoadingMore(true)

      const result = onLoadMore()

      result.finally(() => {
        setLoadingMore(false)
      })
    }

    const handleScroll = (e) => {
      const newTop = e.target.scrollTop
      const oldTop = refScrollTop.current

      refScrollTop.current = newTop

      // 向下滚动才触发
      if (newTop > oldTop && !loadingMore) {
        // 一定阈值才触发
        if (e.target.clientHeight + newTop + 30 + 50 >= e.target.scrollHeight) {
          handleBottom()
        }
      }

      onScroll(e)
    }

    return (
      <div
        ref={refList}
        {...rest}
        id={refId.current}
        className={classNames('m-scroll', className)}
        onScroll={handleScroll}
      >
        <div className='m-scroll-content'>
          {_.map(data, (item, index) => {
            if (lazy) {
              return (
                <Lazy
                  key={itemKey({ item, index })}
                  data-key={itemKey({ item, index })}
                  className='m-scroll-item'
                  targetId={refId.current}
                  style={{
                    minHeight: itemMinHeight({ item, index }),
                  }}
                >
                  {renderItem({ item, index })}
                </Lazy>
              )
            } else {
              return (
                <div
                  key={itemKey({ item, index })}
                  data-key={itemKey({ item, index })}
                  className='m-scroll-item'
                >
                  {renderItem({ item, index })}
                </div>
              )
            }
          })}
        </div>
        <Flex justifyCenter alignCenter style={{ height: '30px' }}>
          {loadingMore && <Loading />}
          {noMore && (
            <Flex column justifyCenter className='m-text-desc m-text-12'>
              {getLocale('没有更多了')}
            </Flex>
          )}
        </Flex>
      </div>
    )
  }
)

Scroll.propTypes = {
  data: PropTypes.array.isRequired,
  /** ({item, index}) */
  renderItem: PropTypes.func.isRequired,
  /** ({item, index}) */
  itemKey: PropTypes.func.isRequired,
  /** return promise */
  onLoadMore: PropTypes.func.isRequired,
  noMore: PropTypes.bool,
  /** item 是否lazy，如果是，需要提供 itemMinHeight */
  lazy: PropTypes.bool,
  /** ({item, index}) */
  itemMinHeight: PropTypes.func,
  onScroll: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Scroll.defaultProps = {
  onScroll: _.noop,
  itemKey: ({ item, index }) => {
    return index
  },
}

export default Scroll
