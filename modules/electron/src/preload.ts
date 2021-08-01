import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,

  invoke: (channel: string, ...args: ReadonlyArray<any>): Promise<any> => {
    return ipcRenderer.invoke(channel, ...args)
  }
})
