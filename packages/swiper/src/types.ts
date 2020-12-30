import { HTMLAttributes } from 'react'
import { FlexProps } from '@gm-mobile/react'
import { SwiperOptions } from 'swiper'

export interface SwiperImgProps extends HTMLAttributes<HTMLDivElement> {
  data: {
    onClick?: (data: any) => any
    img: string
  }[]
  className?: string
  options?: SwiperOptions
}

export interface SwiperCategoryProps extends HTMLAttributes<HTMLDivElement> {
  options?: SwiperOptions
  className?: string
}

export interface PreviewImageProps extends FlexProps {
  /** 图片数组 [{onClick, img}] */
  images: { onClick?(): any; img: string }[]
  /** 关闭预览回调 */
  onHide?(): void
  /** 多图片预览时，默认预览的图片下标 */
  defaultIndex?: number
  className?: string
}

export interface PreviewImageStaticsProps {
  render(options: PreviewImageProps): void
  hide(): void
}
