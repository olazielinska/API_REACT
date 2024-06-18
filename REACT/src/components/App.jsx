import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import UpdateNote from "./UpdateNote";
import Register from "./Register";
import Login from "./Login";
import UseToken from "./UseToken";

function App() {
  const { token, setToken } = UseToken();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [showRegisterPage, setRegisterPage] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3001/notes", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setNotes(response.data))
        .catch((error) =>
          console.error("There was an error fetching the notes!", error)
        );
    }
  }, [token]);

  async function addNote(newNote) {
    try {
      const response = await axios.post("http://localhost:3001/notes", newNote);
      const addedNote = response.data;
      setNotes((prevNotes) => [...prevNotes, addedNote]);
    } catch (error) {
      console.error("There was an error adding the note!", error);
    }
  }

  async function deleteNote(id) {
    try {
      const response = await axios.delete(`http://localhost:3001/notes/${id}`);
      console.log("Note deleted successfully:", response.data);
      setNotes((prevNotes) =>
        prevNotes.filter((noteItem) => noteItem.id !== id)
      );
    } catch (error) {
      console.error("There was an error deleting the note!", error);
    }
  }

  function updateNote(id) {
    const noteToEdit = notes.find((note) => note.id === id);
    setCurrentNote(noteToEdit);
  }

  async function handleUpdate(id, updatedNote) {
    try {
      const response = await axios.put(
        `http://localhost:3001/notes/${id}`,
        updatedNote
      );
      const updatedNoteData = response.data;
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? updatedNoteData : note
        )
      );
    } catch (error) {
      console.error("Error while updating a note.", error);
    }
  }

  function handleCancel() {
    setCurrentNote(null);
  }

  function handleClick() {
    setRegisterPage(true);
  }

  function handleRegisterSuccess() {
    setRegisterPage(false);
  }

  return (
    <div>
      <Header />
      {!token ? (
        <>
          {showRegisterPage ? (
            <Register onRegisterSuccess={handleRegisterSuccess} />
          ) : (
            <>
              <button onClick={handleClick} className="register-page-button">Register</button>
              <Login setToken={setToken} />
            </>
          )}
        </>
      ) : (
        <div>
          {currentNote ? (
            <UpdateNote
              note={currentNote}
              onUpdate={handleUpdate}
              onCancel={handleCancel}
            />
          ) : (
            <CreateArea onAdd={addNote} />
          )}
          {notes.map((noteItem) => (
            <Note
              key={noteItem.id}
              id={noteItem.id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;