import React from 'react'
import Box from '@material-ui/core/Box'
import Progress from '@material-ui/core/CircularProgress'

type Props = Readonly<{}>

const Loading = (_: Props) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flex="1"
  >
    <Progress />
  </Box>
)

export default Loading
