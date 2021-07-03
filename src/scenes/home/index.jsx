import { useEffect, useState } from "react"
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  FormHelperText,
  IconButton
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Delete } from '@material-ui/icons'

import React from 'react'
import Modal from 'react-modal'

import { api } from "../../data"
import { validateInput } from "../../utils/validators"

//This is needed so screen readers don't see main content when modal is opened.
Modal.setAppElement('#root')

export const Home = () => {
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [titleValid, setTitleValid] = useState(true)
  const [descriptionValid, setDescriptionValid] = useState(true)
  const [modalTitle, setModalTitle] = useState("")
  const [modalDescription, setModalDescription] = useState("")

  useEffect(() => {
    api.get("/cards")
      .then(({ data }) => {
        setCards(data)
      })
      .catch(({ message }) => setErrorMessage(`oops, something went wrong: ${message}`))
      .finally(() => setLoading(false))
  }, [])

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
  
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(id) {
    setIsOpen(true);
    api.get(`/cards/${id}`)
      .then(({ data }) => {
        setModalTitle(data.title)
        setModalDescription(data.description)
      })

  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <Box>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {loading && <CircularProgress />}

      {cards.map(({ title, description, id }, index) => (
        <Box key={id}>
          <Card variant="outlined">
            <CardContent onClick={() => openModal(id)}>
              <Typography>title: {title}</Typography>
              <IconButton onClick={() => deleteCard(id, index)}>
                <Delete />
              </IconButton>
            </CardContent>
          </Card>
          <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Card Modal">
            <Typography>title: {modalTitle}</Typography>
            <Typography>description: {modalDescription}</Typography>
          </Modal>
        </Box>
      ))}
      <form onSubmit={addCard}>
        <TextField error={!titleValid} onChange={(e) => setTitle(e.target.value)} value={title} id="title" label="Title" />
        <TextField error={!descriptionValid} onChange={(e) => setDescription(e.target.value)} value={description} id="description" label="Description" />
        <Button disabled={!titleValid || !descriptionValid} type="submit">Add card</Button>
        <FormHelperText error={!titleValid || !descriptionValid}>Please don't use any naughty words</FormHelperText>
      </form>
    </Box>
  )
}

