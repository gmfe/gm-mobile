import React from 'react'
import queryString from 'query-string'
import _ from 'lodash'
import {
  Text,
  PageMP,
  Cells,
  Cell,
  ActionSheet,
} from '../../../../packages/mp/src'

const storiesList = []

// 不知道为啥，要写到 component
const mpReq = require.context(
  '../../../../packages/mp/src/component/',
  true,
  /stories\.js$/
)

_.each(mpReq.keys(), (key) => {
  storiesList.push({
    module: mpReq(key),
    packageName: 'mp',
    path: key,
  })
})

const comReq = require.context(
  '../../../../packages/c-react/src/component/',
  true,
  /stories\.js$/
)

_.each(comReq.keys(), (key) => {
  storiesList.push({
    module: comReq(key),
    packageName: 'c-react',
    path: key,
  })
})

const qrCodeReq = require.context(
  '../../../../packages/c-qrcode/',
  true,
  /stories\.js$/
)

_.each(qrCodeReq.keys(), (key) => {
  storiesList.push({
    module: qrCodeReq(key),
    packageName: 'c-qrcode',
    path: key,
  })
})

const businessComReq = require.context(
  '../../../../packages/c-business/src/component/',
  true,
  /stories\.js$/
)

_.each(businessComReq.keys(), (key) => {
  storiesList.push({
    module: businessComReq(key),
    packageName: 'c-business',
    path: key,
  })
})

const cookieReq = require.context(
  '../../../../packages/c-cookie/',
  true,
  /stories\.js$/
)

_.each(cookieReq.keys(), (key) => {
  storiesList.push({
    module: cookieReq(key),
    packageName: 'c-cookie',
    path: key,
  })
})

const serviceTimeReq = require.context(
  '../../../../packages/c-service-time/src/component',
  true,
  /stories\.js$/
)

_.each(serviceTimeReq.keys(), (key) => {
  storiesList.push({
    module: serviceTimeReq(key),
    packageName: 'c-service-time',
    path: key,
  })
})

const dataMap = {}

_.each(storiesList, ({ module, packageName, path }) => {
  // 算是个常规的 stories
  if (module.default && module.default.title) {
    const title = module.default.title
    const root = title.includes('/') ? title.split('/')[0] : 'Other'
    const component = title.split('/').slice(-1)[0]

    dataMap[root] = dataMap[root] || {}
    dataMap[root][component] = {}

    _.each(module, (value, key) => {
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

const Index = () => (
  <PageMP>
    {_.map(dataMap, (oneValue, oneKey) => {
      return (
        <Cells key={oneKey} title={oneKey}>
          {_.map(oneValue, (twoValue, twoKey) => {
            return (
              <Cell
                access
                key={twoKey}
                onClick={() => {
                  const data = _.map(twoValue, (v, k) => ({
                    value: v,
                    text: k,
                  }))

                  // 只有一个就直接进去
                  if (data.length === 1) {
                    wx.navigateTo({
                      url: `/pages_a/stories/index?${queryString.stringify(
                        data[0].value
                      )}`,
                    })
                  } else {
                    ActionSheet.render({
                      data,
                    }).then((value) => {
                      wx.navigateTo({
                        url: `/pages_a/stories/index?${queryString.stringify(
                          value
                        )}`,
                      })
                    })
                  }
                }}
              >
                <Text>{twoKey}</Text>
              </Cell>
            )
          })}
        </Cells>
      )
    })}
  </PageMP>
)

export default Index
