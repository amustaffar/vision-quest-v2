import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Image, Video } from './providers'
import { Result } from './types'

type Props = Readonly<{
  onChange: (results: ReadonlyArray<Result>) => void
}>

type Provider = 'image' | 'video'

const Input = (props: Props) => {
  const [provider, setProvider] = useState<Provider>('image')

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="1"
    >
      <Box
        bgcolor="background.paper"
        borderBottom="1px solid rgba(0, 0, 0, 0.12)"
      >
        <Tabs value={provider} onChange={(_, v) => setProvider(v)}>
          <Tab label="Images" value="image" />
          <Tab label="Video" value="video" />
        </Tabs>
      </Box>

      {provider === 'video' ? (
        <Video onChange={props.onChange} />
      ) : (
        <Image onChange={props.onChange} />
      )}
    </Box>
  )
}

export default Input
