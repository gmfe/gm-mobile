import { HTMLAttributes } from 'react'

type InnerLayerProps = HTMLAttributes<HTMLDivElement>
interface InnerLayerStaticsTypes {
  render: (props: InnerLayerProps) => void
  hide: () => void
}
export type { InnerLayerProps, InnerLayerStaticsTypes }
