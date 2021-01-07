import { getLocale } from '@gm-mobile/locales'
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  UIEvent,
} from 'react'
import classNames from 'classnames'
import { Flex, Loading } from '@gm-mobile/c-react'
import _ from 'lodash'
import { Lazy } from '../lazy'
import { ScrollProps, ScrollRef } from './types'

const Scroll = forwardRef<ScrollRef, ScrollProps>(
  (
    {
      data,
      renderItem,
      itemKey = ({ index }) => {
        return String(index)
      },
      onLoadMore,
      noMore,
      lazy,
      itemMinHeight,
      onScroll = _.noop,
      className,
      ...rest
    },
    ref
  ) => {
    const [loadingMore, setLoadingMore] = useState(false)
    const refScrollTop = useRef(0)
    const refList = useRef<HTMLDivElement>(null)
    const refId = useRef(Math.random() + '')

    useImperativeHandle(ref, () => ({
      apiDoScrollToKey: (key) => {
        const dom = refList.current
          ? refList.current.querySelector(`[data-key="${key}"]`)
          : null
        if (dom) {
          // @ts-ignore
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

      result
        .then(() => {
          return setLoadingMore(false)
        })
        .catch(() => {
          setLoadingMore(false)
        })
    }

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      const newTop = target.scrollTop
      const oldTop = refScrollTop.current

      refScrollTop.current = newTop

      // 向下滚动才触发
      if (newTop > oldTop && !loadingMore) {
        // 一定阈值才触发
        if (target.clientHeight + newTop + 30 + 50 >= target.scrollHeight) {
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
                  style={
                    itemMinHeight
                      ? {
                          minHeight: itemMinHeight({ item, index }),
                        }
                      : {}
                  }
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

export default Scroll
