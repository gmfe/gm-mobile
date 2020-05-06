import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { getLocale } from '@gm-mobile/locales'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import Loading from '../loading'
import _ from 'lodash'

const PULL_DOWN_STATUS = {
  BEFORE: -1,
  ING: 0,
  AFTER: 1,
}

const ListPullUpDown = (props) => {
  const [pullDownStatus, setPullDownStatus] = useState(PULL_DOWN_STATUS.BEFORE)
  const bScrollRef = useRef(null)
  const {
    pullDownView,
    pullUpView,
    onPullDown,
    onPullUp,
    options,
    pullDownEnable,
    pullUpEnable,
    children,
  } = props

  const handlePullDown = async () => {
    setPullDownStatus(PULL_DOWN_STATUS.ING)
    await onPullDown()
    setPullDownStatus(PULL_DOWN_STATUS.AFTER)
    bScrollRef.current.finishPullDown()
    bScrollRef.current.refresh()
    setTimeout(() => {
      setPullDownStatus(PULL_DOWN_STATUS.BEFORE)
    }, 800)
  }

  const handlePullUp = async () => {
    await onPullUp()
    bScrollRef.current.finishPullUp()
    bScrollRef.current.refresh()
  }

  const renderTopView = () => (
    <>
      {pullDownStatus === PULL_DOWN_STATUS.BEFORE && getLocale('下拉刷新')}
      {pullDownStatus === PULL_DOWN_STATUS.ING && (
        <Loading>{getLocale('加载中')}</Loading>
      )}
      {pullDownStatus === PULL_DOWN_STATUS.AFTER && getLocale('加载完成')}
    </>
  )

  const renderBottomView = () => <Loading>{getLocale('加载中')}</Loading>

  useEffect(() => {
    pullDownEnable && BScroll.use(PullDown)
    pullUpEnable && BScroll.use(Pullup)
    bScrollRef.current = new BScroll('.m-pull-up-down', {
      scrollY: true,
      bounceTime: 800,
      click: true,
      pullDownRefresh: {
        threshold: 60,
      },
      pullUpLoad: true,
      ...options,
    })
    bScrollRef.current.on('pullingDown', handlePullDown)
    bScrollRef.current.on('pullingUp', handlePullUp)
  }, [])

  return (
    <div className='m-pull-up-down'>
      <div className='m-pull-up-down-scroller'>
        <div className='m-pull-down-wrapper'>
          {pullDownEnable && (pullDownView || renderTopView())}
        </div>
        <div>{children}</div>
        <div className='m-pull-up-wrapper'>
          {pullUpEnable && (pullUpView || renderBottomView())}
        </div>
      </div>
    </div>
  )
}

ListPullUpDown.propTypes = {
  /** 下拉顶部视图 */
  pullDownView: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** 上拉底部视图 */
  pullUpView: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** 触发下拉事件 */
  onPullDown: PropTypes.func,
  /** 触发上拉事件 */
  onPullUp: PropTypes.func,
  /** 上拉事件是否可用 */
  pullUpEnable: PropTypes.bool,
  /** 下拉事件是否可用 */
  pullDownEnable: PropTypes.bool,
  /** bScroll 配置项 */
  options: PropTypes.object,
}

ListPullUpDown.defaultProps = {
  onPullDown: _.noop,
  onPullUp: _.noop,
  pullDownEnable: true,
  pullUpEnable: true,
}

export default ListPullUpDown
