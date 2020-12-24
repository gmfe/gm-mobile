import { HTMLAttributes, ChangeEvent, DragEvent } from 'react'

interface UploaderProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean
  onUpload: (
    files: UploaderFile[],
    e?: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>
  ) => void
  accept?: string
}

interface UploaderFile extends File {
  preview: string
}

export type { UploaderProps, UploaderFile }
