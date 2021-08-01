import { useState } from 'react'
import sortBy from 'lodash/sortBy'
import { State, Result } from '../types'
import { processFile, saveFrame, saveResults } from '../api'

type Controls = Readonly<{
  capture: (file: File) => void
  start: () => void
  stop: () => void
}>

type Api<T> = [Controls, State<T>]

export const useVideo = (): Api<ReadonlyArray<Result>> => {
  const [state, setState] = useState<State<ReadonlyArray<Result>>>({ tag: 'idle' })
  const [directory, setDirectory] = useState<string>('')

  const capture = (file: File) => {
    if (state.tag === 'idle') { return }
    const promise = processFile(file)

    const onSuccess = (result: Result) => {
      const existing = state.tag === 'success' ? state.result : []
      setState({ tag: 'success', result: sortBy([...existing, result], 'id') })
      saveFrame(directory, result.id, file)
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

  const start = () => {
    window.electron?.invoke('choose_directory').then(dir => {
      setState({ tag: 'loading' })
      setDirectory(dir)
    })
  }

  const stop = () => {
    if (state.tag === 'success') {
      saveResults(directory, toCsv(state.result))
      setState({ tag: 'idle' })
    }
  }

  return [{ capture, start, stop }, state]
}

const toCsv = (data: ReadonlyArray<Result>): string => {
  const header = `time,d10,d50,d90`
  const rows = data.map(r => `${r.id},${r.d10},${r.d50},${r.d90}`)
  return [header, ...rows].join('\n')
}
