import { useEffect, useState } from "react"

type FetchState<DataType> = LoadingState | FullfiledState<DataType> | ErrorState

type LoadingState = { data: undefined; isLoading: true; error: undefined }
type FullfiledState<DataType> = { data: DataType; isLoading: false; error: undefined }
type ErrorState = { data: undefined; isLoading: false; error: Error }

const initialState: LoadingState = { data: undefined, isLoading: true, error: undefined }

export function useFetch<DataType>(
  url: RequestInfo,
  params?: RequestInit | undefined,
): FetchState<DataType> {
  const [state, setState] = useState<FetchState<DataType>>(initialState)

  useEffect(() => {
    setState(initialState)
    fetch(url, params)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw new Error(`Received response status : ${response.status}`)
        }
      })
      .then((data: DataType) => {
        setState({ data: data, isLoading: false, error: undefined })
      })
      .catch((error) => setState({ data: undefined, isLoading: false, error: error }))
  }, [url, params])

  return state
}
