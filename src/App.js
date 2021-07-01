import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { Home } from "./scenes/home"
import { SignIn } from './scenes/auth/sign-in'
import { SignUp } from './scenes/auth/sign-up'
import { NavBar } from './scenes/nav'

const App = () => {
  return (
    <Router>
      <NavBar/>

      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
