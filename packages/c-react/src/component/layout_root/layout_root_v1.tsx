import React, {
  FC,
  useState,
  ReactNode,
  useEffect,
  HTMLAttributes,
} from 'react'
import _ from 'lodash'
import { is } from '@gm-mobile/c-tool'

import { View } from '../view'
import getPath from './get_path'
import {
  LayoutRootType,
  LayoutRootState,
  CBMapV1Type,
  LayoutV1RootStatic,
} from './types'

const cbMap: CBMapV1Type = {}

/**
 * @description: 目前仅用于Popup的多层弹窗
 */
const LayoutRootV1: FC<HTMLAttributes<HTMLDivElement>> & LayoutV1RootStatic = ({
  style,
  ...rest
}) => {
  const path = getPath()
  const [state, setState] = useState<LayoutRootState>({})

  useEffect(() => {
    cbMap[path] = (type: LayoutRootType, component: ReactNode, id) => {
      setState((s) => {
        // 这里必须用新的数组，否则指针指向上次的s[type]，不会触发render
        const newC = [...(s[type] || [])]
        // 有传id说明要移除
        if (id) {
          // 找到对应要移除的index
          const index = newC.findIndex(
            // @ts-ignore
            (component) => component?.props?.id === id
          )
          // 找到则移除
          index > -1 && newC.splice(index, 1)
        } else {
          // 否则是增加
          newC.push(component)
        }
        return {
          ...s,
          [type]: newC,
        }
      })
    }

    return () => {
      delete cbMap[path]
    }
  }, [])

  // 有层级关系
  return (
    <View
      style={{
        ...style,
        display: state.popup && state.popup.length > 0 ? 'block' : 'none',
      }}
      {...rest}
    >
      {/* {state.innerLayer} */}
      {state.popup}
      {/* {state.modal}
      {state.toast}
      {state.nProgress} */}
    </View>
  )
}

LayoutRootV1.Type = LayoutRootType

LayoutRootV1.setComponent = (type, com, id) => {
  // 说明：针对toast在切换页面后没有正常消失做清除处理
  if (type === LayoutRootType.TOAST && com === null) {
    _.forIn(cbMap, (cb) => {
      if (cb) {
        cb(type, com)
      }
    })
  } else {
    const path = getPath()
    if (cbMap[path]) {
      cbMap[path]!(type, com, id)
    } else {
      console.warn('LayoutRootV1 is uninitialized')
    }
  }
}

LayoutRootV1.removeComponent = (type, id) => {
  LayoutRootV1.setComponent(type, null, id)
}

// 这种写法 附带 History 功能
LayoutRootV1.renderWith = (type, component, option) => {
  const options = Object.assign({ onPopStateCallback: _.noop }, option)

  LayoutRootV1.setComponent(type, component)
  // 小程序没有 history，也不需要
  if (!is.weApp()) {
    const popstate = (e: any) => {
      const typeStack = [
        LayoutRootType.INNER_LAYER,
        LayoutRootType.POPUP,
        LayoutRootType.PICKER,
        LayoutRootType.KEYBOARD,
        LayoutRootType.MODAL,
      ]
      // 浮层会有很多，popstate 都会响应。 但是如果浮层之上还有其他浮层的话不应该响应。
      // 所以判断下
      if (
        e.state &&
        typeStack.indexOf(e.state.type) >= typeStack.indexOf(type)
      ) {
        return
      }

      LayoutRootV1.removeComponent(type)

      // 需要给个回调，响应 popstate 的情况。否则没其他办法通知回去。
      options.onPopStateCallback()

      window.removeEventListener('popstate', popstate)
    }

    window.addEventListener('popstate', popstate)

    window.history.pushState({ type }, '')
  }
}

LayoutRootV1.hideWith = (type, id) => {
  LayoutRootV1.removeComponent(type, id)

  // 小程序没有 history，也不需要
  if (!is.weApp()) {
    window.history.go(-1)
  }
}

export default LayoutRootV1
