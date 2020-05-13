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
import { Calendar, RangeCalendar, MultipleCalendar } from './component/calendar'
import { Keyboard, KeyboardWrap } from './component/keyboard'
import Checkbox from './component/checkbox'
import { Input, InputPassword, BorderInput } from './component/input'
import Radio from './component/radio'

// 布局
import Flex from './component/flex'
import Divider from './component/divider'
import Page from './component/page'
import Header from './component/header'

import Square from './component/square'
import Tabs from './component/tabs'
import Nav from './component/nav'
import Panel from './component/panel'
import { Lazy, LazyList } from './component/lazy'
import Tabbar from './component/tab_bar'
import PullUpDown from './component/pull_up_down'

// 浮层
import LayoutRoot from './component/layout_root'
import NProgress from './component/nprogress'
import InnerLayer from './component/inner_layer'
import Toast from './component/toast'
import Dialog from './component/dialog'
import Mask from './component/mask'
import Popup from './component/popup'
import PreviewImage from './component/preview_image'
import Tooltip from './component/tooltip'
import ActionSheet from './component/action_sheet'

// 基础
import FlipNumber from './component/flip_number'
import Image from './component/image'
import Label from './component/label'
import Loading from './component/loading'
import Price from './component/price'
import Counter from './component/counter'
import Badge from './component/badge'
import { Search, SearchPage, FakeSearch } from './component/search'
import Scroll from './component/scroll'
import RepeatTimes from './component/repeat_times'
import TagWrap from './component/tag'
import List from './component/list'
import { LetterIndex, LetterIndexMultiple } from './component/letter_index'

// 其他
import { LocalStorage, SessionStorage } from './component/storage'
import CSSVariable from './css_variable'

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
  MultipleCalendar,
  Keyboard,
  KeyboardWrap,
  Radio,
  // 布局
  Flex,
  Divider,
  Page,
  Header,
  Square,
  Tabs,
  Nav,
  Panel,
  Tabbar,
  PullUpDown,
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
  PreviewImage,
  Tooltip,
  ActionSheet,
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
  Scroll,
  RepeatTimes,
  TagWrap,
  List,
  LetterIndex,
  LetterIndexMultiple,
  // 其他
  CSSVariable,
  LocalStorage,
  SessionStorage,
}
