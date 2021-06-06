import React, { useState } from 'react'
import Screen from '../../components/Screen'
import AppBar from '../../components/AppBar'
import SplitView from '../../components/SplitView'
import Input from './Input'
import Output from './Output'
import data from './data'
import { Result } from './types'

const Particles = () => {
  const [results, setResults] = useState<ReadonlyArray<Result>>([])

  return (
    <Screen>
      <AppBar title="Particle Measurement" />
  
      <SplitView>
        <Input onChange={setResults} />
        <Output results={results} />
      </SplitView>
    </Screen>
  )
}

export default Particles
