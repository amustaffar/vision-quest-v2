import React from 'react'
import Box from '@material-ui/core/Box'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Typography from '@material-ui/core/Typography'

type Props = Readonly<{}>

const Failure = (_: Props) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    color="error.main"
    flex="1"
  >
    <ErrorOutlineIcon
      fontSize="large"
    />
    <Typography variant="subtitle1">
      Sorry, something went wrong
    </Typography>
  </Box>
)

export default Failure
