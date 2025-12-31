# To-Do List API

A simple REST API for managing tasks built with Node.js and Express.

## Features

- Create new tasks
- Get all tasks
- Get single task by ID
- Update existing tasks
- Delete tasks

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your PORT:
   ```
   PORT=3000
   ```
4. Start the server:
   ```bash
   node List.js
   ```

## API Endpoints

- `POST /tasks` - Create a new task
- `GET /gettasks` - Get all tasks
- `GET /getsingletasks/:id` - Get a single task by ID
- `PUT /tasksupdate/:id` - Update a task
- `DELETE /deletetasks/:id` - Delete a task

## Task Structure

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "status": "pending"
}
```