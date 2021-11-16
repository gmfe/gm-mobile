import { EventProps, ITouchEvent } from '@tarojs/components'
import { clamp } from 'lodash'
import React, {
  CSSProperties,
  FC,
  MouseEvent,
  useEffect,
  useState,
} from 'react'
import { View } from '../view'

/** 是否小程序端 */
// @ts-ignore
const mp = !!window.wx

let start: EventProps['onTouchStart']
let move: EventProps['onTouchMove']
let end: EventProps['onTouchEnd']

/** 来自父组件的主动cancel，因为本组件无法百分比捕捉到touchEnd事件 */
export const cancelDrag = (e: any) => {
  end && end(e)
}

interface DraggableProps {
  width: string
  height: string
  /** 初始left值 */
  defaultLeft?: number
  /** 初始top值 */
  defaultTop?: number
  /** 上面收紧多少 */
  marginTop?: number
  /** 右边收紧多少 */
  marginRight?: number
  /** 下边收紧多少 */
  marginBottom?: number
  /** 左边收紧多少 */
  marginLeft?: number
  /** 只能垂直移动 */
  vertical?: boolean
  /** 只能水平移动 */
  horizontal?: boolean
  /** 默认左边 */
  left?: boolean
  /** 默认右边 */
  right?: boolean
  /** 默认上边 */
  top?: boolean
  /** 默认下边 */
  bottom?: boolean
  /** 默认中间 */
  center?: boolean
  /** 开始移动 */
  onBegin?: (e: ITouchEvent<any>) => void
  /** 结束移动 */
  onEnd?: (e: ITouchEvent<any>) => void
  /** 自动贴边 */
  autoCling?: boolean
}

export const Draggable: FC<DraggableProps> = ({
  defaultLeft = 0,
  defaultTop = 0,
  marginLeft = 0,
  marginRight = 0,
  marginBottom = 0,
  marginTop = 0,
  vertical = false,
  horizontal = false,
  left = false,
  right = false,
  top = false,
  bottom = false,
  center = false,
  onBegin,
  onEnd,
  width,
  height,
  autoCling,
  children,
}) => {
  const w = parseInt(width)
  const h = parseInt(height)
  const { screenWidth: screenW, screenHeight: screenH } = mp
    ? wx.getSystemInfoSync()
    : {
        screenWidth: document.body.clientWidth,
        screenHeight: document.body.clientHeight,
      }
  const [state, setState] = useState({
    moving: false,
    left: defaultLeft,
    top: defaultTop,
    width: width,
    height: height,
    screenW,
    screenH,
    transition: '',
  })

  const setPosition = (left: number, top: number, direction = false) => {
    let newLeft: number
    let newTop: number
    if (!direction && vertical) {
      newLeft = state.left
    } else {
      newLeft = clamp(left, 0 + marginLeft, state.screenW - w - marginRight)
    }
    if (!direction && horizontal) {
      newTop = state.top
    } else {
      newTop = clamp(top, 0 + marginTop, state.screenH - h - marginBottom)
    }
    setState((state) => {
      return {
        ...state,
        left: newLeft,
        top: newTop,
      }
    })
  }

  useEffect(() => {
    let x = state.left
    let y = state.top
    if (left) {
      x = -1
      if (center) {
        y = state.screenH / 2 - h / 2
      }
    }
    if (top) {
      y = -1
      if (center) {
        x = state.screenW / 2 - w / 2
      }
    }
    if (right) {
      x = 99999
      if (center) {
        x = 99999
        y = state.screenH / 2 - h / 2
      }
    }
    if (bottom) {
      y = 99999
      if (center) {
        x = state.screenW / 2 - w / 2
      }
    }
    setPosition(x, y, true)
  }, [])
  start = (e: ITouchEvent<any>) => {
    e.stopPropagation()
    setState((state) => ({ ...state, moving: true }))
    onBegin && onBegin(e)
  }
  move = (e: ITouchEvent<any>) => {
    e.stopPropagation()
    const { pageX: x, pageY: y } = e.touches[0]
    setPosition(x - w / 2, y - h / 2)
  }
  end = (e: ITouchEvent<any>) => {
    setState((state) => ({ ...state, moving: false }))
    onEnd && onEnd(e)
    if (autoCling) {
      const duration = 300
      const x = state.left + parseInt(state.width) / 2
      if (!state.transition) {
        setState((state) => ({
          ...state,
          transition: `all ${duration / 1000}s`,
        }))
      }
      if (x < state.screenW / 2) {
        setPosition(-1, state.top)
      } else {
        setPosition(99999, state.top)
      }
      setTimeout(() => {
        setState((state) => ({ ...state, transition: '' }))
      }, duration)
    }
  }

  const style: CSSProperties = {
    position: 'fixed',
    left: state.left,
    top: state.top,
    width,
    height,
    overflow: 'visible',
    transition: state.transition,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    zIndex: 2,
  }
  const options: any = mp
    ? {
        catchMove: true,
        onTouchStart: start,
        onTouchMove: move,
        onTouchEnd: end,
        onTouchCancel: end,
      }
    : {
        onTouchStart: start,
        onMouseDownCapture: start,
        onMouseMoveCapture: (e: MouseEvent) => {
          if (!state.moving) return
          if (!mp) e.persist()
          e.stopPropagation()
          const { pageX: x, pageY: y } = e
          setPosition(x - w / 2, y - h / 2)
        },
        onTouchMove: move,
        onMouseUpCapture: end,
        onTouchEnd: end,
      }

  return (
    <View className='draggable' style={style} {...options}>
      {children}
    </View>
  )
}

export default Draggable
