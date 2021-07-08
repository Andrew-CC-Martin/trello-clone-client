import { useState } from "react"
import {
  Button,
  TextField,
  CircularProgress,
  FormHelperText
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useHistory } from "react-router-dom"

import { api } from '../../../data'
import { useEffect } from "react"
import { validatePassword, validateEmail } from "../../../utils/validators"

export const SignUp = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [passwordValid, setPasswordValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [passwordConfirmationMatches, setPasswordConfirmationMatches] = useState(true)

  // when password changes, run it through the password validator function
  // If it's invalid, set passwordValid to false
  useEffect(() => {
    setPasswordValid(validatePassword(password))
  }, [password])

  // when email changes, run it through the email validator function
  // If it's invalid, set emailValid to false
  useEffect(() => {
    setEmailValid(validateEmail(email))
  }, [email])

  // when password changes, or passwordConfirmation changes, compare the two
  // If equal, set passwordConfirmationMatches to true, else set to false
  useEffect(() => {
    setPasswordConfirmationMatches(password === passwordConfirmation)
  }, [password, passwordConfirmation])

  const history = useHistory()

  /**
   *  form is invalid if
   * - email is invalid
   * - password is invalid
   * - password confirmation doesn't match password
   * - username is missing
   *  */
  const formInvalid = !emailValid || !passwordValid || !passwordConfirmationMatches || !username

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
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          id="username"
          label="Username"
          error={!username}
          helperText="required"
          data-cy="signup-username"
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          label="Email"
          error={!emailValid}
          helperText="valid email required"
          data-cy="signup-email"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          label="Password"
          type="password"
          error={!passwordValid}
          helperText="strong password required"
          data-cy="signup-password"
        />
        <TextField
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
          id="passwordConfirmation"
          label="Confirm password"
          type="password"
          error={!passwordConfirmationMatches}
          helperText="passwords must match"
          data-cy="signup-passwordConfirmation"
        />
        <FormHelperText error={!passwordValid}>
          Strong password must contain at least:
          -8 characters
          -1 number
          -1 lowercase letter
          -1 uppercase letter
        </FormHelperText>

        <Button variant="contained" disabled={formInvalid} type="submit" data-cy="signup-button">Sign Up</Button>
      </form>
    </>
  )
}
