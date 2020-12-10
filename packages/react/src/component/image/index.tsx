import React, { useState, useRef, FC, CSSProperties } from 'react'
import classNames from 'classnames'

import IMAGE_ERROR from './error.png'
import IMAGE_PLACEHOLDER from './placeholder.png'

const Image: FC<ImageProps> = ({
  src,
  width,
  height,
  round,
  objectFix = 'fill',
  className,
  placeholder = IMAGE_PLACEHOLDER,
  error = IMAGE_ERROR,
  ...rest
}) => {
  const reloadCount = useRef(0)
  const [imgSrc, setImgSrc] = useState(src || placeholder)

  const handleError = () => {
    if (reloadCount.current < 2) {
      reloadCount.current++
      setTimeout(() => {
        setImgSrc(src + `?${Math.random()}`)
      }, 200)
    } else {
      setImgSrc(error)
    }
  }

  const handleLoad = () => {
    reloadCount.current = 0
  }

  const _className = classNames(`m-image-${objectFix}`, className, {
    'm-image-round': round,
  })

  return (
    <img
      {...rest}
      src={imgSrc}
      width={width}
      height={height}
      onError={handleError}
      onLoad={handleLoad}
      className={_className}
    />
  )
}

const ImageWrapper: FC<ImageProps> = (props) => (
  <Image key={props.src} {...props} />
)

export default ImageWrapper

export type objectFixTypes =
  | 'contain'
  | 'cover'
  | 'fill'
  | 'none'
  | 'scale-down'

export interface ImageProps {
  /** 图片地址 */
  src?: string
  /** 图片高度 */
  height?: number
  /** 图片宽度 */
  width?: number
  /** 是否为圆形 */
  round?: boolean
  /** 填充模式 */
  objectFix?: objectFixTypes
  /** 默认占位图地址 */
  placeholder?: string
  /** 加载出错占位图 */
  error?: string
  className?: string
  style?: CSSProperties
}
