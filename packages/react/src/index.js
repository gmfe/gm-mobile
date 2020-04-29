// 表单
import ScrollIntoView from './component/scroll_into_view'
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
import { Calendar, RangeCalendar } from './component/calendar'
import { Keyboard, KeyboardWrap } from './component/keyboard'
import Checkbox from './component/checkbox'
import { LetterIndex, LetterIndexMultiple } from './component/letter_index'
import { Input, InputPassword, BorderInput } from './component/input'
import Radio from './component/radio'

// 布局
import Flex from './component/flex'
import Divider from './component/divider'
import Page from './component/page'
import Header from './component/header'

import Square from './component/square'
import Tabs from './component/tabs'
import Panel from './component/panel'
import { Lazy, LazyList } from './component/lazy'
import Tabbar from './component/tab_bar'

// 浮层
import LayerRoot from './component/layer_root'
import NProgress from './component/nprogress'
import InnerLayer from './component/inner_layer'
import Toast from './component/toast'
import Dialog from './component/dialog'
import Mask from './component/mask'
import Popup from './component/popup'
import PreviewImage from './component/preview_image'
import Tooltip from './component/tooltip'

// 基础
import FlipNumber from './component/flip_number'
import Image from './component/image'
import Label from './component/label'
import Loading from './component/loading'
import Price from './component/price'
import Counter from './component/counter'
import Badge from './component/badge'
import { Search, SearchPage, FakeSearch } from './component/search'

// 其他
import { LocalStorage, SessionStorage } from './component/storage'
import CSSVariable from './css_variable'

// import Infinite from './component/infinite'
// import InfiniteBox from './component/infinite/infinite_box'

// import List from './component/list'

// import TimeSelect from './component/time_select'

const Alert = Dialog.alert
const Confirm = Dialog.confirm
const Prompt = Dialog.prompt
const Delete = Dialog.delete

export {
  // 表单
  ScrollIntoView,
  Button,
  ButtonTime,
  Switch,
  Checkbox,
  Input,
  InputPassword,
  BorderInput,
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
  RangeCalendar,
  Keyboard,
  KeyboardWrap,
  LetterIndex,
  LetterIndexMultiple,
  Radio,
  // 布局
  Flex,
  Divider,
  Page,
  Header,
  Square,
  Tabs,
  Panel,
  Tabbar,
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
  Prompt,
  Delete,
  PreviewImage,
  Tooltip,
  // 基础
  FlipNumber,
  Image,
  Label,
  Loading,
  Lazy,
  LazyList,
  Counter,
  Price,
  Badge,
  Search,
  FakeSearch,
  SearchPage,
  // 其他
  CSSVariable,
  LocalStorage,
  SessionStorage,

  // Infinite,
  // InfiniteBox,

  // List,

  //
  // // 业务组件
  // TimeSelect
}
