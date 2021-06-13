import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Internal from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

type Props = Readonly<{
  title: string
  tabs?: React.ReactNode
  actions?: React.ReactNode
}>

const AppBar = (props: Props) => {
  const styles = useStyles()

  return (
    <Internal
      position="static"
      color="transparent"
      elevation={0}
      className={styles.root}
    >
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          {props.title}
        </Typography>

        {props.actions}
      </Toolbar>

      {props.tabs && (
        <Toolbar variant="dense" disableGutters>
          {props.tabs}
        </Toolbar>
      )}
    </Internal>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper
  },

  title: {
    flexGrow: 1
  }
}))

export default AppBar
