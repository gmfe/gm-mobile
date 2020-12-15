import React from 'react'
import Button, { ButtonTime } from '.'
import View from '../view'

function handleClick() {
  console.log('click')
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, 2000)
  )
}

export const normal = () => (
  <View>
    默认
    <View>
      <Button>默认</Button>

      <Button type='primary'>主色</Button>
      <Button type='danger'>危险</Button>
      <Button
        type='link'
        onClick={() => {
          window.open('https://www.google.com')
        }}
      >
        Link
      </Button>
    </View>
    plain
    <View>
      <Button plain>默认</Button>
      <Button plain type='primary'>
        主色
      </Button>
      <Button plain type='danger'>
        危险
      </Button>
      <Button plain type='link'>
        Link
      </Button>
    </View>
    disabled
    <View>
      <Button disabled>默认</Button>
      <Button disabled type='primary'>
        主色
      </Button>
      <Button disabled type='danger'>
        危险
      </Button>
      <Button disabled type='link'>
        Link
      </Button>
    </View>
    size
    <View>
      <Button type='primary' mini>
        默认
      </Button>
      <Button mini>小按钮</Button>
      <Button mini type='link'>
        Link
      </Button>
      <Button mini type='link' className='m-text'>
        纯文字
      </Button>
    </View>
    block
    <View>
      <Button block type='primary'>
        主色
      </Button>
      <Button block mini plain>
        主色
      </Button>
    </View>
    noRound
    <View>
      <Button noRound type='primary'>
        主色
      </Button>
    </View>
  </View>
)

export const loading = () => (
  <View>
    loading
    <View>
      <Button loading>加载中</Button>
    </View>
    onClick promise
    <View>
      <Button onClick={handleClick}>点击显示 loading</Button>
      <Button type='primary' onClick={handleClick}>
        点击显示 loading
      </Button>
      <Button type='danger' onClick={handleClick}>
        点击显示 loading
      </Button>
    </View>
  </View>
)

export const buttonTime = () => (
  <View>
    <View>
      <View>输入项不为空，才允许计时(通过onClick事件控制)</View>
      <ButtonTime
        mini
        time={10}
        type='primary'
        onClick={() => {
          // 阻止 false or promise reject
          return false
        }}
      >
        获取验证码。阻止
      </ButtonTime>
    </View>
    <View>
      <View>异步计时(通过onClick事件控制)</View>
      <ButtonTime time={10} type='primary' onClick={handleClick}>
        获取验证码
      </ButtonTime>
    </View>
  </View>
)

export default {
  title: '表单/Button',
}
