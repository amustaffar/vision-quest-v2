import React, { useRef } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'
import ImageProvider from '../../components/ImageProvider'
import VideoProvider from '../../components/VideoProvider'
import { Result } from './types'

type Props = Readonly<{
  onChange: (results: ReadonlyArray<Result>) => void
}>

export const Image = (props: Props) => {
  const cache = useRef<unknown>(null)

  const onCapture = (file: File) => {
    const promise = processFile(file)
    cache.current = promise

    const onSuccess = (res: AxiosResponse) => {
      if (promise === cache.current) {
        props.onChange([res.data])
      }
    }

    const onFailure = (err: AxiosError) => {
      console.error(err)
    }

    promise
      .then(onSuccess)
      .catch(onFailure)
  }

  return (
    <ImageProvider
      onCapture={onCapture}
    />
  )
}

export const Video = (props: Props) => {

  return (
    <VideoProvider
      onCapture={() => {}}
    />
  )
}

const processFile = (file: File) => {
  const data = new FormData()
  data.set('data', file)

  return axios.request({
    method: 'POST',
    url: 'http://localhost:5000',
    data
  })
}
