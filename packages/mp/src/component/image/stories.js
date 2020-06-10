import React from 'react'
import Image from './index'
import { Flex, Text, View } from '@gm-mobile/components'

const src =
  'https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png?'
const src2 = 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
const style1 = { width: '100px', height: '200px' }
const style2 = { width: '200px', height: '100px' }
const flex = {
  width: '350px',
  display: 'flex',
  justifyContent: 'space-between',
}

export const normal = () => (
  <Flex column>
    <Image src={src} />
    <Text>tip：image组件默认宽度300px、高度240px</Text>
    <Image width='100px' height='100px' src={src} />
    <Text>width: 100px, height: 100px</Text>
  </Flex>
)

export const round = () => (
  <View>
    <Image round width='100px' height='100px' className='m-border' src={src} />
    <Image round width='100px' height='100px' src={src2} />
  </View>
)

export const longPress = () => (
  <Flex column>
    <Image showMenuByLongpress width='100px' height='100px' src={src} />
    <Image showMenuByLongpress width='100px' height='100px' src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=810988444,1648289218&fm=11&gp=0.jpg' />
    <Text>tip：image组件中二维码/小程序码图片不支持长按识别。仅在wx.previewImage中支持长按识别,主要是因为苹果手机限制</Text>
  </Flex>
)

export const error = () => (
  <View>
    <Image width='100px' height='100px' src='error' />
  </View>
)

export const mode = () => (
  <View>
    <Text>scaleToFill：不保持纵横比缩放图片，使图片完全适应</Text>
    <View style={flex}>
      <Image src={src2} mode='scaleToFill' style={style1} />
      <Image src={src2} mode='scaleToFill' style={style2} />
    </View>

    <Text>aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来</Text>
    <View style={flex}>
      <Image objectFix='contain' mode='aspectFit' src={src2} style={style1} />
      <Image objectFix='contain' mode='aspectFit' src={src2} style={style2} />
    </View>

    <Text>aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来</Text>
    <View style={flex}>
      <Image objectFix='cover' mode='aspectFill' src={src2} style={style1} />
      <Image objectFix='cover' mode='aspectFill' src={src2} style={style2} />
    </View>

    <Text>top：不缩放图片，只显示图片的顶部区域</Text>
    <View style={flex}>
      <Image objectFix='none' mode='top' src={src2} style={style1} />
      <Image objectFix='none' mode='top' src={src2} style={style2} />
    </View>

    <Text>bottom：不缩放图片，只显示图片的底部区域</Text>
    <View style={flex}>
      <Image objectFix='scale-down' mode='bottom' src={src2} style={style1} />
      <Image objectFix='scale-down' mode='bottom' src={src2} style={style2} />
    </View>

    <Text>center：不缩放图片，只显示图片的中间区域</Text>
    <View style={flex}>
      <Image objectFix='scale-down' mode='center' src={src2} style={style1} />
      <Image objectFix='scale-down' mode='center' src={src2} style={style2} />
    </View>

    <Text>left：不缩放图片，只显示图片的左边区域</Text>
    <View style={flex}>
      <Image objectFix='scale-down' mode='left' src={src2} style={style1} />
      <Image objectFix='scale-down' mode='left' src={src2} style={style2} />
    </View>

    <Text>right：不缩放图片，只显示图片的右边边区域</Text>
    <View style={flex}>
      <Image objectFix='scale-down' mode='right' src={src2} style={style1} />
      <Image objectFix='scale-down' mode='right' src={src2} style={style2} />
    </View>

    <Text>top left：不缩放图片，只显示图片的左上边区域</Text>
    <View style={flex}>
      <Image objectFix='scale-down' mode='top left' src={src2} style={style1} />
      <Image objectFix='scale-down' mode='top left' src={src2} style={style2} />
    </View>

    <Text>top right：不缩放图片，只显示图片的右上边区域</Text>
    <View style={flex}>
      <Image objectFix='scale-down' mode='top right' src={src2} style={style1} />
      <Image objectFix='scale-down' mode='top right' src={src2} style={style2} />
    </View>

    <Text>bottom left：不缩放图片，只显示图片的左下边区域</Text>
    <View style={flex}>
      <Image objectFix='scale-down' mode='bottom left' src={src2} style={style1} />
      <Image objectFix='scale-down' mode='bottom left' src={src2} style={style2} />
    </View>

    <Text>bottom right：不缩放图片，只显示图片的右下边区域</Text>
    <View style={flex}>
      <Image objectFix='scale-down' mode='bottom' src={src2} style={style1} />
      <Image objectFix='scale-down' mode='bottom' src={src2} style={style2} />
    </View>
  </View>
)

export default {
  title: '基础/Image',
}
