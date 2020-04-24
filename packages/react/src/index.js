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
import Calendar from './component/calendar'
import { Keyboard, KeyboardWrap } from './component/keyboard'
import Checkbox from './component/checkbox'
import { LetterIndex, LetterIndexMultiple } from './component/letter_index'
import { Input, InputPassword } from './component/input'
import Radio from './component/radio'

// 布局
import Flex from './component/flex'
import Divider from './component/divider'
import Page from './component/page'
import Header from './component/header'
import { Search, SearchPage, FakeSearch } from './component/search'
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

// 基础
import FlipNumber from './component/flip_number'
import Image from './component/image'
import Label from './component/label'
import Loading from './component/loading'
import Slider from './component/slider'
import SliderLess from './component/slider_less'
import Price from './component/price'
import Counter from './component/counter'

// 其他
import { LocalStorage, SessionStorage } from './component/storage'
import CSSVariable from './css_variable'

// import Infinite from './component/infinite'
// import InfiniteBox from './component/infinite/infinite_box'

// import Trigger from './component/trigger'
// import Tooltip from './component/tooltip'
// import List from './component/list'

// import TimeSelect from './component/time_select'

const Alert = Dialog.alert
const Confirm = Dialog.confirm

export {
  // 表单
  ScrollIntoView,
  Button,
  ButtonTime,
  Switch,
  Checkbox,
  Input,
  InputPassword,
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
  KeyboardWrap,
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
  PreviewImage,
  // 基础
  FlipNumber,
  Image,
  Label,
  Loading,
  Slider,
  SliderLess,
  Lazy,
  LazyList,
  Counter,
  Price,
  // 其他
  CSSVariable,
  LocalStorage,
  SessionStorage,

  // Infinite,
  // InfiniteBox,
  // Trigger,
  // Tooltip,

  // List,

  //
  // // 业务组件
  // TimeSelect
}
