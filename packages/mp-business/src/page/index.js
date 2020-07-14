import React from 'react'
import { PageMP } from '../../../mp/src'
import { useDidShow, useShareAppMessage } from '@tarojs/taro'
import PropTypes from 'prop-types'

const BPage = (props) => {
  useDidShow(() => {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    })
  })

  useShareAppMessage((res) => {
    let title, path, imageUrl
    const defaultTitle = '推荐你一个买菜神器，新鲜上门~'
    const defaultPath = '/pages/index/index'

    if (props.shareInfo) {
      title = props.shareInfo.title
      path = props.shareInfo.path
      imageUrl = props.shareInfo.imageUrl
    }

    return {
      title: title || defaultTitle,
      path: path || defaultPath,
      imageUrl: imageUrl || null,
    }
  })

  return <PageMP {...props} />
}

BPage.propTypes = {
  ...PageMP.propTypes,
  shareInfo: PropTypes.object,
}

export default BPage
