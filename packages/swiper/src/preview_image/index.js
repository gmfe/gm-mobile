import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { Flex, LayoutRoot, Image } from '@gm-mobile/react'
import SwiperImg from '../swiper_img'

const PreviewImageStatics = {
  render(options) {
    options.onHide = () => {
      PreviewImageStatics.hide()
    }

    LayoutRoot.renderWith(LayoutRoot.TYPE.POPUP, <PreviewImage {...options} />)
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.POPUP)
  },
}

const PreviewImage = ({ images, defaultIndex, className, onHide, ...rest }) => {
  const [index, setIndex] = useState(defaultIndex)

  const handleChange = (index) => {
    setIndex(index)
  }

  const handleClose = () => {
    onHide()
  }

  return (
    <Flex
      {...rest}
      column
      justifyCenter
      onClick={handleClose}
      className={classNames('m-preview-image', className)}
    >
      <div className='m-preview-image-counter'>{`${index + 1}/${
        images.length
      }`}</div>
      <Flex column justifyCenter className='m-preview-image-inner'>
        {images.length === 1 ? (
          <Image src={images[0].img} objectFix='contain' />
        ) : (
          <div>
            <SwiperImg
              data={images}
              options={{
                initialSlide: defaultIndex,
                autoplay: false,
                pagination: { el: null },
                on: {
                  slideChange: function () {
                    handleChange(this.realIndex)
                  },
                },
              }}
            />
          </div>
        )}
      </Flex>
    </Flex>
  )
}

Object.assign(PreviewImage, PreviewImageStatics)

PreviewImage.defaultProps = {
  onHide: _.noop,
  defaultIndex: 0,
}

PreviewImage.propTypes = {
  /** 图片数组 [{onClick, img}] */
  images: PropTypes.array.isRequired,
  /** 关闭预览回调 */
  onHide: PropTypes.func,
  /** 多图片预览时，默认预览的图片下标 */
  defaultIndex: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default PreviewImage
