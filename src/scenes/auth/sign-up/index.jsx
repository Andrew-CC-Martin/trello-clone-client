import { TextField, Button, CircularProgress } from "@material-ui/core"
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { api } from '../../../data/index'

export const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const signUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await api.post("/auth/sign_up", {
        email,
        password,
        username,
        password_confirmation: confirmPassword
      })

      // grab JWT from data and save to local storage
      localStorage.setItem('jwt', data.jwt)

      // redirect to /home
      history.push("/")
    } catch (err) {
      // todo: use context API to control error message
      setLoading(false)
      console.log("oops:", err)
    }
  }

  // todo: add validators for email and password

  if (loading) {
    return <CircularProgress />
  }

  return (
    <form onSubmit={signUp}>
      <TextField onChange={(e) => setEmail(e.target.value)} value={email} id="email" label="Email" />
      <TextField onChange={(e) => setUsername(e.target.value)} value={username} id="username" label="Username" />
      <TextField onChange={(e) => setPassword(e.target.value)} value={password} id="password" label="Password" type="password" />
      <TextField onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} id="password-confirmation" label="Confirm Password" type="password" />
      <Button type="submit">Sign Up</Button>
    </form>
  )
}
