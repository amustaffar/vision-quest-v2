import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

type Props = Readonly<{
  children: React.ReactNode
}>

const Screen = (props: Props) => {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      {props.children}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default
  }
}))

export default Screen
