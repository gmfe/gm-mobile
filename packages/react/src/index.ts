// 表单
import { Keyboard, KeyboardWrap } from './component/keyboard'

// 基础
import FlipNumber from './component/flip_number'
import Counter from './component/counter'
import ProgressBar from './component/progress_bar'

// 布局
import { Tabbar, FlowBtnTabbar } from './component/tab_bar'
import PullUpDown from './component/pull_up_down'
import List from './component/list'
import Scroll from './component/scroll'

// 浮层
import NProgress from './component/nprogress'

// 其他
import {
  LetterIndex,
  LetterIndexMultiple,
} from './component/letter_index/index'
import CSSVariable from './css_variable'
import Canvas from './component/canvas'
import { LocalStorage, SessionStorage } from './storage'

import {
  Button,
  ButtonTime,
  Flex,
  Mask,
  Page,
  Toast,
  Loading,
  LayoutRoot,
  Label,
  Badge,
  Tabs,
  Switch,
  TagWrap,
  Square,
  Calendar,
  RangeCalendar,
  MultipleCalendar,
  Dialog,
  Checkbox,
  Radio,
  Divider,
  Popup,
  Tooltip,
  ActionSheet,
  Search,
  FakeSearch,
  SearchPage,
  InnerLayer,
  Input,
  InputPassword,
  InputMaxLength,
  Textarea,
  Cells,
  Cell,
  CellForm,
  CellsForm,
  Picker,
  CouplingPicker,
  ConfirmPicker,
  ConfirmCouplingPicker,
  SelectPicker,
  RepeatTimes,
  Price,
  Panel,
  Nav,
  VList,
  Status,
} from '@gm-mobile/c-react'

const Alert = Dialog.alert
const Confirm = Dialog.confirm
const Prompt = Dialog.prompt
const Delete = Dialog.delete

export {
  // 表单
  Button,
  ButtonTime,
  Checkbox,
  Radio,
  Input,
  InputPassword,
  InputMaxLength,
  Switch,
  Textarea,
  Cells,
  Cell,
  CellForm,
  CellsForm,
  Picker,
  CouplingPicker,
  ConfirmPicker,
  ConfirmCouplingPicker,
  SelectPicker,
  Keyboard,
  KeyboardWrap,
  RangeCalendar,
  MultipleCalendar,
  Calendar,
  // 基础
  FlipNumber,
  Label,
  Loading,
  Price,
  Counter,
  Badge,
  TagWrap,
  ProgressBar,
  // 布局
  Flex,
  Divider,
  Page,
  Tabbar,
  FlowBtnTabbar,
  Square,
  Panel,
  PullUpDown,
  List,
  Scroll,
  Nav,
  Tabs,
  // 浮层
  LayoutRoot,
  InnerLayer,
  NProgress,
  Toast,
  Mask,
  Popup,
  Dialog,
  Alert,
  Confirm,
  Prompt,
  Delete,
  Tooltip,
  ActionSheet,
  // 其他
  LetterIndex,
  LetterIndexMultiple,
  Search,
  FakeSearch,
  SearchPage,
  RepeatTimes,
  CSSVariable,
  LocalStorage,
  SessionStorage,
  Canvas,
  VList,
  Status,
}

export * from './component/image'
export * from './component/lazy'
export * from './component/form_scroll_into_view'
export * from './component/uploader'
export * from './component/header'
