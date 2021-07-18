import React from 'react'
import Box from '@material-ui/core/Box'
import * as Outputs from '../outputs'
import { Result, Settings } from '../types'

type Props = Readonly<{
  results: ReadonlyArray<Result>
  settings: Settings
}>

const Output = ({ results, settings }: Props) => {
  const result = results[results.length - 1]

  return (
    <Box p={2}>
      <Box pb={2}>
        <Outputs.Series settings={settings} results={results} />
      </Box>

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
