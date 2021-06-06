import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

type Props = Readonly<{
  children: React.ReactNode
}>

const SplitView = (props: Props) => {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      {React.Children.map(props.children, child => (
        <div className={styles.split}>
          {child}
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flex: 1
  },

  split: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
    '&:last-of-type': {
      borderRight: 'none'
    }
  }
}))

export default SplitView
