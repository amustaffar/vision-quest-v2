import * as url from 'url'
import * as path from 'path'
import { app, BrowserWindow } from 'electron'

const isDev = () => process.env.NODE_ENV === 'development'
const html = () => path.join(__dirname, './app/index.html')
const preload = () => path.join(__dirname, './preload.js')

const getUrl = () => {
  if (isDev()) { return 'http://localhost:4000' }

  return url.format({
    pathname: html(),
    protocol: 'file:',
    slashes: true
  })
}

const createWindow = () => {
  const main = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: preload()
    }
  })

  main.loadURL(getUrl())
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
