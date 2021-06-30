import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import { Home } from './scenes/home'
import { SignUp } from './scenes/auth/sign-up'
import { SignIn } from './scenes/auth/sign-in'

const App = () => {
  return (
    <Router>
      {/* todo: replace with mat-ui navbar */}
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/sign-in">sign in</Link>
            </li>
            <li>
              <Link to="/sign-up">sign up</Link>
            </li>
          </ul>
        </nav>

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
