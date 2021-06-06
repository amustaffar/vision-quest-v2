
const SENSORS = {
  'particle-measurement/conventional': null,
  'particle-measurement/ai-engine': null,
  'mineral-recognition/diamond': null,
  'mineral-recognition/gold': null,
  'mineral-recognition/silver': null
}

export type Sensor = keyof typeof SENSORS

export const isSensor = (value: string): value is Sensor => {
  return Object.keys(SENSORS).includes(value)
}
