import { useEffect, useState } from "react"
import { Button, Typography, Box, Card, CardContent, TextField } from '@material-ui/core'

import { api } from "./data"
import { validateInput } from "./utils/validators"

function App() {
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    api.get("/cards")
      .then(({ data }) => setCards(data))
  }, [])

  const addCard = async (event) => {
    event.preventDefault()

    // .then version
    // // send a post request to add the new card to the backend
    // api.post("/cards", {
    //   title,
    //   description
    // })
    //   .then(({ data }) => {

    //     setTitle("")
    //     setDescription("")

    //     // update the component state with the new card
    //     // make a clone of cards from state
    //     const cardsClone = [...cards]
    //     // add the new card
    //     cardsClone.push({
    //       title: data.title,
    //       description: data.description,
    //       id: data.id
    //     })
    //     // set it as the new state
    //     setCards(cardsClone)
    //   })
    //   .catch(err => console.log("oops something went wrong:", err))


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
    } catch (err) {
      console.log("oops something went wrong:", err)
    }
  }

  const handleTextChange = (event, setter) => {
    // run the input through the validator function
    const textInput = event.target.value
    if (validateInput(textInput)) {
      setter(textInput)
    } else {
      alert("That is a naughty word!")
    }
    // if valid, update state
    // if invalid, throw an error to the user
    // setter(event.target.value)
  }

  return (
    <Box>
      <Typography>trello clone</Typography>
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
        <TextField onChange={(e) => handleTextChange(e, setTitle)} value={title} id="title" label="Title" />
        <TextField onChange={(e) => handleTextChange(e, setDescription)} value={description} id="description" label="Description" />
        <Button type="submit">Add card</Button>
      </form>
    </Box>
  )
}

export default App
