import { createContext } from 'react'
import { FormInstance } from '../../hooks'
export interface FormContextProps
  extends Partial<Omit<FormInstance, 'apiDoValidate'>> {
  values?: { [key: string]: any }
  hideItems?: { [key: string]: boolean }
  onChange?(fieldName: string, originValue: any): any
}
export const FormContext = createContext<FormContextProps>({
  values: {},
  hideItems: {},
})
