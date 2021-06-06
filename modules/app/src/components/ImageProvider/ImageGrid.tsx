import React, { useState } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Image from './Image'

type Props = Readonly<{
  files: ReadonlyArray<File>
  onChange: (file: File) => void
  value: File | null
}>

const ImageGrid = (props: Props) => {
  const styles = useStyles()

  return (
    <Box p={2} style={{ backgroundColor: '#222', flex: 1 }}>
      <GridList cellHeight={160} cols={4}>
        {props.files.map((file, idx) => (
          <GridListTile
            key={idx}
            className={cx({
              [styles.selected]: file === props.value
            })}
          >
            <Image file={file} />
            <GridListTileBar
              title={file.name}
              actionIcon={
                <IconButton onClick={() => props.onChange(file)}>
                  <InfoIcon color="primary" />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  selected: {
    border: '1px solid',
    borderColor: theme.palette.primary.main
  }
}))

export default ImageGrid
