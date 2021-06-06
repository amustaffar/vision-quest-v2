
export type Result = Readonly<{
  values: ReadonlyArray<number>
  time: number
  d10: number
  d50: number
  d90: number
}>

export type Capture = Readonly<{
  series: boolean
  file: File
}>
