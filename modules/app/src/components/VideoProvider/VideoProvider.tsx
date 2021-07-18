import React, { useEffect, useRef, useState } from 'react'
import { useInterval } from 'react-use'
import Preview from './Preview'

type Props = Readonly<{
  onCapture: (file: File) => void
  rate: number
}>

const VideoProvider = (props: Props) => {
  const ref = useRef<HTMLVideoElement | null>(null)
  const capture = useRef<ImageCapture | null>(null)
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const img = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (ref.current !== null) {
      getDevice()
        .then(stream => {
          ref.current.srcObject = stream
          const track = stream.getVideoTracks()[0];
          capture.current = new ImageCapture(track)
        })
        .catch(console.error)
    }
  }, [])

  // useInterval(() => {
  //   if (capture.current !== null) {
  //     capture.current.takePhoto().then(blob => {
  //       img.current.src = URL.createObjectURL(blob)
  //       props.onCapture(new File([blob], 'file.jpg', { type: 'image/jpeg' }))
  //     })
  //   }
  // }, props.rate * 5000)

  // useInterval(() => {
  //   if (capture.current !== null) {
  //     capture.current.grabFrame().then(frame => {
  //       canvas.current.width = frame.width
  //       canvas.current.height = frame.height
  //       canvas.current.getContext('2d').drawImage(frame, 0, 0)

  //       canvas.current.toBlob(blob => {
  //         props.onCapture(
  //           new File([blob], 'file.jpg', { type: 'image/jpeg' })
  //         )
  //       }, 'image/jpeg')
  //     })
  //   }
  // }, props.rate * 2000)

  useInterval(() => {
    if (ref.current !== null) {
      let canvas = document.createElement('canvas')
      console.log(ref.current.videoWidth, ref.current.videoHeight)
      const ratio = 1
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

  return (<>
    <Preview ref={ref} />
  </>)
}

const getDevice = () => {
  return navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  })
}

export default VideoProvider
