import React from 'react'
import { render } from 'react-dom'
import Root from './Root'

const main = document.createElement('div')
main.setAttribute('id', 'root')
document.body.appendChild(main)
render(<Root />, main)
