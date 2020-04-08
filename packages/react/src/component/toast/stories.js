import React from 'react'
import Button from '../button'
import Toast from './'

export const normal = () => {
  const handleToast = type => {
    Toast[type](type)
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
      <Button onClick={() => handleToast('loading_linear')}>
        Toast loading_linear
      </Button>
      <div>
        <Button
          onClick={() => {
            Toast.success({
              time: 0,
              children: (
                <div>
                  <div>保存成功啦保存成功啦保存成功啦保存成功啦</div>
                </div>
              )
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
  title: 'Toast'
}
