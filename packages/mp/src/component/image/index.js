import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Image } from '@tarojs/components'
import error from './error.png'
import placeholder from './placeholder.png'

/**
 * tip：image组件默认宽度300px、高度240px
 * tip：image组件中二维码/小程序码图片不支持长按识别。仅在wx.previewImage中支持长按识别
 */
const NewImage = (props) => {
  const reloadCount = useRef(0)
  const {
    width,
    height,
    round,
    className,
    placeholder,
    error,
    style,
    onLoad,
    onError,
    ...rest
  } = props
  const [src, setSrc] = useState(props.src || placeholder)

  const handleError = (e) => {
    if (reloadCount.current < 2) {
      // 获取失败重新请求两次
      reloadCount.current++
      setTimeout(() => {
        setSrc(src + `?${Math.random()}`)
      }, 200)
    } else {
      onError && onError(e)
      setSrc(error)
    }
  }

  const handleLoad = (e) => {
    onLoad && onLoad(e)
    reloadCount.current = 0
  }

  return (
    <Image
      {...rest}
      src={src}
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

NewImage.propTypes = {
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
  /** 默认不解析 webP 格式，只支持网络资源 */
  webp: PropTypes.bool,
  /** 开启长按图片显示识别小程序码菜单 */
  showMenuByLongpress: PropTypes.bool,
  /** 是否开启懒加载, 图片懒加载，在即将进入一定范围（上下三屏）时才开始加载，需要搭配scroll-views、page使用 */
  lazyLoad: PropTypes.bool,
  /** 图片裁剪、缩放的模式 */
  mode: PropTypes.string,
}

NewImage.defaultProps = {
  placeholder: placeholder,
  error: error,
}

const ImageMP = (props) => <NewImage key={props.src} {...props} />
ImageMP.propTypes = NewImage.propTypes

export default ImageMP
