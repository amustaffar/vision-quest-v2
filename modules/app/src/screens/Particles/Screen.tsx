import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import Screen from '../../components/Screen'
import AppBar from '../../components/AppBar'
import { Provider, Settings } from './types'
import SettingsDialog from './SettingsDialog'
import Image from './Image'
import Video from './Video'

const Particles = () => {
  const [provider, setProvider] = useState<Provider>('image')
  const [settings, setSettings] = useState<Settings>({ unit: 'pixel', rate: 1, ratio: 1 })
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Screen>
      <AppBar
        title="Particle Measurement"
        actions={
          <IconButton onClick={() => setOpen(true)}>
            <SettingsIcon />
          </IconButton>
        }
        tabs={
          <Tabs value={provider} onChange={(_, v) => setProvider(v)}>
            <Tab label="Images" value="image" />
            <Tab label="Video" value="video" />
          </Tabs>
        }
      />

      {provider === 'image' ? (
        <Image settings={settings} />
      ) : (
        <Video settings={settings} />
      )}

      <SettingsDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={setSettings}
        settings={settings}
      />
    </Screen>
  )
}

export default Particles
