import React, { Component } from 'react'
import { View, Text, Navigator } from '@tarojs/components'
import _ from 'lodash'
import './index.less'
import queryString from 'query-string'

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

const storiesList = []

_.each(mpReq.keys(), (key) => {
  storiesList.push({
    module: mpReq(key),
    packageName: 'mp',
  })
})

_.each(comReq.keys(), (key) => {
  storiesList.push({
    module: comReq(key),
    packageName: 'components',
  })
})

const map = {}

_.each(storiesList, ({ module, packageName }) => {
  // 算是个常规的 stories
  if (module.default && module.default.title) {
    const title = module.default.title
    const root = title.includes('/') ? title.split('/')[0] : 'Other'
    const component = title.split('/').slice(-1)[0]

    map[root] = map[root] || {}
    map[root][component] = {}

    _.each(module, (value, key) => {
      if (key !== 'default') {
        map[root][component][key] = {
          packageName,
          root,
          component,
          store: key,
        }
      }
    })
  }
})

export default class Index extends Component {
  render() {
    return (
      <View>
        {_.map(map, (oneValue, oneKey) => {
          return (
            <View key={oneKey}>
              <Text>{oneKey}</Text>

              {_.map(oneValue, (twoValue, twoKey) => {
                return (
                  <View key={twoKey} className='m-padding-lr-10'>
                    <Text>{twoKey}</Text>

                    {_.map(twoValue, (thereValue, thereKey) => {
                      return (
                        <View key={thereKey} className='m-padding-lr-10'>
                          <Navigator
                            url={`/pages/index/stories?${queryString.stringify(
                              thereValue
                            )}`}
                          >
                            {thereKey}
                          </Navigator>
                        </View>
                      )
                    })}
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
    )
  }
}
