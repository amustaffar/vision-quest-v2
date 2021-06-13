import React, { useEffect, useRef } from 'react'
import { useInterval } from 'react-use'
import Preview from './Preview'

type Props = Readonly<{
  onCapture: (file: File) => void
  rate: number
}>

const VideoProvider = (props: Props) => {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (ref.current !== null) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => ref.current.srcObject = stream)
        .catch(console.error)
    }
  }, [])

  useInterval(() => {
    if (ref.current !== null) {
      let canvas = document.createElement('canvas')
      const ratio = 1000 / ref.current.videoWidth
      const width = ref.current.videoWidth * ratio
      const height = ref.current.videoHeight * ratio
      canvas.width = width
      canvas.height = height

      let ctx = canvas.getContext('2d')
      ctx.drawImage(ref.current, 0, 0, width, height)

      canvas.toBlob(blob => {
        props.onCapture(
          new File([blob], 'file.jpg', { type: 'image/jpeg' })
        )
      }, 'image/jpeg')

      ctx = null
      canvas = null
    }
  }, props.rate * 1000)

  return (
    <Preview ref={ref} />
  )
}

export default VideoProvider
