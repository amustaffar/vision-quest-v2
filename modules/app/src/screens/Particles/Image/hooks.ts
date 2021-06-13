import { useRef, useState } from 'react'
import { Api, State, Result } from '../types'
import { processFile } from '../api'

export const useImage = (): Api<Result> => {
  const [state, setState] = useState<State<Result>>({ tag: 'idle' })
  const cache = useRef<unknown>(null)

  const capture = (file: File) => {
    setState({ tag: 'loading' })
    const promise = processFile(file)
    cache.current = promise

    const onSuccess = (result: Result) => {
      if (promise === cache.current) {
        setState({ tag: 'success', result })
      }
    }

    const onFailure = (error: unknown) => {
      if (promise === cache.current) {
        setState({ tag: 'failure', error })
      }
    }

    promise
      .then(onSuccess)
      .catch(onFailure)
  }

  return [capture, state]
}
