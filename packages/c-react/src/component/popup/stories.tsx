import React from 'react'

import { Popup, PopupV1 as TempPopupV1 } from './'
import { View } from '../view'
import { Button } from '../button'
import { Text } from '../text'
import { Toast } from '../toast'
export const normal = () => {
  return (
    <View>
      <Button
        onClick={() => {
          Popup.render({
            left: true,
            children: (
              <View>
                <View>adsfas</View>
              </View>
            ),
            onHide: Popup.hide,
          })
        }}
      >
        left
      </Button>
      <Button
        onClick={() => {
          Popup.render({
            right: true,
            children: <View>lala</View>,
            onHide: Popup.hide,
          })
        }}
      >
        right
      </Button>
      <Button
        onClick={() => {
          Popup.render({
            bottom: true,
            children: <View>lala</View>,
            onHide: Popup.hide,
          })
        }}
      >
        bottom
      </Button>
      <Button
        onClick={() => {
          Popup.render({
            style: {
              top: '50%',
              left: '50%',
              marginTop: '-200px',
              marginLeft: '-150px',
              width: '300px',
              height: '400px',
            },
            children: <View>center</View>,
            disabledHeader: true,
            onHide: Popup.hide,
          })
        }}
      >
        center
      </Button>
    </View>
  )
}

export const title = () => {
  return (
    <Button
      onClick={() => {
        Popup.render({
          title: '啦啦啦',
          bottom: true,
          children: <View>lala</View>,
          onHide: Popup.hide,
        })
      }}
    >
      bottom
    </Button>
  )
}
export const PopupV1 = () => {
  return (
    <Button
      onClick={() => {
        TempPopupV1.render({
          title:
            '啦啦啦1(加了headerClassName： m-flex-justify-center  m-bg-back）',
          headerClassName: 'm-flex-justify-center m-bg-back',
          titleCenter: true,
          bottom: true,
          children: (
            <View>
              <Button
                onClick={() => {
                  TempPopupV1.render({
                    title: '啦啦啦2',
                    bottom: true,
                    children: (
                      <View>
                        点击关闭会提示【检测到弹窗关闭了，看要做什么回调】
                        <Button
                          onClick={() => {
                            TempPopupV1.render({
                              title: '啦啦啦3',
                              bottom: true,
                              children: (
                                <View>
                                  <Button
                                    onClick={() => {
                                      const hdeId4 = TempPopupV1.render({
                                        title: '啦啦啦4',
                                        left: true,
                                        children: (
                                          <Button
                                            type='primary'
                                            onClick={() => {
                                              TempPopupV1.render({
                                                title: '啦啦啦5',
                                                right: true,
                                                children: (
                                                  <Button
                                                    type='primary'
                                                    onClick={hdeId4}
                                                  >
                                                    关闭左弹框
                                                  </Button>
                                                ),
                                                // onHide: Popup.hide,
                                                height: '60vh',
                                                className: 'xxxx',
                                                closeText: (
                                                  <Text
                                                    style={{ color: 'red' }}
                                                  >
                                                    关闭
                                                  </Text>
                                                ),
                                              })
                                            }}
                                          >
                                            打开右弹框
                                          </Button>
                                        ),
                                        onHide: () =>
                                          new Promise((resolve) => {
                                            setTimeout(resolve, 3000)
                                          }),
                                        height: '60vh',
                                        className: 'xxxx',
                                        closeText: (
                                          <Text style={{ color: 'red' }}>
                                            3秒后关闭左弹窗
                                          </Text>
                                        ),
                                      })
                                    }}
                                  >
                                    bottom
                                  </Button>
                                </View>
                              ),
                              height: '60vh',
                            })
                          }}
                        >
                          bottom
                        </Button>
                      </View>
                    ),
                    onHide: () => {
                      Toast.tip('检测到弹窗关闭了，看要做什么回调')
                    },
                    height: '60vh',
                  })
                }}
              >
                bottom
              </Button>
              1
            </View>
          ),
          height: '60vh',
        })
      }}
    >
      bottom
    </Button>
  )
}
export default {
  title: '浮层/Popup',
}
