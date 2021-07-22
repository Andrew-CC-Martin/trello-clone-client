import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Delete, Undo, Redo } from "@material-ui/icons";

import { api } from "../../data";
import { addCard, removeCard, setCards } from "./reducers.js";
import { validateInput } from "../../utils/validators";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [titleValid, setTitleValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);

  const cardsSlice = useSelector(({ cards }) => cards);
  const { past, present, future } = cardsSlice;
  const cards = present.value;

  const dispatch = useDispatch();

  // iniital API call to get all cards
  useEffect(() => {
    api
      .get("/cards")
      .then(({ data }) => {
        dispatch(setCards(data));
      })
      .catch(({ message }) =>
        setErrorMessage(`oops, something went wrong: ${message}`)
      )
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setTitleValid(validateInput(title));
  }, [title]);

  useEffect(() => {
    setDescriptionValid(validateInput(description));
  }, [description]);

  const add = async (event) => {
    event.preventDefault();
    setLoading(true);

    // async await version
    try {
      // send a post request to add the new card to the backend
      const { data } = await api.post("/cards", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      // update the component state with the new card
      dispatch(addCard(data));
    } catch ({ message }) {
      setErrorMessage(`oops, something went wrong: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (id, index) => {
    // set loading state
    setLoading(true);

    try {
      // send DELETE request to delete path on backend
      // pass in the id

      await api.delete(`/cards/${id}`);
      // cool, the request was successful
      // remove the card from the react state
      dispatch(removeCard(id));
    } catch ({ message }) {
      setErrorMessage(message);
    } finally {
      // unset loading state
      setLoading(false);
    }
  };

  return (
    <Box>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {loading && <CircularProgress />}
      <IconButton
        disabled={past.length === 0}
        onClick={() => dispatch(ActionCreators.undo())}
      >
        <Undo />
      </IconButton>
      <IconButton
        disabled={future.length === 0}
        onClick={() => dispatch(ActionCreators.redo())}
      >
        <Redo />
      </IconButton>

      {cards.map(({ title, description, id }, index) => (
        <Box key={id}>
          <Card variant="outlined">
            <CardContent>
              <Typography>title: {title}</Typography>
              <Typography>description: {description}</Typography>
              <IconButton onClick={() => deleteCard(id, index)}>
                <Delete />
              </IconButton>
            </CardContent>
          </Card>
        </Box>
      ))}
      <form onSubmit={add}>
        <TextField
          error={!titleValid}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id="title"
          label="Title"
        />
        <TextField
          error={!descriptionValid}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="description"
          label="Description"
        />
        <Button
          variant="contained"
          disabled={!titleValid || !descriptionValid}
          type="submit"
        >
          Add card
        </Button>
        <FormHelperText error={!titleValid || !descriptionValid}>
          Please don't use any naughty words
        </FormHelperText>
      </form>
    </Box>
  );
};
