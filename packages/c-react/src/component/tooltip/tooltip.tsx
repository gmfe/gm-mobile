import React, {
  cloneElement,
  FC,
  ReactElement,
  MouseEvent,
  ReactNode,
} from 'react'
import { Popup } from '../popup'
import { View } from '../view'

interface TooltipProps {
  content: ReactNode
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  title?: string
}

export const Tooltip: FC<TooltipProps> = ({
  title,
  content,
  onClick,
  children,
}) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    Popup.render({
      title,
      bottom: true,
      children: <View style={{ minHeight: '100px' }}>{content}</View>,
      onHide: Popup.hide,
    })

    onClick && onClick(e)
  }

  return cloneElement(children as ReactElement, {
    onClick: handleClick,
  })
}

export default Tooltip
export type { TooltipProps }
