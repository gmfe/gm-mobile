import { HTMLAttributes, FC } from 'react'
import { FlexProps } from '@gm-mobile/react'
import { SwiperOptions } from 'swiper'

export interface SwiperImgProps extends HTMLAttributes<HTMLDivElement> {
  data: {
    onClick?: (data: any) => any
    img: string
  }[]
  options?: SwiperOptions
}

export interface SwiperCategoryProps extends HTMLAttributes<HTMLDivElement> {
  options?: SwiperOptions
}

export interface PreviewImageProps extends FlexProps {
  /** 图片数组 [{onClick, img}] */
  images: { onClick?(): any; img: string }[]
  /** 关闭预览回调 */
  onHide?(): void
  /** 多图片预览时，默认预览的图片下标 */
  defaultIndex?: number
}

export interface PreviewImageStaticsProps {
  render(options: PreviewImageProps): void
  hide(): void
}

export type PreviewImageFC = FC<PreviewImageProps> & PreviewImageStaticsProps
