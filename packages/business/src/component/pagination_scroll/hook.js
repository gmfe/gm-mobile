import { useEffect, useState } from 'react'

const Status = {
  loading: 'loading',
  empty: 'empty',
  error: 'error',
  loadingMore: 'loadingMore',
  noMore: 'noMore',
  LoadMoreError: 'LoadMoreError',
}

function statusToObj(status) {
  return {
    loading: false,
    empty: false,
    error: false,
    loadingMore: false,
    loadMoreError: false,
    // 覆盖
    [status]: true,
  }
}

function useRequest({ onRequest, limit }) {
  const [status, setStatus] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    setStatus(Status.loading)

    onRequest({
      offset: 0,
      limit,
    }).then(
      ({ data }) => {
        setData(data)
        if (data.length === 0) {
          setStatus(Status.empty)
        } else {
          setStatus(null)
        }
      },
      (reason) => {
        setStatus(Status.error)
      }
    )
  }, [])

  return {
    data,
    status,
    ...statusToObj(status),
  }
}

useRequest.Status = Status

export default useRequest
