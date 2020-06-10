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
    objectFix,
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

  const _className = classNames(className, {
    'm-image-round': round,
  })

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
      className={_className}
    />
  )
}

const MODETYPES = [
  /** 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 */
  'scaleToFill',
  /** 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 */
  'aspectFit',
  /** 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 */
  'aspectFill',
  /** 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变 */
  'widthFix',
  /** 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变 */
  'heightFix',
  /** 裁剪模式，不缩放图片，只显示图片的顶部区域 */
  'top',
  /** 裁剪模式，不缩放图片，只显示图片的底部区域 */
  'bottom',
  /** 裁剪模式，不缩放图片，只显示图片的中间区域 */
  'center',
  /** 裁剪模式，不缩放图片，只显示图片的左边区域 */
  'left',
  /** 裁剪模式，不缩放图片，只显示图片的右边区域 */
  'right',
  /** 裁剪模式，不缩放图片，只显示图片的左上边区域 */
  'top left',
  /** 裁剪模式，不缩放图片，只显示图片的右上边区域 */
  'top right',
  /** 裁剪模式，不缩放图片，只显示图片的左下边区域 */
  'bottom left',
  /** 裁剪模式，不缩放图片，只显示图片的右下边区域 */
  'bottom right',
]

const ImagePropTypes = {
  /** 图片地址 */
  src: PropTypes.string,
  /** 图片高度 */
  height: PropTypes.string,
  /** 图片宽度 */
  width: PropTypes.string,
  /** 是否为圆形 */
  round: PropTypes.bool,
  /** 填充模式 */
  objectFix: PropTypes.oneOf([
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
  ]),
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
  mode: PropTypes.oneOf(MODETYPES),
}

const ImageWrapper = (props) => <NewImage key={props.src} {...props} />

NewImage.propTypes = ImagePropTypes
ImageWrapper.propTypes = ImagePropTypes

ImageWrapper.defaultProps = {
  objectFix: 'fill',
  placeholder: placeholder,
  error: error,
}

export default ImageWrapper
