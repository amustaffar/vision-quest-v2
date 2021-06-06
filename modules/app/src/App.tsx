import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'
import orange from '@material-ui/core/colors/orange'
import Particles from './screens/Particles'

const theme = createMuiTheme({
  palette: { primary: lightBlue, secondary: orange }
})

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Particles} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
