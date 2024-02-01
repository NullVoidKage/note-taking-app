 #Note Taking APP

A RESTful API for managing notes with CRUD operations.

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NullVoidKage/note-taking-app.git
   cd notes-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The server will be running at `http://localhost:3000`.

## API Endpoints

1. **Get All Notes**
   - Endpoint: `GET /notes`
   - Response:
     ```json
     [
       {
         "id": 1,
         "title": "Note 1",
         "body": "Body of note 1"
       },
       {
         "id": 2,
         "title": "Note 2",
         "body": "Body of note 2"
       }
     ]
     ```

2. **Get a Specific Note by ID**
   - Endpoint: `GET /notes/:id`
   - Response:
     ```json
     {
       "id": 1,
       "title": "Note 1",
       "body": "Body of note 1"
     }
     ```

3. **Create a New Note**
   - Endpoint: `POST /notes`
   - Request (JSON):
     ```json
     {
       "title": "New Note",
       "body": "Body of the new note"
     }
     ```
   - Response:
     ```json
     {
       "id": 3,
       "title": "New Note",
       "body": "Body of the new note"
     }
     ```

4. **Update a Specific Note by ID**
   - Endpoint: `PUT /notes/:id`
   - Request (JSON):
     ```json
     {
       "title": "Updated Note",
       "body": "Updated body of the note"
     }
     ```
   - Response:
     ```json
     {
       "id": 1,
       "title": "Updated Note",
       "body": "Updated body of the note"
     }
     ```

5. **Delete a Specific Note by ID**
   - Endpoint: `DELETE /notes/:id`
   - Response:
     ```json
     {
       "message": "Note deleted successfully"
     }
     ```

You can test these endpoints using an API testing tool like Postman or use `curl` from the command line.
