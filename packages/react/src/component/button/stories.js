import React from 'react'
import Button from './'

function handleClick() {
  console.log('click')
  return new Promise((resolve) => setTimeout(() => resolve(), 2000))
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
      <Button size='lg'>大按钮</Button>
      <Button>默认</Button>
      <Button size='sm'>小按钮</Button>
    </div>
    block
    <div>
      <Button block>默认</Button>
      <Button block plain>
        默认
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
      <Button type='success' onClick={handleClick}>
        点击显示 loading
      </Button>
      <Button type='danger' onClick={handleClick}>
        点击显示 loading
      </Button>
    </div>
  </div>
)

export default {
  title: 'Button',
}
