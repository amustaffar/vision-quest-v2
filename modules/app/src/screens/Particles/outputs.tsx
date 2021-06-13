import React from 'react'
import * as d3 from 'd3-array'
import * as color from '@material-ui/core/colors'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Label,
  Legend
} from 'recharts'
import { Result, Settings, Unit } from './types'

type SeriesProps = Readonly<{
  results: ReadonlyArray<Result>
  settings: Settings
}>

export const Series = (props: SeriesProps) => {
  const results = props.results.map(result => ({
    ...result,
    d10: result.d10 * props.settings.ratio,
    d50: result.d50 * props.settings.ratio,
    d90: result.d90 * props.settings.ratio
  }))

  return (
    <Paper>
      <Box p={2}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={results} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" name="d10" dataKey="d10" stroke={color.orange[700]} isAnimationActive={false} />
            <Line type="monotone" name="d50" dataKey="d50" stroke={color.green[700]} isAnimationActive={false} />
            <Line type="monotone" name="d90" dataKey="d90" stroke={color.purple[700]} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  )
}

type ValuesProps = Readonly<{
  settings: Settings
  result: Result
}>

export const Values = (props: ValuesProps) => (
  <Paper>
    <Box p={2}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart barGap={1} data={getData(props.result.values, props.settings)} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x">
            <Label
              value={label(props.settings.unit)}
              position="insideBottom"
              offset={0}
            />
          </XAxis>
          <YAxis>
            <Label
              value="Frequency"
              position="insideLeft"
              angle={-90}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="y" fill="#03a9f4" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Paper>
)

const getData = (values: ReadonlyArray<number>, settings: Settings) => {
  const bins = d3.bin<number, number>()
    .value(x => x * settings.ratio)(values)

  return bins.reduce((a, c) => (
    [...a, { x: (c.x0 + c.x1) / 2, y: c.length }]
  ), [])
}

type DataProps = Readonly<{
  settings: Settings
  result: Result
}>

export const Data = ({ result, settings }: DataProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell variant="head">d10</TableCell>
          <TableCell>{(result.d10 * settings.ratio).toFixed(2)} {abbr(settings.unit)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell variant="head">d50</TableCell>
          <TableCell>{(result.d50 * settings.ratio).toFixed(2)} {abbr(settings.unit)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell variant="head">d90</TableCell>
          <TableCell>{(result.d90 * settings.ratio).toFixed(2)} {abbr(settings.unit)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell variant="head">No. Particles</TableCell>
          <TableCell>{result.values.length}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell variant="head">Time</TableCell>
          <TableCell>{(result.time).toFixed(2)} seconds</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
)

const label = (unit: Unit): string => {
  switch (unit) {
    case 'pixel': return 'Pixels'
    case 'micron': return 'Microns'
    case 'millimeter': return 'Millimeters'
  }
}

const abbr = (unit: Unit): string => {
  switch (unit) {
    case 'pixel': return 'px'
    case 'micron': return 'μm'
    case 'millimeter': return 'mm'
  }
}
