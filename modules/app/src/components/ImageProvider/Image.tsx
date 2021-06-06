import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

type Props = Readonly<{
  file: File
}>

const Image = (props: Props) => {
  const styles = useStyles()
  const [url] = useState(() => URL.createObjectURL(props.file))
  const revoke = () => URL.revokeObjectURL(url)

  return (
    <img
      className={styles.root}
      onLoad={revoke}
      src={url}
    />
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}))

export default Image
