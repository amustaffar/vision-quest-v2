import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

type Props = Readonly<{}>

const Preview = React.forwardRef<HTMLVideoElement, Props>((props, ref) => {
  const styles = useStyles()

  return (
    <video
      className={styles.root}
      ref={ref}
      autoPlay
    />
  )
})

const useStyles = makeStyles(() => ({
  root: { backgroundColor: '#222' }
}))

export default Preview
