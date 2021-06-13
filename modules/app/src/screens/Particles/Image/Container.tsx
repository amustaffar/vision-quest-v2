import React from 'react'
import Input from '../../../components/ImageProvider'
import SplitView from '../../../components/SplitView'
import * as Status from '../../../components/Status'
import { Settings } from '../types'
import { useImage } from './hooks'
import Output from './Output'

type Props = Readonly<{
  settings: Settings
}>

const Container = (props: Props) => {
  const [capture, state] = useImage()

  return (
    <SplitView>
      <Input onCapture={capture} />

      {(() => {
        switch (state.tag) {
          case 'idle': return null
          case 'loading': return <Status.Loading />
          case 'failure': return <Status.Failure />
          case 'success': return <Output settings={props.settings} result={state.result} />
        }
      })()}
    </SplitView>
  )
}

export default Container
