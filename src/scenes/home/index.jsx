import { useEffect, useState } from "react";
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
import { Delete } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

import { api } from "../../data";
import { add, set, remove } from "./card-slice.js";
import { validateInput } from "../../utils/validators";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [titleValid, setTitleValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);

  const cards = useSelector(({ cardReducer }) => cardReducer.value);
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/cards")
      .then(({ data }) => {
        dispatch(set(data));
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

  const addCard = async (event) => {
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

      dispatch(add(data));
    } catch ({ message }) {
      setErrorMessage(`oops, something went wrong: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (id) => {
    // set loading state
    setLoading(true);

    try {
      // send DELETE request to delete path on backend
      // pass in the id

      await api.delete(`/cards/${id}`);
      // cool, the request was successful
      // remove the card from the react state
      // setCards(cardsCopy);
      dispatch(remove(id));
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

      {cards.map(({ title, description, id }) => (
        <Box key={id}>
          <Card variant="outlined">
            <CardContent>
              <Typography>title: {title}</Typography>
              <Typography>description: {description}</Typography>
              <IconButton onClick={() => deleteCard(id)}>
                <Delete />
              </IconButton>
            </CardContent>
          </Card>
        </Box>
      ))}
      <form onSubmit={addCard}>
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
