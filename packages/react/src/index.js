import Flex from './component/flex'
import Button from './component/button'
import Loading from './component/loading'
import NProgress from './component/nprogress'
import Mask from './component/mask'
import Toast from './component/toast'
import Page from './component/page'
// import Infinite from './component/infinite'
// import InfiniteBox from './component/infinite/infinite_box'
import Header from './component/header'
import Storage from './component/storage'
// import Slider from './component/slider'
// import SliderLess from './component/slider_less'
import Popup from './component/popup'
import { Search, SearchPage, FakeSearch } from './component/search'
import Square from './component/square'
// import LazyImg from './component/lazy_img'
import Dialog from './component/dialog'
import Switch from './component/switch'
import ScrollIntoView from './component/scroll_into_view'
import CursorFix from './component/cursor_fix'
// import ScrollIntoView from './component/scroll_into_view'
// import CursorFix from './component/cursor_fix'
// import Trigger from './component/trigger'
// import Tooltip from './component/tooltip'
// import PreviewImage from './component/preview_image'
import LayerRoot from './component/layer_root'
// import Price from './component/price'
// import Counter from './component/counter'

// import Divider from './component/divider'
import Uploader from './component/uploader'
import { Cells, Cell, CellForm } from './component/cell'

import Tabs from './component/tabs'
import {
  Picker,
  ConfirmPicker,
  CouplingPicker,
  ConfirmCouplingPicker,
  SelectPicker,
} from './component/picker'
// import { setLocale } from './locales'
import Calendar from './component/calendar'
import FlipNumber from './component/flip_number'
// import InnerLayer from './component/inner_layer'
import InputNumber from './component/input_number'
import Keyboard from './component/keyboard'
import Radio from './component/radio'
//
// import List from './component/list'
import { LetterIndex, LetterIndexMultiple } from './component/letter_index'
// import ProgressBar from './component/progress'
// import TimeSelect from './component/time_select'
import Input from './component/input'
import CSSVariable from './css_variable'

const Alert = Dialog.alert
const Confirm = Dialog.confirm

CSSVariable.init()

export {
  CSSVariable,
  Flex,
  Button,
  Loading,
  LayerRoot,
  Page,
  Toast,
  // Infinite,
  // InfiniteBox,
  NProgress,
  Mask,
  Header,
  Storage,
  // Slider,
  // SliderLess,
  Popup,
  Search,
  FakeSearch,
  SearchPage,
  Square,
  // LazyImg,

  Dialog,
  Alert,
  Confirm,
  ScrollIntoView,
  CursorFix,
  // ScrollIntoView,
  // CursorFix,
  // Trigger,
  // Tooltip,
  // PreviewImage,

  // Price,
  // Counter,
  // Divider,
  // InnerLayer,
  Uploader,
  Switch,
  Cells,
  Cell,
  CellForm,
  Tabs,
  Picker,
  ConfirmPicker,
  CouplingPicker,
  ConfirmCouplingPicker,
  SelectPicker,
  Calendar,
  //
  FlipNumber,
  InputNumber,
  Keyboard,
  Radio,
  Input,
  // List,
  LetterIndex,
  LetterIndexMultiple,
  //
  // setLocale,
  // ProgressBar,
  // // 业务组件
  // TimeSelect
}
