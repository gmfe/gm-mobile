import { CSSProperties, HtmlHTMLAttributes } from 'react'
import { PageProps } from '../page'

interface SearchPageProps extends Omit<PageProps, 'onChange'> {
  active: boolean
  onCancel: () => void
  /** 存在建议搜索词，所以需要把 value 交给调用方控制 */
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
}

interface SearchOption {
  name?: string
  key: string
}

interface SearchProps {
  value: string
  onChange: (value: string) => void
  /** 'search': 带搜索按钮 'cancel'：带取消按钮 */
  type?: 'search' | 'cancel'
  autoFocus?: boolean
  /** 即时搜索可不传 */
  onSearch?: (value: string) => void
  onCancel?: () => void
  placeholder?: string
  /** 自定义搜索按钮文案 */
  searchText?: string
  className?: string
  style?: CSSProperties
  /** options */
  searchType?: string
  searchOptions?: SearchOption[]
  onSearchType?: (key: string) => void
}

interface FakeSearchProps extends HtmlHTMLAttributes<HTMLDivElement> {
  placeholder?: string
  center?: boolean
  light?: boolean
}

export type { SearchPageProps, SearchProps, SearchOption, FakeSearchProps }
