import { ViewProps } from '@gm-mobile/c-react'
import { SwiperProps } from '@tarojs/components/types/Swiper'

export interface SwiperImgProps extends ViewProps {
  data: {
    onClick?(): void
    img: string
  }[]
  /** 小程序 swiper 相关参数设置 */
  options?: SwiperProps
  /** 定义 swiper 高度，官方默认 150px */
  height?: string
}

export interface SwiperCategoryProps extends ViewProps {
  /** swiper 容器高度 */
  height: string
  options?: SwiperProps
}

export interface SwiperPaginationProps {
  type: 'dot' | 'rect'
  data: string[]
  current: string | null
}
