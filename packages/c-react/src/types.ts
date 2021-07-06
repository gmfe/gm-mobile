type StringOrKeyofT<T, V = keyof T> = keyof any extends V ? string : V

type RecordPartial<K, V> = {
  [P in StringOrKeyofT<K>]?: V
}

type anyCallback<T = any> = (...args: any[]) => T
export type { StringOrKeyofT, RecordPartial, anyCallback }
