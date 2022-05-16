// 表单
import ActionSheet from './component/action_sheet'
import Badge from './component/badge'
import { Button, ButtonTime } from './component/button'
import { Calendar, MultipleCalendar, RangeCalendar } from './component/calendar'
import Canvas from './component/canvas'
import { Cell, CellForm, Cells, CellsForm } from './component/cell'
import Checkbox from './component/checkbox'
import Counter from './component/counter'
import Dialog from './component/dialog'
import Divider from './component/divider'
// 布局
import Flex from './component/flex'
// 基础
import FlipNumber from './component/flip_number'
import Header from './component/header'
import Image from './component/image'
import InnerLayer from './component/inner_layer'
import { BorderInput, Input, InputPassword } from './component/input'
import { Keyboard, KeyboardWrap } from './component/keyboard'
import Label from './component/label'
// 浮层
import LayoutRoot from './component/layout_root'
import { Lazy, LazyList } from './component/lazy'
// 其他
import { LetterIndex, LetterIndexMultiple } from './component/letter_index'
import List from './component/list'
import Loading from './component/loading'
import Mask from './component/mask'
import Nav from './component/nav'
import NProgress from './component/nprogress'
import Page from './component/page'
import Panel from './component/panel'
import {
  ConfirmCouplingPicker,
  ConfirmPicker,
  CouplingPicker,
  Picker,
  SearchPicker,
  SelectPicker,
} from './component/picker'
import Popup from './component/popup'
import Price from './component/price'
import ProgressBar from './component/progress_bar'
import PullUpDown from './component/pull_up_down'
import Radio from './component/radio'
import RepeatTimes from './component/repeat_times'
import Scroll from './component/scroll'
import ScrollIntoView from './component/scroll_into_view'
import { FakeSearch, Search, SearchPage } from './component/search'
import Square from './component/square'
import { LocalStorage, SessionStorage } from './component/storage'
import Switch from './component/switch'
import Tabs from './component/tabs'
import { FlowBtnTabbar, Tabbar } from './component/tab_bar'
import TagWrap from './component/tag'
import Textarea from './component/textarea'
import Toast from './component/toast'
import Tooltip from './component/tooltip'
import Uploader from './component/uploader'
import CSSVariable from './css_variable'

const Alert = Dialog.alert
const Confirm = Dialog.confirm
const Prompt = Dialog.prompt
const Delete = Dialog.delete

export {
  Button,
  ButtonTime,
  Checkbox,
  Radio,
  Input,
  InputPassword,
  BorderInput,
  Switch,
  Uploader,
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
  SearchPicker,
  Keyboard,
  KeyboardWrap,
  RangeCalendar,
  MultipleCalendar,
  Calendar,
  ScrollIntoView,
  // 基础
  FlipNumber,
  Image,
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
  Header,
  Tabbar,
  FlowBtnTabbar,
  Square,
  Panel,
  Lazy,
  LazyList,
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
}
