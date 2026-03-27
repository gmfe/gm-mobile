# Price

## 简介
价格 - 用于格式化显示价格数值，支持多币种、千分符、精度控制等功能，适用于电商、金融等场景中的金额展示。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 展示数值 | number | - | 是 |
| precision | 精度，展示几位小数 | number | 2 | 否 |
| useGrouping | 是否使用千分符 | boolean | true | 否 |
| currencyScale | 货币符号的缩放大小 | number | 0.85 | 否 |
| keepZero | 是否保留小数点后无效的零 | boolean | true | 否 |
| isFenUnit | 是否以分为单位（会将数值除以 100） | boolean | false | 否 |
| feeType | 多币种类型，配合 setCurrencyList 使用 | string | '' | 否 |

### 静态方法
| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| format | 格式化价格数值 | (value: number, isFenUnit: boolean, formatOptions: object) | string |
| setCurrencyList | 设置多币种列表 | (list: Array<{symbol: string, type: string, unit: string}>) | void |
| setCurrency | 设置全局货币符号 | (symbol: string) | void |
| getCurrency | 获取货币符号 | (type?: string) | string |
| setUnit | 设置全局单位 | (unit: string) | void |
| getUnit | 获取单位 | (type?: string) | string |

## 示例

### 基础用法
```jsx
import { Price } from '@gm-mobile/react'

// 默认显示，带千分符，保留两位小数
<Price value={100} />
// 显示: ¥100.00

<Price value={12314} />
// 显示: ¥12,314.00
```

### 自定义精度和千分符
```jsx
import { Price } from '@gm-mobile/react'

// 自定义小数位数
<Price value={125345.6478} precision={3} />
// 显示: ¥125,345.648

// 不使用千分符
<Price value={123456.78} useGrouping={false} />
// 显示: ¥123456.78
```

### 负数和分单位转换
```jsx
import { Price } from '@gm-mobile/react'

// 负数显示
<Price value={-12314} />
// 显示: -¥12,314.00

// 以分为单位（自动除以 100）
<Price isFenUnit value={12345} />
// 显示: ¥123.45

// 自定义货币符号大小
<Price currencyScale={0.5} value={-12314} />
// 显示: -¥12,314.00（符号更小）
```

### 多币种支持
```jsx
import { Price } from '@gm-mobile/react'

// 设置多币种列表
Price.setCurrencyList([
  { symbol: '¥', type: 'CNY', unit: '元' },
  { symbol: '$', type: 'USD', unit: '美元' },
  { symbol: '€', type: 'EUR', unit: '欧元' }
])

// 使用不同币种
<Price feeType="CNY" value={100} />
// 显示: ¥100.00

<Price feeType="USD" value={100} />
// 显示: $100.00

<Price feeType="EUR" value={100} />
// 显示: €100.00
```

### 使用静态方法
```jsx
import { Price } from '@gm-mobile/react'

// format 方法用于格式化数值
const formatted = Price.format(8132789.5404)
// 返回: "8,132,789.54"

// 获取当前货币符号
const symbol = Price.getCurrency()
// 返回: "¥"

// 获取指定类型的货币符号
const usdSymbol = Price.getCurrency('USD')
// 返回: "$"

// 获取单位
const unit = Price.getUnit()
// 返回: "元"

const usdUnit = Price.getUnit('USD')
// 返回: "美元"
```

### 高级用法：全局配置
```jsx
import { Price } from '@gm-mobile/react'

// 设置全局货币符号（会自动更新所有 Price 组件）
Price.setCurrency('$')

// 设置全局单位
Price.setUnit('美元')

// 所有 Price 组件都会使用新符号
<Price value={100} />
// 显示: $100.00
```

## 注意事项
- value 为必填项，当传入 null、undefined 或 NaN 时，组件不会渲染任何内容
- isFenUnit 为 true 时，会自动将 value 除以 100 进行转换，适合处理后端返回的分单位数据
- currencyScale 用于控制货币符号相对于数字的大小，0.85 表示符号大小为数字的 85%，大于 1 时会自动设为 1
- 使用 setCurrency、setUnit 等方法修改全局配置后，所有已挂载的 Price 组件会自动重新渲染
- 多币种功能需要先通过 setCurrencyList 设置币种列表，然后通过 feeType 指定使用哪种币种
- keepZero 为 true 时会保留小数点后的零（如 100.00），为 false 时会自动去除（如 100）
- 静态方法的调用会自动触发全局更新，无需手动刷新组件
