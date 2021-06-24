import { useEffect, useState } from "react"
import {
  CssBaseline,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  FormControl,
  FormHelperText,
  CircularProgress
} from '@material-ui/core'

import { Alert } from '@material-ui/lab'

import { api } from "./data"
import { validateInput } from "./utils/validators"

function App() {
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [inputsValid, setInputsValid] = useState(true)

  // call the API on page load to get the cards
  useEffect(() => {
    api.get("/cards")
      .then(({ data }) => setCards(data))
      .catch(({ message }) => setErrorMessage(message))
      .finally(setLoading(false))
  }, [])

  // whenever title and description are updated, run them through the validators
  useEffect(() => {
    // run the input through the validator function
    const isValid = validateInput(title) && validateInput(description)

    setInputsValid(isValid)
  }, [title, description])

  const addCard = async (event) => {
    event.preventDefault()

    try {
      // set loading state
      setLoading(true)

      // send a post request to add the new card to the backend
      const { data } = await api.post("/cards", {
        title,
        description
      })

      setTitle("")
      setDescription("")

      // update the component state with the new card
      // make a clone of cards from state
      const cardsClone = [...cards]
      // add the new card
      cardsClone.push({
        title: data.title,
        description: data.description,
        id: data.id
      })
      // set it as the new state
      setCards(cardsClone)
    } catch ({ message }) {
      setErrorMessage(message)
    } finally {
      // turn off loading state
      setLoading(false)
    }
  }

  return (
    <>
      <CssBaseline />
      {loading && <CircularProgress />}
      <div>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_NOT_SECRET_CODE} />
      </form>
    </div>
      <Box>
        <Typography variant="h4" component="h1">trello clone</Typography>
        {cards.map(({ title, description, id }) => (
          <Box key={id}>
            <Card variant="outlined">
              <CardContent>
                <Typography>title: {title}</Typography>
                <Typography>description: {description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}

        <form onSubmit={addCard}>
          <FormControl error={!inputsValid}>
            <TextField error={!inputsValid} onChange={(e) => setTitle(e.target.value)} value={title} id="title" label="Title" />
            <TextField error={!inputsValid} onChange={(e) => setDescription(e.target.value)} value={description} id="description" label="Description" />
            <Button type="submit" disabled={!inputsValid}>Add card</Button>
            <FormHelperText id="my-helper-text">Please don't use any naughty language</FormHelperText>
          </FormControl>
        </form>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </>
  )
}

export default App
