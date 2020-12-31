// 表单
import { Keyboard, KeyboardWrap } from './component/keyboard'

// 基础
import FlipNumber from './component/flip_number'

// 布局
import { Tabbar, FlowBtnTabbar } from './component/tab_bar'
import PullUpDown from './component/pull_up_down'
import List from './component/list'

// 浮层
import NProgress from './component/nprogress'

// 其他
import {
  LetterIndex,
  LetterIndexMultiple,
} from './component/letter_index/index'
import CSSVariable from './css_variable'
import { LocalStorage, SessionStorage } from './storage'

import { Dialog } from '@gm-mobile/c-react'

const Alert = Dialog.alert
const Confirm = Dialog.confirm
const Prompt = Dialog.prompt
const Delete = Dialog.delete

export {
  Keyboard,
  KeyboardWrap,
  // 基础
  FlipNumber,
  Tabbar,
  FlowBtnTabbar,
  PullUpDown,
  List,
  NProgress,
  Alert,
  Confirm,
  Prompt,
  Delete,
  // 其他
  LetterIndex,
  LetterIndexMultiple,
  CSSVariable,
  LocalStorage,
  SessionStorage,
}

export * from '@gm-mobile/c-react'

export * from './component/image'
export * from './component/lazy'
export * from './component/form_scroll_into_view'
export * from './component/uploader'
export * from './component/header'
export * from './component/counter'
export * from './component/progress_bar'
export * from './component/scroll'
export * from './component/canvas'
