import { useEffect, useRef } from 'react'

function usePreviousObject<T extends Record<string, any>>(obj: T): T {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    ref.current = obj
  }, [obj])

  return ref.current as T
}

export default usePreviousObject
