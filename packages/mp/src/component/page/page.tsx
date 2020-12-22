import React, {
  useEffect,
  useRef,
  HtmlHTMLAttributes,
  ReactNode,
  CSSProperties,
  FC,
} from 'react'
import { Page as PageBase, LayoutRoot } from '@gm-mobile/c-react'

interface PageMPProps extends HtmlHTMLAttributes<HTMLDivElement> {
  loading?: boolean
  error?: boolean
  onReload?: () => void
  white?: boolean
  header?: ReactNode
  tabbar?: ReactNode
  top?: ReactNode
  bottom?: ReactNode
  pageClassName?: string
  pageStyle?: CSSProperties
}

const PageMP: FC<PageMPProps> = (props) => {
  const refLoading = useRef<boolean | undefined>(false)
  useEffect(() => {
    // 和之前的不一样
    if (props.loading !== refLoading.current) {
      if (props.loading) {
        wx.showNavigationBarLoading()
      } else {
        wx.hideNavigationBarLoading()
      }

      refLoading.current = props.loading
    }
  }, [props.loading])

  return (
    <>
      <PageBase {...props} />
      <LayoutRoot />
    </>
  )
}

export default PageMP
export type { PageMPProps }
