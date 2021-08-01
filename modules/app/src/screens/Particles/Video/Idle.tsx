import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

type Props = Readonly<{
  onStart: () => void
}>

const Idle = (props: Props) => (
  <Box
    display="flex"
    justifyContent="flex-end"
    alignItems="flex-start"
    flex="1"
    p={2}
  >
    <Button
      variant="contained"
      color="primary"
      onClick={props.onStart}
    >
      Start
    </Button>
  </Box>
)

export default Idle
