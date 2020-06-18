import React, { Component } from 'react'
import _map from 'lodash/map'
import _each from 'lodash/each'
import queryString from 'query-string'
import {
  Text,
  Page,
  Cells,
  Cell,
  ActionSheet,
  LayoutRoot,
  Button,
} from '../../../../packages/components/src'

// 不知道为啥，要写到 component
const mpReq = require.context(
  '../../../../packages/mp/src/component/',
  true,
  /stories\.js$/
)
const comReq = require.context(
  '../../../../packages/components/src/component/',
  true,
  /stories\.js$/
)
const qrCodeReq = require.context(
  '../../../../packages/qrcode/',
  true,
  /stories\.js$/
)

const storiesList = []

_each(comReq.keys(), (key) => {
  storiesList.push({
    module: comReq(key),
    packageName: 'components',
    path: key,
  })
})

_each(mpReq.keys(), (key) => {
  storiesList.push({
    module: mpReq(key),
    packageName: 'mp',
    path: key,
  })
})

_each(qrCodeReq.keys(), (key) => {
  storiesList.push({
    module: qrCodeReq(key),
    packageName: 'qrcode',
    path: key,
  })
})

const dataMap = {}

_each(storiesList, ({ module, packageName, path }) => {
  // 算是个常规的 stories
  if (module.default && module.default.title) {
    const title = module.default.title
    const root = title.includes('/') ? title.split('/')[0] : 'Other'
    const component = title.split('/').slice(-1)[0]

    dataMap[root] = dataMap[root] || {}
    dataMap[root][component] = {}

    _each(module, (value, key) => {
      if (key !== 'default') {
        dataMap[root][component][key] = {
          packageName,
          root,
          component,
          store: key,
          folder: path.split('.')[1].split('/')[1],
        }
      }
    })
  }
})

export default class Index extends Component {
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
  }

  onReachBottom() {
    console.log('onReachBottom')
  }

  render() {
    return (
      <>
        <Page>
          <Button
            mini
            onClick={() => {
              wx.startPullDownRefresh({
                success() {
                  console.log('success')
                },
                fail() {
                  console.log('fail')
                },
              })
            }}
          >
            startPullDownRefresh
          </Button>
          <Button
            mini
            onClick={() => {
              wx.stopPullDownRefresh({
                success() {
                  console.log('success')
                },
                fail() {
                  console.log('fail')
                },
              })
            }}
          >
            stopPullDownRefresh
          </Button>
          {_map(dataMap, (oneValue, oneKey) => {
            return (
              <Cells key={oneKey} title={oneKey}>
                {_map(oneValue, (twoValue, twoKey) => {
                  return (
                    <Cell
                      access
                      key={twoKey}
                      onClick={() => {
                        ActionSheet.render({
                          title: twoKey,
                          data: _map(twoValue, (thereValue, thereKey) => ({
                            text: thereKey,
                            value: queryString.stringify(thereValue),
                          })),
                        }).then((value) => {
                          wx.navigateTo({
                            url: `/package_a/pages/index/stories?${value}`,
                          })
                        })
                      }}
                    >
                      <Text>{twoKey}</Text>
                    </Cell>
                  )
                })}
              </Cells>
            )
          })}
        </Page>
        <LayoutRoot />
      </>
    )
  }
}
