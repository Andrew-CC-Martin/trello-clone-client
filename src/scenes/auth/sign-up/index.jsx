import { useState } from "react"
import {
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useHistory } from "react-router-dom"

import { api } from '../../../data'

export const SignUp = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const history = useHistory()

  // sends username, email, password, and password_confirmation to the backend /auth/sign_up route
  const signUp = async (e) => {
    e.preventDefault()
    // set the loading state to true
    setLoading(true)
    // unset error message
    setErrorMessage("")

    // send the post request to the API
    try {
      const { data } = await api.post("/auth/sign_up", {
        email,
        username,
        password,
        password_confirmation: passwordConfirmation
      })

      // if success:
        // save the JWT to local storage
        localStorage.setItem('jwt', data.jwt)
        // redirect to home page
        history.push("/")
    } catch (error) {
      // if fail:
        // display the error message to the user
        setErrorMessage(error.message)
        // stop the loading spinner
        setLoading(false)
    }
  }

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {loading && <CircularProgress />}
      <form onSubmit={signUp}>
        <TextField onChange={(e) => setUsername(e.target.value)} value={username} id="username" label="Username" />
        <TextField onChange={(e) => setEmail(e.target.value)} value={email} id="email" label="Email" />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          label="Password"
          type="password"
        />
        <TextField
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
          id="passwordConfirmation"
          label="Confirm password"
          type="password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </>
  )
}
