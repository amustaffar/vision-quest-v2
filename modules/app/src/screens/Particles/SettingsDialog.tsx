import React, { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { Settings, Unit } from './types'
import FormGroup from '../../components/FormGroup'

type Props = Readonly<{
  onSave: (settings: Settings) => void
  onClose: () => void
  settings: Settings
  open?: boolean
}>

type State = Readonly<{
  ratio: string
  rate: string
  unit: string
}>

const SettingsDialog = (props: Props) => {
  const [state, setState] = useState<State>(toState(props.settings))
  useEffect(() => setState(toState(props.settings)), [props.open])

  const handleSave = () => {
    props.onSave(fromState(state))
    props.onClose()
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Settings
      </DialogTitle>

      <DialogContent>
        <FormGroup title="Measurement">
          <TextField
            variant="filled"
            value={state.unit}
            onChange={evt => setState({ ...state, unit: evt.target.value })}
            label="Unit"
            margin="dense"
            fullWidth
            select
          >
            <MenuItem value="pixel">Pixels</MenuItem>
            <MenuItem value="micron">Microns</MenuItem>
            <MenuItem value="millimeter">Millimeters</MenuItem>
          </TextField>

          {state.unit !== 'pixel' && (
            <TextField
              variant="filled"
              value={state.ratio}
              onChange={evt => setState({ ...state, ratio: evt.target.value })}
              label={getLabel(state.unit)}
              type="number"
              margin="dense"
              fullWidth
            />
          )}
        </FormGroup>

        <FormGroup title="Video">
          <TextField
            variant="filled"
            value={state.rate}
            onChange={evt => setState({ ...state, rate: evt.target.value })}
            label="Capture Rate in seconds"
            type="number"
            margin="dense"
            fullWidth
          />
        </FormGroup>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>

        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const toState = (settings: Settings): State => ({
  ratio: `${settings.ratio}`,
  rate: `${settings.rate}`,
  unit: settings.unit
})

const fromState = (state: State): Settings => ({
  unit: state.unit as Unit,
  rate: parseFloat(state.rate),
  ratio: parseFloat(state.ratio)
})

const getLabel = (unit: string): string => (
  unit === 'micron'
    ? 'Pixel to Micron Ratio'
    : 'Pixel to Millimeter Ratio'
)

export default SettingsDialog
