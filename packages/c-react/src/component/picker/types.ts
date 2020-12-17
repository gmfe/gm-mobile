interface PickerStaticProps<T> {
  render: (option: T) => void
  hide: () => void
}

interface OptionsProps {}

export type { OptionsProps, PickerStaticProps }
