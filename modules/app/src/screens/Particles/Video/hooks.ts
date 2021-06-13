import { useState } from 'react'
import sortBy from 'lodash/sortBy'
import { Api, State, Result } from '../types'
import { processFile } from '../api'

export const useVideo = (): Api<ReadonlyArray<Result>> => {
  const [state, setState] = useState<State<ReadonlyArray<Result>>>({ tag: 'loading' })

  const capture = (file: File) => {
    const promise = processFile(file)

    const onSuccess = (result: Result) => {
      const existing = state.tag === 'success' ? state.result : []
      setState({ tag: 'success', result: sortBy([...existing, result], 'id') })
    }

    const onFailure = (error: unknown) => {
      if (state.tag !== 'success') {
        setState({ tag: 'failure', error })
      }
    }

    promise
      .then(onSuccess)
      .catch(onFailure)
  }

  return [capture, state]
}
