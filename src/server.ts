import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: Application = express();
const port = 3000;

app.use(bodyParser.json());

interface Note {
  id: number;
  title: string;
  body: string;
}

let notes: Note[] = [
  {
    "id": 1,
    "title": "Project Task - Sprint 3",
    "body": "Task: Implement user authentication. Description: Implement user authentication using OAuth 2.0 for enhanced security. Collaborate with the frontend team to integrate the authentication flow seamlessly."
  },
  {
    "id": 2,
    "title": "Personal To-Do List",
    "body": "1. Grocery shopping for the week.  2. Complete coding assignment. 3. Schedule dentist appointment. 4. Read chapter 5 of the novel. 5. Attend yoga class at 6 PM."
  },
  {
    "id": 3,
    "title": "Bug Report - App Crash",
    "body": "Issue: The application crashes when attempting to open the 'Settings' page.Steps to reproduce: 1. Open the app. 2. Navigate to the 'Settings' page.3. App crashes unexpectedly."
  },
  {
    "id": 4,
    "title": "Creative Writing Idea - Fantasy Novel",
    "body": "Title: 'Whispers of Eldoria'Concept: A young mage discovers a hidden realm filled with ancient magic and mythical creatures. As they uncover the secrets of Eldoria, they must navigate political intrigue and protect the balance between magic and reality."
  },
  {
    "id": 5,
    "title": "Business Meeting Notes - Sales Strategy",
    "body": "Agenda: 1. Review sales performance for Q3. 2. Introduce new marketing campaign. 3. Discuss potential partnerships. 4. Set targets for the upcoming quarter.Key Points: Focus on customer engagement, streamline sales processes, and explore innovative marketing channels."
  }
];

let nextId = notes.length + 1;

const validateNotes = (req: Request, res: Response, next: Function) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find((n) => n.id === noteId);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.locals.note = note;
  next();
};

// Get all notes
app.get('/notes', (req: Request, res: Response) => {
  res.json(notes);
});


app.get('/notes/:id', validateNotes, (req: Request, res: Response) => {
  res.json(res.locals.note);
});


app.post('/notes', (req: Request, res: Response) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required fields' });
  }

  // Generate a new id
  const id = nextId++;
  
  // Check if the generated id already exists
  if (notes.some((note) => note.id === id)) {
    return res.status(409).json({ error: 'Generated id already exists' });
  }

  const newNote: Note = {
    id,
    title,
    body,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});


// Update a specific note
app.put('/notes/:id', validateNotes, (req: Request, res: Response) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required fields' });
  }

  const updatedNote = {
    id: res.locals.note.id,
    title,
    body,
  };

  const index = notes.findIndex((n) => n.id === updatedNote.id);
  notes[index] = updatedNote;

  res.json(updatedNote);
});

// Delete a specific note
app.delete('/notes/:id', validateNotes, (req: Request, res: Response) => {
  notes = notes.filter((n) => n.id !== res.locals.note.id);
  res.json({ message: 'Note deleted successfully' });
});

app.use((err: any, _req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
