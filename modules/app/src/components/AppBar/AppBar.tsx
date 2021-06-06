import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Internal from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

type Props = Readonly<{
  title: string
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
        <Typography variant="h6">
          {props.title}
        </Typography>
      </Toolbar>
    </Internal>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper
  }
}))

export default AppBar
