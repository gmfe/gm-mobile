import React from 'react'
import Button from '../button'
import Toast from './'

export const normal = () => {
  const handleToast = (type) => {
    Toast[type]('提示' + type)
  }

  return (
    <div>
      <Button onClick={() => handleToast('tip')}>Toast tip</Button>
      <Button onClick={() => handleToast('success')}>Toast success</Button>
      <Button onClick={() => handleToast('info')}>Toast info</Button>
      <Button onClick={() => handleToast('warning')}>Toast warning</Button>
      <Button onClick={() => handleToast('danger')}>Toast danger</Button>
      <Button
        onClick={() => {
          Toast.loading()
        }}
      >
        Toast loading
      </Button>
      <div>
        <Button
          onClick={() => {
            Toast.success({
              children: (
                <div>
                  <div>保存成功啦保存成功啦保存成功啦保存成功啦</div>
                </div>
              ),
            })
          }}
        >
          Toast success children
        </Button>
      </div>
    </div>
  )
}

export default {
  title: '浮层/Toast',
}
