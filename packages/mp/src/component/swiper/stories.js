import React from 'react'
import SwiperImg from './swiper_img'
import SwiperCategory from './swiper_category'
import { View } from '@gm-mobile/c-react'

const arr = [
  {
    onClick: () => {
      console.log('click')
    },
    img:
      'https://img.guanmai.cn/station_pic/sha1_eb0e548b7a574fcb3069a91a1dd816a1d8dddef8.jpg',
  },
  {
    url: '',
    img:
      'https://img.guanmai.cn/station_pic/sha1_6f6bd1497f8e5c1db37593110af99437589a570f.jpg',
  },
  {
    url: '',
    img:
      'https://img.guanmai.cn/station_pic/sha1_d9600fa7ed07af43313992501128e7cbd13f6b58.jpg',
  },
  {
    url: '',
    img:
      'https://img.guanmai.cn/station_pic/sha1_14c57556875b2fcd5984ff1220aab885ff324055.jpg',
  },
]

export const normal = () => {
  return <SwiperImg data={arr} />
}

export const category = () => {
  return (
    <SwiperCategory height='80px'>
      <View>
        <View
          onClick={() => {
            console.log('click')
          }}
        >
          我的收藏
        </View>
        <View
          onClick={() => {
            console.log('click')
          }}
        >
          蔬菜
        </View>
        <View
          onClick={() => {
            console.log('click')
          }}
        >
          肉类
        </View>
      </View>
      <View>
        <View
          onClick={() => {
            console.log('click')
          }}
        >
          冻品
        </View>
      </View>
    </SwiperCategory>
  )
}

export default {
  title: '布局/Swiper',
}
