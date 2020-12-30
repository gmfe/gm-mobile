import React, { useState, FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Flex, LayoutRoot, Image } from '@gm-mobile/react'

import SwiperImg from '../swiper_img'

import {
  PreviewImageProps,
  PreviewImageStaticsProps,
  _PreviewImageProps,
} from '../types'

const PreviewImageStatics: PreviewImageStaticsProps = {
  render(options) {
    options.onHide = () => {
      PreviewImageStatics.hide()
    }

    LayoutRoot.renderWith(LayoutRoot.Type.POPUP, <PreviewImage {...options} />)
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.Type.POPUP)
  },
}

const PreviewImage: FC<_PreviewImageProps> = ({
  images,
  defaultIndex = 0,
  className,
  onHide = _.noop,
  ...rest
}) => {
  const [index, setIndex] = useState(defaultIndex)

  const handleChange = (index: number) => {
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
                pagination: { el: 'null' },
                on: {
                  slideChange: function () {
                    // @ts-ignore：这里的指针指向的是 swiper 实例
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

export default PreviewImage as PreviewImageProps
