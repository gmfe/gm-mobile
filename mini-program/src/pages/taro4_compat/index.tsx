import React, { useEffect, useRef, useState } from 'react'
import Taro from '@tarojs/taro'
import { Canvas, Image, ScrollView, Video, WebView } from '@tarojs/components'
import {
  Button,
  Checkbox,
  Dialog,
  DigitalKeyboard,
  Picker,
  Popup,
  Radio,
  Search,
  Text,
  Textarea,
  TextField,
  Toast,
  View,
} from '../../../../packages/c-react'
// 小程序端的 Input(onInput 事件)只在 weapp 实现上，直接引 weapp 版本
import Input from '../../../../packages/c-react/src/component/input/input.weapp'
import { ImageMP, LocalStorage, PageMP, SwiperImgMP } from '../../../../packages/mp'

/**
 * Taro 4 兼容样例页：只做组件行为验证，不含业务接口与生产数据。
 * 每个分组展示当前值、事件次数与最近一次事件摘要，供开发者工具/iOS/Android 人工核对。
 */

export default function Taro4Compat() {
  const [logs, setLogs] = useState<string[]>([])
  const counters = useRef<Record<string, number>>({})
  const refreshingRef = useRef(false)
  const [inputValue, setInputValue] = useState('')
  const [textFieldValue, setTextFieldValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [pickerValue, setPickerValue] = useState('')
  const [keyboardValue, setKeyboardValue] = useState('')
  const [checkboxValues, setCheckboxValues] = useState<string[]>([])
  const [radioValue, setRadioValue] = useState('')
  const [storageValue, setStorageValue] = useState('')
  const [refreshCount, setRefreshCount] = useState(0)
  const [loadMoreCount, setLoadMoreCount] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [routerParams, setRouterParams] = useState('')

  useEffect(() => {
    setRouterParams(
      JSON.stringify(Taro.getCurrentInstance().router?.params || {})
    )
  }, [])

  // 事件记录：计数 + 最近事件摘要
  const log = (name: string, detail?: string) => {
    counters.current[name] = (counters.current[name] || 0) + 1
    const count = counters.current[name]
    setLogs((prev) =>
      [
        `[${name}] #${count} ${detail || ''}`.slice(0, 60),
        ...prev,
      ].slice(0, 12)
    )
  }

  const countOf = (name: string) => counters.current[name] || 0

  // —— 浮层组 ——
  const openDialog = () => {
    log('Dialog.render')
    Dialog.render({
      title: '兼容 Dialog',
      children: <Text>Dialog 内容</Text>,
      onCancel: () => log('Dialog onCancel'),
      onConfirm: () => log('Dialog onConfirm'),
    })
      .then(() => log('Dialog resolved'))
      .catch(() => log('Dialog rejected'))
  }

  const openToast = () => {
    log('Toast.render')
    Toast.tip('Toast 消息')
  }

  const openPopup = () => {
    log('Popup.render')
    Popup.render({
      title: '兼容 Popup',
      children: <Text>Popup 内容</Text>,
      onHide: () => log('Popup closed'),
    })
  }

  const openKeyboard = () => {
    log('DigitalKeyboard.show')
    const keyboard = new DigitalKeyboard({
      form: {
        value: keyboardValue,
      },
      onInput: (v) => {
        setKeyboardValue(v || '')
        log('DigitalKeyboard input', String(v))
      },
    })
    keyboard.show()
  }

  // —— 滚动组 ——
  const handleRefresh = () => {
    if (refreshingRef.current) return
    refreshingRef.current = true
    log('PageMP refresh 触发')
    setTimeout(() => {
      setRefreshCount((c) => c + 1)
      refreshingRef.current = false
      log('PageMP refresh 完成')
    }, 800)
  }

  const handleLoadMore = () => {
    log('PageMP loadMore 触发')
    setTimeout(() => {
      setLoadMoreCount((c) => c + 1)
      log('PageMP loadMore 完成')
    }, 500)
  }

  // —— 能力组 ——
  const testStorage = () => {
    LocalStorage.set('taro4_compat_key', `v-${Date.now()}`)
    const v = LocalStorage.get('taro4_compat_key')
    setStorageValue(String(v))
    log('Storage set/get', String(v))
  }

  const testWxApi = () => {
    try {
      const info = wx.getSystemInfoSync()
      log('wx.getSystemInfoSync', `SDK ${info.SDKVersion}`)
    } catch (e) {
      log('wx API error', String((e as Error)?.message))
    }
  }

  const testUpload = () => {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        log('upload 选图', res.tempFilePaths[0])
        wx.uploadFile({
          url: 'https://example.com/upload',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: () => log('upload done'),
          fail: (err) => log('upload fail', err.errMsg),
        })
      },
      fail: () => log('chooseImage 取消'),
    })
  }

  return (
    <PageMP
      onRefresh={handleRefresh}
      onLoadMore={handleLoadMore}
    >
      <View className='taro4-compat'>
        {/* 事件日志 */}
        <View className='taro4-compat-section'>
          <View className='taro4-compat-title'>事件日志（最近 12 条）</View>
          {logs.length === 0 && <Text className='taro4-compat-log'>暂无事件</Text>}
          {logs.map((item, i) => (
            <Text key={`${i}-${item}`} className='taro4-compat-log'>
              {item}
            </Text>
          ))}
        </View>

        {/* 输入组 */}
        <View className='taro4-compat-section'>
          <View className='taro4-compat-title'>输入组</View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>Input（onInput 计数 {countOf('Input')}）</Text>
            <Input
              value={inputValue}
              placeholder='中文输入/快速删除'
              onInput={(e) => {
                setInputValue(e.detail.value)
                log('Input onInput', e.detail.value)
              }}
              onFocus={() => log('Input focus')}
              onBlur={() => log('Input blur')}
              onConfirm={() => log('Input confirm')}
            />
            <Text className='taro4-compat-value'>当前值: {inputValue}</Text>
          </View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>TextField（计数 {countOf('TextField')}）</Text>
            <TextField
              value={textFieldValue}
              placeholder='带标签输入'
              onChange={(v) => {
                setTextFieldValue(typeof v === 'string' ? v : v && v.target && v.target.value)
                log('TextField onChange', String(typeof v === 'string' ? v : v && v.target && v.target.value))
              }}
            />
            <Text className='taro4-compat-value'>当前值: {textFieldValue}</Text>
          </View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>Search（计数 {countOf('Search')}）</Text>
            <Search
              value={searchValue}
              placeholder='搜索'
              onChange={(v) => {
                setSearchValue(v)
                log('Search onChange', v)
              }}
              onCancel={() => log('Search cancel')}
            />
            <Text className='taro4-compat-value'>当前值: {searchValue}</Text>
          </View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>Textarea（计数 {countOf('Textarea')}）</Text>
            <Textarea
              value={textareaValue}
              placeholder='多行输入'
              onInput={(e) => {
                setTextareaValue(e.detail.value)
                log('Textarea onInput', e.detail.value)
              }}
            />
            <Text className='taro4-compat-value'>当前值: {textareaValue}</Text>
          </View>
        </View>

        {/* 滚动组 */}
        <View className='taro4-compat-section'>
          <View className='taro4-compat-title'>滚动组（PageMP 下方滚动/触底）</View>
          <Text className='taro4-compat-value'>
            刷新完成次数: {refreshCount} ｜ 触底次数: {loadMoreCount}
          </Text>
          <ScrollView
            style={{ height: '160px', border: '1px solid #eee' }}
            scrollY
            onScroll={(e) => {
              setScrollTop(Math.round(e.detail.scrollTop || 0))
            }}
            onScrollToLower={() => log('ScrollView 触底')}
          >
            <View style={{ padding: '12px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <Text key={n} className='taro4-compat-log'>
                  滚动项 {n}
                </Text>
              ))}
            </View>
          </ScrollView>
          <Text className='taro4-compat-value'>ScrollView scrollTop: {scrollTop}</Text>
        </View>

        {/* 浮层组 */}
        <View className='taro4-compat-section'>
          <View className='taro4-compat-title'>浮层组（连续打开/叠加/返回）</View>
          <View className='taro4-compat-row'>
            <Button onClick={openDialog}>Dialog（{countOf('Dialog.render')}）</Button>
            <Button onClick={openToast}>Toast（{countOf('Toast.render')}）</Button>
          </View>
          <View className='taro4-compat-row'>
            <Button onClick={openPopup}>Popup（{countOf('Popup.render')}）</Button>
            <Button onClick={openKeyboard}>数字键盘（{countOf('DigitalKeyboard.render')}）</Button>
          </View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>Picker（滚动列，计数 {countOf('Picker')}）</Text>
            <Picker
              datas={[
                [
                  { value: 'a', text: '选项 A' },
                  { value: 'b', text: '选项 B' },
                  { value: 'c', text: '选项 C' },
                ],
              ]}
              values={pickerValue ? [pickerValue] : ['a']}
              onChange={(newValues) => {
                setPickerValue(String(newValues[0]))
                log('Picker onChange', JSON.stringify(newValues))
              }}
            />
            <Text className='taro4-compat-value'>当前选择: {pickerValue}</Text>
          </View>
          <Text className='taro4-compat-value'>键盘当前值: {keyboardValue}</Text>
        </View>

        {/* 基础组 */}
        <View className='taro4-compat-section'>
          <View className='taro4-compat-title'>基础组</View>
          <View className='taro4-compat-box'>
            <Checkbox
              checked={checkboxValues.includes('1')}
              onChange={() => {
                log('Checkbox 1 toggle')
                setCheckboxValues((prev) =>
                  prev.includes('1') ? prev.filter((v) => v !== '1') : [...prev, '1']
                )
              }}
            >
              选项一
            </Checkbox>
            <Checkbox
              checked={checkboxValues.includes('2')}
              onChange={() => {
                log('Checkbox 2 toggle')
                setCheckboxValues((prev) =>
                  prev.includes('2') ? prev.filter((v) => v !== '2') : [...prev, '2']
                )
              }}
            >
              选项二
            </Checkbox>
            <Text className='taro4-compat-value'>选中: {checkboxValues.join(',')}</Text>
          </View>
          <View className='taro4-compat-box'>
            <Radio
              checked={radioValue === 'x'}
              onChange={() => {
                setRadioValue('x')
                log('Radio onChange', 'x')
              }}
            >
              单选 X
            </Radio>
            <Radio
              checked={radioValue === 'y'}
              onChange={() => {
                setRadioValue('y')
                log('Radio onChange', 'y')
              }}
            >
              单选 Y
            </Radio>
            <Text className='taro4-compat-value'>选中: {radioValue}</Text>
          </View>
          <View className='taro4-compat-row'>
            <Button type='primary' onClick={() => log('Button click primary')}>
              主按钮
            </Button>
            <Button onClick={() => log('Button click default')}>默认按钮</Button>
          </View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>SwiperImgMP / ImageMP</Text>
            <SwiperImgMP
              data={[
                { img: 'https://cdn.guanmai.cn/placeholder-1.png' },
                { img: 'https://cdn.guanmai.cn/placeholder-2.png' },
              ]}
              height='200px'
            />
            <ImageMP
              src='https://cdn.guanmai.cn/placeholder-1.png'
              width='200px'
              height='100px'
            />
          </View>
        </View>

        {/* 媒体组 */}
        <View className='taro4-compat-section'>
          <View className='taro4-compat-title'>媒体组</View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>Canvas（type=2d）</Text>
            <Canvas
              type='2d'
              id='taro4-canvas'
              canvasId='taro4-canvas'
              style={{ width: '300px', height: '150px', border: '1px solid #eee' }}
              onTouchStart={() => log('Canvas touch')}
            />
          </View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>Video</Text>
            <Video
              id='taro4-video'
              src='https://www.w3schools.com/html/mov_bbb.mp4'
              style={{ width: '100%', height: '180px' }}
              onPlay={() => log('Video play')}
            />
          </View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>WebView</Text>
            <WebView src='https://mp.weixin.qq.com/' />
          </View>
          <View className='taro4-compat-box'>
            <Text className='taro4-compat-label'>Image（taro 原生）</Text>
            <Image
              src='https://cdn.guanmai.cn/placeholder-1.png'
              style={{ width: '120px', height: '60px' }}
              onLoad={() => log('Image load')}
            />
          </View>
        </View>

        {/* 能力组 */}
        <View className='taro4-compat-section'>
          <View className='taro4-compat-title'>能力组</View>
          <Text className='taro4-compat-log'>路由参数: {routerParams}</Text>
          <View className='taro4-compat-row'>
            <Button onClick={testStorage}>Storage set/get（{countOf('Storage')}）</Button>
            <Button onClick={testWxApi}>wx API（{countOf('wx')}）</Button>
          </View>
          <View className='taro4-compat-row'>
            <Button onClick={testUpload}>Uploader 选图上传（{countOf('upload')}）</Button>
            <Button onClick={() => Taro.reLaunch({ url: '/pages/index/index' })}>
              Taro.reLaunch
            </Button>
          </View>
          <Text className='taro4-compat-value'>Storage 读回: {storageValue}</Text>
        </View>
      </View>
    </PageMP>
  )
}
