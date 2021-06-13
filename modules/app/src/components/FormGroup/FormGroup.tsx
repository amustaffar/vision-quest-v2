import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

type Props = Readonly<{
  children: React.ReactNode
  title: string
}>

const FormGroup = (props: Props) => (
  <Box mb={2}>
    <Typography variant="overline">
      {props.title}
    </Typography>

    {props.children}
  </Box>
)

export default FormGroup
