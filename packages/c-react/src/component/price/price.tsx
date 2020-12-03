import React, { Component } from 'react'
import _ from 'lodash'
import { View } from '../view'
import { Text } from '../text'
import { Events } from '@gm-mobile/c-tool'
import Storage from './storage'
import { PriceProps, PriceStaticsTypes } from './types'

import formatNumber from './util'

const symbolKey = 'Price#symbol'
const unitKey = 'Price#unit'

// 默认 _symbol 为货币符号
let _symbol = Storage.get(symbolKey) || '¥'
let _unit = Storage.get(unitKey) || '元'
// [{ symbol: '￥', type: 'CNY', unit: '元' },...]
let _currencyList: { symbol: string; type: string; unit: string }[] = [] // 多币种列表

const getCurrentFromType = (type: string) =>
  _.find(_currencyList, (item) => item.type === type)

const PriceStatics: PriceStaticsTypes = {
  format(value, isFenUnit, formatOptions) {
    if (isFenUnit) {
      value = value / 100
    }
    return formatNumber(value, formatOptions)
  },
  setCurrencyList(list = []) {
    if (!list || !list.length) return
    _currencyList = list
  },
  // 设置符号
  setCurrency(symbol) {
    if (!symbol || symbol === _symbol) return
    _symbol = symbol
    Storage.set(symbolKey, symbol)
    Events.dispatch('GM_MOBILE_UPDATE_PRICE')
  },
  // 获得符号
  getCurrency(type = '') {
    const current = type ? getCurrentFromType(type) : null
    return current ? current.symbol : _symbol
  },
  setUnit(unit) {
    if (!unit || unit === _unit) return
    _unit = unit
    Storage.set(unitKey, unit)
  },
  getUnit(type = '') {
    const current = type ? getCurrentFromType(type) : null
    return current ? current.unit : _unit
  },
}

class PriceBase extends Component<PriceProps> {
  reRender = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    Events.add('GM_MOBILE_UPDATE_PRICE', this.reRender)
  }

  componentWillUnmount() {
    Events.remove('GM_MOBILE_UPDATE_PRICE', this.reRender)
  }

  render() {
    const {
      value,
      useGrouping = true,
      precision = 2,
      currencyScale = 0.85,
      isFenUnit = false,
      keepZero = true,
      feeType = '',
      className,
      style,
    } = this.props

    const current = getCurrentFromType(feeType)
    if (_.isNil(value) || _.isNaN(value)) {
      return null
    }

    return (
      <View className={className} style={style}>
        {value < 0 ? '-' : ''}
        <Text
          style={{
            fontSize: `${currencyScale > 1 ? '1' : currencyScale}em`,
          }}
        >
          {current ? current.symbol : _symbol}
        </Text>
        {PriceStatics.format(Math.abs(value), isFenUnit, {
          useGrouping,
          precision,
          keepZero,
        })}
      </View>
    )
  }
}

const Price = Object.assign(PriceBase, PriceStatics)

export default Price
