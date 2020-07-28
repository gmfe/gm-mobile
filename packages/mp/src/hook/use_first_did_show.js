import { useRef } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'

const useFirstDidShow = (fun) => {
  const isFirst = useRef(true)

  useDidShow(() => {
    if (isFirst.current) {
      isFirst.current = false
      fun()
    }
  })

  useDidHide(() => {
    isFirst.current = false
  })
}

export default useFirstDidShow
