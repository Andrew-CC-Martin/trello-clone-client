import { TextField, Button, CircularProgress } from "@material-ui/core"
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { api } from '../../../data/index'

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const signUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await api.post("/auth/sign_in", {
        email,
        password,
      })

      // grab JWT from data and save to local storage
      localStorage.setItem('jwt', data.jwt)

      // redirect to /home
      history.push("/")
    } catch (err) {
      // todo: use top level state to control error message
      setLoading(false)
      console.log("oops:", err)
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  return (
    <form onSubmit={signUp}>
      <TextField onChange={(e) => setEmail(e.target.value)} value={email} id="email" label="Email" />
      <TextField onChange={(e) => setPassword(e.target.value)} value={password} id="password" label="Password" type="password" />
      <Button type="submit">Sign In</Button>
    </form>
  )
}

