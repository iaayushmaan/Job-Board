# Job Board

A simple backend service for a job board built with Node.js, TypeScript, and MySQL. This service provides basic CRUD functionality for managing job postings.





##  API documentation

#### Stats

## API Endpoints

The following API endpoints are available for managing job postings:

| Method  | Endpoint        | Description                        |
|---------|-----------------|------------------------------------|
| **POST**   | `/jobs`          | Create a new job posting          |
| **GET**    | `/jobs`          | Retrieve all job postings         |
| **GET**    | `/jobs/:id`      | Retrieve a single job posting by ID |
| **PUT**    | `/jobs/:id`      | Update a job posting by ID        |
| **DELETE** | `/jobs/:id`      | Delete a job posting by ID        |

Each endpoint performs basic CRUD operations to manage job postings, including creation, retrieval, updating, and deletion.




## Run Locally

1. Clone the project

```bash
  git clone https://github.com/iaayushmaan/Job-Board.git
```

2. Go to the project directory

```bash
  cd ./Job-Board
```
### Backend Setup

3. Install Dependencies
```bash
  npm install
```
4. Set up your MySQL database:

- Create a database in MySQL called job_board (or change the configuration to your preferred name).
- Run the SQL queries found in database.sql to set up the table (postings).

5. Run the Application

```bash
  npm run start
```
You are live on "http://localhost:8080/".


## Authors

- [@iaayushmaan](https://www.github.com/iaayushmaan)

