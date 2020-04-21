import React from 'react'
// 表单
import ScrollIntoView from './component/scroll_into_view'
import CursorFix from './component/cursor_fix'
import { Button, ButtonTime } from './component/button'
import Switch from './component/switch'
import Uploader from './component/uploader'
import { Cells, Cell, CellForm, CellsForm } from './component/cell'
import Textarea from './component/textarea'
import {
  Picker,
  ConfirmPicker,
  CouplingPicker,
  ConfirmCouplingPicker,
  SelectPicker,
} from './component/picker'
import Calendar from './component/calendar'
import Keyboard from './component/keyboard'
import Checkbox from './component/checkbox'
import { LetterIndex, LetterIndexMultiple } from './component/letter_index'
import { Input, InputPassword, InputNumber } from './component/input'
import Radio from './component/radio'

// 布局
import Flex from './component/flex'
import Divider from './component/divider'
import Page from './component/page'
import Header from './component/header'
import { Search, SearchPage, FakeSearch } from './component/search'
import Square from './component/square'
import Tabs from './component/tabs'
import FlipNumber from './component/flip_number'
import Panel from './component/panel'
import Loading from './component/loading'

// 浮层
import LayerRoot from './component/layer_root'
import NProgress from './component/nprogress'
import InnerLayer from './component/inner_layer'
import Toast from './component/toast'
import Dialog from './component/dialog'
import Mask from './component/mask'
import Popup from './component/popup'

// 其他
import Storage from './component/storage'
import CSSVariable from './css_variable'

// import Infinite from './component/infinite'
// import InfiniteBox from './component/infinite/infinite_box'

// import Slider from './component/slider'
// import SliderLess from './component/slider_less'

// import LazyImg from './component/lazy_img'

// import ScrollIntoView from './component/scroll_into_view'
// import CursorFix from './component/cursor_fix'
// import Trigger from './component/trigger'
// import Tooltip from './component/tooltip'
// import PreviewImage from './component/preview_image'

// import Price from './component/price'
// import Counter from './component/counter'

// import { setLocale } from './locales'

//
// import List from './component/list'

// import ProgressBar from './component/progress'
// import TimeSelect from './component/time_select'

// 假的
const Price = () => {
  return <span>todo</span>
}

Price.setUnit = () => {}
Price.setCurrency = () => {}
Price.setCurrencyList = () => {}
Price.format = () => 'todo'
Price.getUnit = () => 'todo'

const Alert = Dialog.alert
const Confirm = Dialog.confirm

export {
  // 表单
  ScrollIntoView,
  CursorFix,
  Button,
  ButtonTime,
  Switch,
  Checkbox,
  Input,
  InputPassword,
  InputNumber,
  Uploader,
  Cells,
  Cell,
  CellForm,
  CellsForm,
  Textarea,
  Picker,
  ConfirmPicker,
  CouplingPicker,
  ConfirmCouplingPicker,
  SelectPicker,
  Calendar,
  Keyboard,
  FlipNumber,
  LetterIndex,
  LetterIndexMultiple,
  Radio,
  // 布局
  Flex,
  Divider,
  Page,
  Header,
  Search,
  FakeSearch,
  SearchPage,
  Square,
  Tabs,
  Panel,
  Loading,
  // 浮层
  LayerRoot,
  InnerLayer,
  NProgress,
  Toast,
  Mask,
  Popup,
  Dialog,
  Alert,
  Confirm,
  // 其他
  CSSVariable,
  Storage,
  Price,
  // Slider,
  // SliderLess,
  // LazyImg,
  // Infinite,
  // InfiniteBox,
  // ScrollIntoView,
  // CursorFix,
  // Trigger,
  // Tooltip,
  // PreviewImage,

  // Counter,

  // List,

  //
  // setLocale,
  // ProgressBar,
  // // 业务组件
  // TimeSelect
}
