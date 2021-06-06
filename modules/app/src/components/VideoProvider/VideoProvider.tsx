import React, { useEffect, useRef } from 'react'
import Preview from './Preview'

type Props = Readonly<{
  onCapture: (file: File) => void
}>

const VideoProvider = (_: Props) => {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (ref.current !== null) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => ref.current.srcObject = stream)
        .catch(console.error)
    }
  }, [])

  return (
    <Preview ref={ref} />
  )
}

export default VideoProvider
