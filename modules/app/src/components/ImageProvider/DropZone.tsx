import React from 'react'
import cx from 'classnames'
import { useDropArea } from 'react-use'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

type Props = Readonly<{
  onDrop: (files: ReadonlyArray<File>) => void
}>

const DropZone = (props: Props) => {
  const styles = useStyles()
  const [bond, state] = useDropArea({
    onFiles: files => {
      props.onDrop(
        files.filter(f => (
          f.type.includes('image')
        ))
      )
    }
  })

  return (
    <div
      className={cx({
        [styles.root]: true,
        [styles.over]: state.over
      })}
      {...bond}
    >
      <ArrowDownwardIcon
        fontSize="large"
      />

      <Typography variant="subtitle1">
        Drop one or more images
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: theme.spacing(2),
    color: theme.palette.action.disabled
  },

  over: {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.action.hover
  }
}))

export default DropZone
