import { useState, useEffect } from "react"
import { TextField, Button, FormHelperText } from '@material-ui/core'

import { api } from "../../../../data"
import { validateInput } from "../../../../utils/validators"

export const AddCard = ({ cards, setCards, setLoading, setErrorMessage }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [titleValid, setTitleValid] = useState(true)
  const [descriptionValid, setDescriptionValid] = useState(true)

  useEffect(() => {
    setTitleValid(validateInput(title))
  }, [title])

  useEffect(() => {
    setDescriptionValid(validateInput(description))
  }, [description])

  const addCard = async (event) => {
    event.preventDefault()
    setLoading(true)

    // async await version
    try {
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
      setErrorMessage(`oops, something went wrong: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={addCard}>
      <TextField error={!titleValid} onChange={(e) => setTitle(e.target.value)} value={title} id="title" label="Title" />
      <TextField error={!descriptionValid} onChange={(e) => setDescription(e.target.value)} value={description} id="description" label="Description" />
      <Button disabled={!titleValid || !descriptionValid} type="submit">Add card</Button>
      <FormHelperText error={!titleValid || !descriptionValid}>Please don't use any naughty words</FormHelperText>
    </form>
  )
}
