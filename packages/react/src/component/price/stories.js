import React from 'react'
import { observable } from 'mobx'

import Price from './'

export const normal = () => {
  return (
    <div>
      <div>
        说明：
        <br />
        货币符号相关方法： setCurrency, setCurrencyList, getCurrency
        <br />
        单位相关方法： setUnit, getUnit
        <br />
        定义金额展示： format
      </div>
      <br />
      normal形式
      <div className='m-margin-5'>
        <Price value={100} />
      </div>
      <div className='m-margin-5'>
        <Price currencyScale={0.5} value={-12314} />
      </div>
      <div className='m-margin-5'>
        <Price isFenUnit value={12345.678} />
      </div>
      <div className='m-margin-5'>
        <Price value={125345.6478} precision={3} />
      </div>
      <br />
      format -- 保留几位小数展示<br />
      {Price.format(-8132789.5404)}
    </div>
  )
}

export default {
  title: '基础/Price',
}
