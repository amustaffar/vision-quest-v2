import React from 'react'
import Box from '@material-ui/core/Box'
import * as Outputs from '../outputs'
import { Result, Settings } from '../types'

type Props = Readonly<{
  settings: Settings
  result: Result
}>

const Output = ({ result, settings }: Props) => {
  return (
    <Box p={2}>
      <Box pb={2}>
        <Outputs.Values settings={settings} result={result} />
      </Box>
      
      <Box pb={16}>
        <Outputs.Data settings={settings} result={result} />
      </Box>
    </Box>
  )
}

export default Output
