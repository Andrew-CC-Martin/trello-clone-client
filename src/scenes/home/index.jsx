import { useEffect, useState } from "react"
import {
  Box,
  CircularProgress,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { Cards } from './components/cards'
import { AddCard } from './components/add-card'
import { api } from "../../data"

export const Home = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    api.get("/cards")
      .then(({ data }) => {
        setCards(data)
      })
      .catch(({ message }) => setErrorMessage(`oops, something went wrong: ${message}`))
      .finally(() => setLoading(false))
  }, [])

  const deleteCard = async (id, index) => {
    // set loading state
    setLoading(true)

    try {
      // send DELETE request to delete path on backend
      // pass in the id

      await api.delete(`/cards/${id}`)
      // cool, the request was successful
      // remove the card from the react state
      const cardsCopy = [...cards]
      cardsCopy.splice(index, 1)
      setCards(cardsCopy)

    } catch ({ message }) {
      setErrorMessage(message)
    } finally {
      // unset loading state
      setLoading(false)
    }
  }

  return (
    <Box>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {loading && <CircularProgress />}
      <Cards cards={cards} deleteCard={deleteCard} />

      <AddCard cards={cards} setCards={setCards} setLoading={setLoading} setErrorMessage={setErrorMessage} />
    </Box>
  )
}
