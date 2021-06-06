import React, { useEffect, useState } from 'react'
import DropZone from './DropZone'
import ImageGrid from './ImageGrid'

type Props = Readonly<{
  onCapture: (file: File) => void
}>

const ImageProvider = (props: Props) => {
  const [files, setFiles] = useState<ReadonlyArray<File>>([])
  const [selected, setSelected] = useState<File | null>(null)

  useEffect(() => {
    if (selected !== null) {
      console.log(selected)
      props.onCapture(selected)
    }
  }, [selected])

  if (files.length === 0) {
    return (
      <DropZone
        onDrop={setFiles}
      />
    )
  }

  return (
    <ImageGrid
      files={files}
      value={selected}
      onChange={setSelected}
    />
  )
}

export default ImageProvider
