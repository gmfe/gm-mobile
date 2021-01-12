import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Image } from '@tarojs/components'
import error from './error.png'
import placeholder from './placeholder.png'

/**
 * tip：image组件默认宽度300px、高度240px
 * tip：image组件中二维码/小程序码图片不支持长按识别。仅在wx.previewImage中支持长按识别
 */
const ImageMP = ({
  src,
  width,
  height,
  round,
  className,
  placeholder,
  error,
  style,
  onLoad,
  onError,
  mode,
  ...rest
}) => {
  const reloadCount = useRef(0)
  const [pSrc, setPSrc] = useState(src || placeholder)

  useEffect(() => {
    reloadCount.current = 0
    setPSrc(src)
  }, [src])

  const handleError = (e) => {
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

  const handleLoad = (e) => {
    onLoad && onLoad(e)
    reloadCount.current = 0
  }

  return (
    <Image
      SwiperImgMP
      {...rest}
      src={pSrc}
      style={{
        width,
        height,
        ...style,
      }}
      mode={mode}
      onError={handleError}
      onLoad={handleLoad}
      className={classNames(className, {
        'm-image-round': round,
      })}
    />
  )
}

ImageMP.propTypes = {
  /** 图片地址 */
  src: PropTypes.string,
  /** 图片高度 */
  height: PropTypes.string,
  /** 图片宽度 */
  width: PropTypes.string,
  /** 是否为圆形 */
  round: PropTypes.bool,
  /** 默认占位图地址 */
  placeholder: PropTypes.string,
  /** 加载出错占位图 */
  error: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  webp: PropTypes.bool,
  showMenuByLongpress: PropTypes.bool,
  lazyLoad: PropTypes.bool,
  mode: PropTypes.string,
}

ImageMP.defaultProps = {
  placeholder: placeholder,
  error: error,
  lazyLoad: true,
}

export default ImageMP
