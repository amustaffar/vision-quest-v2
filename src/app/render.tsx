import React from 'react'
import { render } from 'react-dom'
import Root from './Root'

console.log('asdf')
const main = document.createElement('div')
document.body.appendChild(main)
render(<Root />, main)
