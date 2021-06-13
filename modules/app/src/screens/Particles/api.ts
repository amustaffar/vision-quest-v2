import axios from 'axios'
import { Result } from './types'

export const processFile = async (file: File) => {
  const data = new FormData()
  data.set('data', file)
  data.set('id', `${Date.now()}`)

  const res = await axios.request<Result>({
    method: 'POST',
    url: 'http://localhost:5000',
    data
  })

  return res.data
}
