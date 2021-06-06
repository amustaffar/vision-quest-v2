import { useState } from 'react'
import { Capture, Result } from './types'

type Data = ReadonlyArray<Result>
type OnCapture = (capture: Capture) => void

type Api = [Data, OnCapture]

const useProcessImage = () => {
  const [data, setData] = useState<Data>([])
  const [series, setSeries] = useState<boolean>(false)

  const onCapture = (capture: Capture): void => {
    if (series !== capture.series) { setData([]) }
    

    // make a request

  }
}

const useProcessFrame = () => {
  const [data, setData] = useState<Data>([])
  const [series, setSeries] = useState<boolean>(false)

  const onCapture = (capture: Capture): void => {
    if (series !== capture.series) { setData([]) }
    

    // make a request

  }
}
