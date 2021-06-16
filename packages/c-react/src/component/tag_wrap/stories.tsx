import React from 'react'
import TagWrap from './tag_wrap'

import { View } from '../view'

export const Normal = () => {
  return (
    <View>
      <View style={{ width: '100px' }}>
        <TagWrap tag='这是tag这是这是这是'>
          <View>
            <View>ssfafasfa</View>
            <View>ssfafasfa</View>
            <View>ssfafasfa</View>
          </View>
        </TagWrap>
      </View>
    </View>
  )
}

export default {
  title: '基础/Tag',
  component: TagWrap,
}
