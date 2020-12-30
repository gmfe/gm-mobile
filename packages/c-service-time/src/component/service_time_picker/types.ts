interface ServiceTimePickerProps {
  onConfirm?: (data: any) => void
  order: object
}

interface MultiOrderReceiveTimePickerProps {
  onConfirm?: (data: any) => void
  order: object
}

interface ServiceTimePickerStaticTypes {
  render: (props: any) => Promise<any>
  verifyReceiveTime: (data: any) => boolean
  hide: () => void
}

interface MultiOrderReceiveTimePickerStaticTypes {
  render: (props: any) => Promise<any>
  hide: () => void
}

export type {
  ServiceTimePickerProps,
  MultiOrderReceiveTimePickerProps,
  ServiceTimePickerStaticTypes,
  MultiOrderReceiveTimePickerStaticTypes,
}
