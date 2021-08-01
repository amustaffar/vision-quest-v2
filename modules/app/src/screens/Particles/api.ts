import axios from 'axios'
import { Result } from './types'

export const processFile = async (file: File) => {
  const data = new FormData()
  data.set('data', file)
  data.set('id', `${Date.now()}`)

  const res = await axios.request<Result>({
    method: 'POST',
    url: 'http://35.176.182.151:5000',
    data
  })

  return res.data
}

export const saveFrame = (dir: string, id: string, file: File) => {
  file.arrayBuffer().then(data => {
    window.electron?.invoke('save_frame', dir, id, data)
  })
}

export const saveResults = (dir: string, data: string) => {
  window.electron?.invoke('save_results', dir, data)
}
