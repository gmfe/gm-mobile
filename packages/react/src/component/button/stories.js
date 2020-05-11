import React, { useState } from 'react'
import { observable } from 'mobx'
import { Button, ButtonTime } from './'

const store = observable({
  code: '',
  canCounter: false,
  setCode(value) {
    this.code = value
  },
  setCanCounter(value) {
    this.canCounter = value
  },
})

function handleClick() {
  console.log('click')
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true)
    }, 2000)
  )
}

export const normal = () => (
  <div>
    默认
    <div>
      <Button>默认</Button>

      <Button type='primary'>主色</Button>
      <Button type='danger'>危险</Button>
      <Button type='link'>Link</Button>
      <Button type='link' href='google.com' target='_blank'>
        链接
      </Button>
    </div>
    plain
    <div>
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
    </div>
    disabled
    <div>
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
    </div>
    size
    <div>
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
    </div>
    block
    <div>
      <Button block type='primary'>
        主色
      </Button>
      <Button block mini plain>
        主色
      </Button>
    </div>
  </div>
)

export const loading = () => (
  <div>
    loading
    <div>
      <Button loading>加载中</Button>
    </div>
    onClick promise
    <div>
      <Button onClick={handleClick}>点击显示 loading</Button>
      <Button type='primary' onClick={handleClick}>
        点击显示 loading
      </Button>
      <Button type='danger' onClick={handleClick}>
        点击显示 loading
      </Button>
    </div>
  </div>
)

export const buttonTime = () => (
  <div>
    <div>
      <p>直接计时</p>
      <ButtonTime
        mini
        time={10}
        type='primary'
        onClick={() => {
          console.log('get')
        }}
      >
        获取验证码
      </ButtonTime>
    </div>
    <div>
      <p>输入项不为空，才允许计时(通过onClick事件控制)</p>
      <input
        placeholder='输入后，可开始计时'
        value={store.code}
        onChange={(e) => {
          const value = e.target.value
          store.setCode(value)
          store.setCanCounter(!!value)
        }}
      />
      <ButtonTime
        mini
        time={10}
        type='primary'
        onClick={() => {
          if (store.canCounter) {
            console.log('get')
          }
          return store.canCounter
        }}
      >
        获取验证码
      </ButtonTime>
    </div>
    <div>
      <p>异步计时(通过onClick事件控制)</p>
      <ButtonTime time={10} type='primary' onClick={handleClick}>
        获取验证码
      </ButtonTime>
    </div>
  </div>
)

export default {
  title: '表单/Button',
}
