# Storage

## 简介
本地存储工具 - 封装了浏览器 LocalStorage 和 SessionStorage API，提供带前缀的 JSON 数据自动序列化存储方案，简化前端数据持久化操作。

## API

### LocalStorage
持久化本地存储，数据在浏览器关闭后仍然保留。

### SessionStorage
会话级本地存储，数据在浏览器标签页关闭后清除。

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| set | 设置存储值，自动进行 JSON 序列化 | key (string) - 存储的键名<br/>value (any) - 存储的值，支持任意可序列化的数据 | void |
| get | 获取存储值，自动进行 JSON 反序列化 | key (string) - 存储的键名 | any - 存储的值，不存在时返回 null |
| remove | 删除指定键的存储值 | key (string) - 要删除的键名 | void |
| clear | 清空当前域名下的所有存储 | 无 | void |
| getAll | 获取所有带前缀的存储数据 | 无 | object - 包含所有存储的对象，无数据时返回 null |

## 示例

### 基础用法

```jsx
import { LocalStorage, SessionStorage } from '@gm-mobile/react'

// LocalStorage - 持久化存储
LocalStorage.set('username', 'zhangsan')
LocalStorage.set('userInfo', { name: '张三', age: 25 })
LocalStorage.set('userList', [1, 2, 3])

const username = LocalStorage.get('username') // 'zhangsan'
const userInfo = LocalStorage.get('userInfo') // { name: '张三', age: 25 }
const userList = LocalStorage.get('userList') // [1, 2, 3]

// SessionStorage - 会话级存储
SessionStorage.set('tempData', '临时数据')
const tempData = SessionStorage.get('tempData') // '临时数据'
```

### 常见用法

#### 表单数据持久化

```jsx
import { LocalStorage } from '@gm-mobile/react'
import React, { useState, useEffect } from 'react'

function Form() {
  const [value, setValue] = useState('')

  // 组件加载时恢复数据
  useEffect(() => {
    const savedValue = LocalStorage.get('formInput')
    if (savedValue) {
      setValue(savedValue)
    }
  }, [])

  // 输入时保存数据
  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    LocalStorage.set('formInput', newValue)
  }

  return <input value={value} onChange={handleChange} />
}
```

#### 用户偏好设置

```jsx
import { LocalStorage } from '@gm-mobile/react'

// 保存用户偏好设置
const settings = {
  theme: 'dark',
  language: 'zh-CN',
  fontSize: 16
}

LocalStorage.set('userSettings', settings)

// 读取用户偏好设置
const savedSettings = LocalStorage.get('userSettings')
if (savedSettings) {
  console.log(savedSettings.theme) // 'dark'
  console.log(savedSettings.language) // 'zh-CN'
}
```

#### 临时数据缓存（跨页面）

```jsx
import { SessionStorage } from '@gm-mobile/react'

// 页面 A - 设置临时数据
function PageA() {
  const handleClick = () => {
    SessionStorage.set('pageData', {
      from: 'PageA',
      timestamp: Date.now()
    })
    // 跳转到页面 B
    window.location.href = '/page-b'
  }

  return <button onClick={handleClick}>跳转到页面 B</button>
}

// 页面 B - 读取临时数据
function PageB() {
  const pageData = SessionStorage.get('pageData')
  console.log(pageData) // { from: 'PageA', timestamp: xxx }
  return <div>来自: {pageData?.from}</div>
}
```

### 高级用法

#### 获取所有存储数据

```jsx
import { LocalStorage } from '@gm-mobile/react'

// 存储多个数据
LocalStorage.set('key1', 'value1')
LocalStorage.set('key2', 'value2')
LocalStorage.set('key3', { data: 'value3' })

// 获取所有存储（只返回带前缀的数据）
const allData = LocalStorage.getAll()
console.log(allData)
// {
//   key1: 'value1',
//   key2: 'value2',
//   key3: { data: 'value3' }
// }
```

#### 删除特定数据

```jsx
import { LocalStorage } from '@gm-mobile/react'

LocalStorage.set('tempData', '临时数据')

// 删除指定数据
LocalStorage.remove('tempData')

// 确认已删除
const data = LocalStorage.get('tempData') // null
```

#### 批量清理存储

```jsx
import { LocalStorage } from '@gm-mobile/react'

// 警告：clear() 会清除当前域名下所有存储（包括其他代码设置的）
// 使用前请确认场景，通常建议使用 remove() 删除特定 key

LocalStorage.clear()
```

## 注意事项
- LocalStorage 和 SessionStorage 都会自动添加 `_gm-mobile_` 前缀，避免与其他库的 key 冲突
- 存储的数据会自动进行 JSON 序列化/反序列化，支持对象、数组等复杂类型
- LocalStorage 数据永久保留（除非用户清除浏览器数据），SessionStorage 在标签页关闭后清除
- LocalStorage 和 SessionStorage 都有容量限制（通常为 5-10MB），存储大量数据时请注意
- `clear()` 方法会清除当前域名下的所有存储，请谨慎使用，通常建议使用 `remove()` 删除特定 key
- 在无痕模式或隐私模式下，存储可能会被浏览器限制或禁用
- 存储的数据只能被同源的页面访问，跨域页面无法共享数据

## 相关组件
无相关组件
