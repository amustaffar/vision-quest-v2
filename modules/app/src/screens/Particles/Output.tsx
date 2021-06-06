import React from 'react'
import * as d3 from 'd3-array'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Result } from './types'

type Props = Readonly<{
  results: ReadonlyArray<Result>
}>

const Output = (props: Props) => {
  const [result] = props.results
  if (result === undefined) { return null }
  const data = getData(result.values)

  return (
    <Box p={2}>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart barGap={1} data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="y" fill="#03a9f4" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>
      
      <Box mb={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">d10</TableCell>
                <TableCell>{result.d10}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell variant="head">d50</TableCell>
                <TableCell>{result.d50}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell variant="head">d90</TableCell>
                <TableCell>{result.d90}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

const getData = (values: ReadonlyArray<number>) => {
  const bins = d3.bin<number, number>()(values)

  return bins.reduce((a, c) => (
    [...a, { x: (c.x0 + c.x1) / 2, y: c.length }]
  ), [])
}

export default Output
