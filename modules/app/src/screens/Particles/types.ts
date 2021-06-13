
export type Provider = 'image' | 'video'

export type Idle = Readonly<{ tag: 'idle' }>
export type Loading = Readonly<{ tag: 'loading' }>
export type Success<T> = Readonly<{ tag: 'success', result: T }>
export type Failure = Readonly<{ tag: 'failure', error: unknown }>
export type State<T> = Idle | Loading | Success<T> | Failure

export type Capture = (file: File) => void
export type Api<T> = [Capture, State<T>]

export type Result = Readonly<{
  values: ReadonlyArray<number>
  time: number
  d10: number
  d50: number
  d90: number
  id: string
}>

export type Unit = 'micron' | 'millimeter' | 'pixel'

export type Settings = Readonly<{
  ratio: number
  rate: number
  unit: Unit
}>
