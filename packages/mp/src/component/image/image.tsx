import React, { useState, useRef, useEffect, FC, CSSProperties } from 'react'
import classNames from 'classnames'
import { Image } from '@tarojs/components'
import { ImageProps as TaroImageProps } from '@tarojs/components/types/Image'
import IMAGE_ERROR from './error.png'
import IMAGE_PLACEHOLDER from './placeholder.png'

type PickType<T, K extends keyof T> = T[K]

interface ImageMPProps extends TaroImageProps {
  /** 图片高度 */
  height?: string
  /** 图片宽度 */
  width?: string
  /** 是否为圆形 */
  round?: boolean
  /** 默认占位图地址 */
  placeholder?: string
  /** 加载出错占位图 */
  error?: string
  style?: CSSProperties
  /** 图片懒加载。只针对 page 与 scroll-view 下的 image 有效
   * @default true
   * @supported weapp, swan, alipay, tt
   */
  lazyLoad?: boolean
}

/**
 * tip：image组件默认宽度300px、高度240px
 * tip：image组件中二维码/小程序码图片不支持长按识别。仅在wx.previewImage中支持长按识别
 */
const ImageMP: FC<ImageMPProps> = ({
  src,
  width,
  height,
  round,
  className,
  placeholder = IMAGE_PLACEHOLDER,
  error = IMAGE_ERROR,
  style,
  onLoad,
  onError,
  lazyLoad = true,
  ...rest
}) => {
  const reloadCount = useRef(0)
  const [pSrc, setPSrc] = useState(src || placeholder)

  useEffect(() => {
    reloadCount.current = 0
    setPSrc(src)
  }, [src])

  const handleError: PickType<ImageMPProps, 'onError'> = (e) => {
    if (reloadCount.current < 2) {
      // 获取失败重新请求两次
      reloadCount.current++
      setTimeout(() => {
        setPSrc(src + `?${Math.random()}`)
      }, 200)
    } else {
      onError && onError(e)
      setPSrc(error)
    }
  }

  const handleLoad: PickType<ImageMPProps, 'onLoad'> = (e) => {
    onLoad && onLoad(e)
    reloadCount.current = 0
  }

  return (
    <Image
      {...rest}
      src={pSrc}
      style={{
        width,
        height,
        ...style,
      }}
      onError={handleError}
      onLoad={handleLoad}
      className={classNames(className, {
        'm-image-round': round,
      })}
    />
  )
}

export default ImageMP

export type { ImageMPProps }
