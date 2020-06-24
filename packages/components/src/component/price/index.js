import React from 'react'
import PropTypes from 'prop-types'
import _find from 'lodash/find'
import _isNil from 'lodash/isNil'
import _isNaN from 'lodash/isNaN'
import View from '../view'
import Text from '../text'
import EventBus from './event_bus'
import Storage from './storage'

import formatNumber from './util'

const symbolKey = 'Price#symbol'
const unitKey = 'Price#unit'

// 默认 _symbol 为货币符号
let _symbol = Storage.get(symbolKey) || '¥'
let _unit = Storage.get(unitKey) || '元'
// [{ symbol: '￥', type: 'CNY', unit: '元' },...]
let _currencyList = [] // 多币种列表

const getCurrentFromType = (type) =>
  _find(_currencyList, (item) => item.type === type)

const format = (value, isFenUnit, formatOptions) => {
  if (isFenUnit) {
    value = value / 100
  }
  return formatNumber(value, formatOptions)
}
class Price extends React.Component {
  rerender = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    EventBus.add('GM_MOBILE_UPDATE_PRICE', this.rerender)
  }

  componentWillUnmount() {
    EventBus.remove('GM_MOBILE_UPDATE_PRICE', this.rerender)
  }

  render() {
    const {
      value,
      useGrouping,
      precision,
      currencyScale,
      isFenUnit,
      keepZero,
      feeType,
    } = this.props

    const current = getCurrentFromType(feeType)
    if (_isNil(value) || _isNaN(value)) {
      return null
    }

    return (
      <View>
        {value < 0 ? '-' : ''}
        <Text
          style={{
            fontSize: `${currencyScale > 1 ? '1' : currencyScale}em`,
          }}
        >
          {current ? current.symbol : _symbol}
        </Text>
        {format(Math.abs(value), isFenUnit, {
          useGrouping,
          precision,
          keepZero,
        })}
      </View>
    )
  }
}

Price.propTypes = {
  /** 展示数值 */
  value: PropTypes.number.isRequired,
  /** 精度， 展示几位小数 */
  precision: PropTypes.number,
  /** 是否使用千分符 */
  useGrouping: PropTypes.bool,
  /** 货币符号的缩放大小 */
  currencyScale: PropTypes.number,
  /** 是否保留小数点后无效的零 */
  keepZero: PropTypes.bool,
  isFenUnit: PropTypes.bool,
  /** 多币种 */
  feeType: PropTypes.string,
}

Price.defaultProps = {
  precision: 2,
  useGrouping: true,
  currencyScale: 0.85,
  keepZero: true,
  isFenUnit: false,
  feeType: '',
}

Price.format = format

Price.setCurrencyList = (list = []) => {
  if (!list || !list.length) return
  _currencyList = list
}

// 设置符号
Price.setCurrency = (symbol) => {
  if (!symbol || symbol === _symbol) return
  _symbol = symbol
  Storage.set(symbolKey, symbol)
  EventBus.dispatch('REACT_MGM_UPDATE_PRICE')
}

// 获得符号
Price.getCurrency = (type = '') => {
  const current = type ? getCurrentFromType(type) : null
  return current ? current.symbol : _symbol
}

Price.setUnit = (unit) => {
  if (!unit || unit === _unit) return
  _unit = unit
  Storage.set(unitKey, unit)
}

Price.getUnit = (type = '') => {
  const current = type ? getCurrentFromType(type) : null
  return current ? current.unit : _unit
}

export default Price
