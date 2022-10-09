import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import firebase from "firebase/compat/app";

import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from "@material-ui/icons";

import {
  Button,
  TextField,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";

import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [words, setwords] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");

  useEffect(() => {
    db.collection("words")
      .orderBy("datetime", "desc")
      .onSnapshot((snapshot) => {
        setwords(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().newWord,
              datatime: doc.data().datatime,
            };
          })
        );
      });
  }, []);

  const addWord = (event) => {
    event.preventDefault();
    db.collection("words").add({
      newWord: input,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const deleteword = (id) => {
    db.collection("words")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  const openUpdateDialog = (newWord) => {
    setOpen(true);
    setToUpdateId(newWord.id);
    setUpdate(newWord.name);
  };

  const editTodo = () => {
    db.collection("words").doc(toUpdateId).update({
      newWord: update,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <form noValidate>
        <Typography />
        <h2>Never Forget another word of Pittsburghese</h2>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="newWord"
          label="Enter Pittsburghese and Definition"
          name="newWord"
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addWord}
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add Word
        </Button>
      </form>

      <List dense={true}>
        {words.map((newWord) => (
          <ListItem key={newWord.id}>
            <ListItemText primary={newWord.name} secondary={newWord.datetime} />

            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Edit"
                onClick={() => openUpdateDialog(newWord)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteword(newWord.id)}
              >
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update Word"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            onChange={(event) => setUpdate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editTodo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
