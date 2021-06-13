import React from 'react'
import Input from '../../../components/VideoProvider'
import SplitView from '../../../components/SplitView'
import * as Status from '../../../components/Status'
import { Settings } from '../types'
import { useVideo } from './hooks'
import Output from './Output'

type Props = Readonly<{
  settings: Settings
}>

const Container = (props: Props) => {
  const [capture, state] = useVideo()

  return (
    <SplitView>
      <Input
        onCapture={capture}
        rate={props.settings.rate}
      />

      {(() => {
        switch (state.tag) {
          case 'idle': return null
          case 'loading': return <Status.Loading />
          case 'failure': return <Status.Failure />
          case 'success': return <Output settings={props.settings} results={state.result} />
        }
      })()}
    </SplitView>
  )
}

export default Container
