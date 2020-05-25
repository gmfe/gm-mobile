import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import error from './error.png'
import placeholder from './placeholder.jpg'

const Image = (props) => {
  const reloadCount = useRef(0)
  const {
    width,
    height,
    round,
    objectFix,
    className,
    placeholder,
    error,
    ...rest
  } = props
  const [src, setSrc] = useState(props.src || placeholder)

  const handleError = () => {
    if (reloadCount.current < 2) {
      reloadCount.current++
      setTimeout(() => {
        setSrc(src + `?${Math.random()}`)
      }, 200)
    } else {
      setSrc(error)
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
      src={src}
      width={width}
      height={height}
      onError={handleError}
      onLoad={handleLoad}
      className={_className}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  round: PropTypes.bool,
  objectFix: PropTypes.oneOf([
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
  ]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
}

const ImageWrapper = (props) => <Image key={props.src} {...props} />

ImageWrapper.propTypes = {
  /** 图片地址 */
  src: PropTypes.string,
  /** 图片高度 */
  height: PropTypes.number,
  /** 图片宽度 */
  width: PropTypes.number,
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
}

ImageWrapper.defaultProps = {
  objectFix: 'fill',
  placeholder: placeholder,
  error: error,
}

export default ImageWrapper
