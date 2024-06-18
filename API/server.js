import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const users = [];
const notes = [];
let currentNoteId = 0;
let currentUserId = 0;

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    if (existingUser.password === password) {
      res.json({ token: 'test1234' });
    } else {
      res.status(404).json({ error: "Incorrect password!" });
    }
  } else {
    res.status(409).json({ error: "Username doesn't exist!" });
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    res.status(409).json({ error: "Username is taken." });
  } else if(username === "" || password === ""){
      res.status(404).json({error: "Username and password cannot be empty!"})
  }else{
    const newUser = { id: ++currentUserId, username, password };
    users.push(newUser);
    res.status(201).json(newUser);
  }
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: ++currentNoteId, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: "Note not found. No notes were deleted." });
  }
});

app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex > -1) {
    notes[noteIndex] = { id, title, content };
    res.json(notes[noteIndex]);
  } else {
    res.status(404).json({ error: "Note not found. No notes were updated." });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
