import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  memo,
} from 'react'
import { CanvasProps, CanvasRef } from './types'

const mapHandle: { [key: string]: any } = {
  touchstart: 'mousedown',
  touchmove: 'mousemove',
  touchend: 'mouseup',
}

// 水平居中
const containImg = (
  sx: number,
  sy: number,
  box_w: number,
  box_h: number,
  source_w: number,
  source_h: number
) => {
  let dx = sx
  const dy = sy
  let dWidth = box_w
  let dHeight = box_h
  if (source_h / source_w < box_h / box_w) {
    dHeight = (source_h * box_w) / source_w
  } else if (source_h / source_w > box_h / box_w) {
    dWidth = (source_w * box_h) / source_h
    dx = sx + (box_w - dWidth) / 2
  }
  return {
    dx,
    dy,
    dWidth,
    dHeight,
  }
}

const initCanvas = (canvas: HTMLCanvasElement, image = '') => {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.lineCap = 'butt'
    ctx.lineJoin = 'miter'
    ctx.shadowBlur = 0
    ctx.shadowColor = 'fully-transparent black'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  if (image) {
    const img = new window.Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    img.src = image
    img.onload = function () {
      const { width, height } = img
      const { width: cWidth, height: cHeight } = canvas
      const { dx, dy, dWidth, dHeight } = containImg(
        0,
        0,
        cWidth,
        cHeight,
        width,
        height
      )
      ctx && ctx.drawImage(img, dx, dy, dWidth, dHeight)
    }
  }
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { background } = props
  useImperativeHandle(ref, () => ({
    reset: () => {
      const canvas = canvasRef.current
      canvas && initCanvas(canvas, props.background)
    },
    toBlob: (callback, type, encoderOptions) => {
      return canvasRef?.current?.toBlob(callback, type, encoderOptions)
    },
    toDataURL: (type, encoderOptions) => {
      if (canvasRef && canvasRef.current) {
        return canvasRef.current.toDataURL(type, encoderOptions)
      }
      return ''
    },
  }))

  useEffect(() => {
    const handleStart = () => {
      const canvas = canvasRef.current
      const cxt = canvas?.getContext('2d')
      if (cxt) {
        cxt.beginPath()
        cxt.lineCap = 'round'
        cxt.lineJoin = 'round'
        cxt.shadowBlur = 1
        cxt.shadowColor = '#000'
      }
      canvas &&
        canvas.addEventListener(getEventHandle('touchmove'), handleMove, false)
      canvas &&
        canvas.addEventListener(getEventHandle('touchend'), handleEnd, false)
    }

    const handleMove = (event: TouchEvent) => {
      event.preventDefault()
      const isSupportTouch = 'ontouchstart' in window
      const evt = isSupportTouch ? event.touches[0] : event
      const canvas = canvasRef.current
      const coverPos = canvas?.getBoundingClientRect()
      const cxt = canvas?.getContext('2d')
      if (coverPos) {
        const mouseX = (evt as Touch).clientX - coverPos.left
        const mouseY = (evt as Touch).clientY - coverPos.top
        cxt && cxt.lineTo(mouseX, mouseY)
        cxt && cxt.stroke()
      }
    }

    const handleEnd = (event: TouchEvent) => {
      event.preventDefault()
      const canvas = canvasRef.current
      canvas &&
        canvas.removeEventListener(
          getEventHandle('touchmove'),
          handleMove,
          false
        )
      canvas &&
        canvas.removeEventListener(getEventHandle('touchend'), handleEnd, false)
    }

    const canvas = canvasRef.current
    canvas && initCanvas(canvas, background)
    canvas &&
      canvas.addEventListener(getEventHandle('touchstart'), handleStart, false)
    return () => {
      canvas &&
        canvas.removeEventListener(
          getEventHandle('touchstart'),
          handleStart,
          false
        )
    }
  }, [canvasRef, background])

  const getEventHandle = (str: string) => {
    if (`on${str}` in window) {
      return str
    } else {
      return mapHandle[str]
    }
  }

  const isCanvasSupported = () => {
    const elem = document.createElement('canvas')
    return !!(elem.getContext && elem.getContext('2d'))
  }
  return (
    <div style={{ fontSize: 0 }}>
      {isCanvasSupported() ? (
        <canvas ref={canvasRef} width={props.width} height={props.height} />
      ) : (
        '对不起，当前浏览器暂不支持此功能！'
      )}
    </div>
  )
})

export default memo(Canvas)
