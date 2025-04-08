# Notes App - Backend

## Set Up the Backend

### 1.1 Initialize the Project

<!-- Create a new directory for your project:

```bash
mkdir notes-app
cd notes-app
``` -->

Initialize the backend:

```bash
mkdir backend
cd backend
pnpm init
```

Install dependencies:

```bash
pnpm install express pg cors bcryptjs jsonwebtoken dotenv cookie-parser moment
pnpm install --save-dev typescript @types/node @types/express @types/cors ts-node nodemon @types/pg @types/bcryptjs @types/jsonwebtoke @types/cookie-parser @types/moment
```

`Note:` express is a web framework for Node.js, pg is a PostgreSQL client, cors is a middleware for enabling CORS with various options, bcryptjs is a library for hashing passwords, jsonwebtoken is a library for generating JWTs, and dotenv is a library for loading environment variables from a .env file.

Set up TypeScript:

```bash
npx tsc --init
```

Update the tsconfig.json file:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

`Note:` The **tsconfig.json** file is updated to specify the target version of ECMAScript, the module system, the output directory, the root directory of input files, and other compiler options.

Create the folder structure:

<!-- ```
📂 backend/
├── 📂 src/
│   ├── 📂 controllers/
│   ├── 📂 models/
│   ├── 📂 routes/
│   ├── 📂 utils/
│   ├── 📂 config/
│   └── index.ts
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
``` -->

```
📂 backend/
├── 📂 logs/
│   └── app.log
├── 📂 prisma/
│   │── 📂 migration/
│   │    ├── migration_lock.toml 
│   │── schema.prisma
├── 📂 src/
│   │── 📂 config/
│   │    ├── db.ts 
│   │    ├── email.ts 
│   │    └── swagger.ts 
│   │── 📂 controllers/
│   │    ├── authController.ts
│   │    └── noteController.ts
│   │── 📂 interfaces/
│   │    └── types.ts
│   │── 📂 middleware/
│   │    ├── authMiddleware.ts
│   │    ├── errorHandler.ts
│   │    └── requestLogger.ts
│   │── 📂 models/
│   │    ├── noteModel.ts
│   │    ├── sessionModel.ts
│   │    └── userModel.ts
│   │── 📂 routes/
│   │    ├── authRoutes.ts
│   │    └── noteRoutes.ts
│   │── 📂 utils/
│   │    ├── helper.ts
│   │    └── logger.ts
│   └── index.ts
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

`Note:` The **src/** directory contains subdirectories for controllers, models, routes, and utilities. The **config/** directory will store configuration files. The **index.ts** file will be the entry point for the application.

- Add `.env` file with the following environment variables:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=notes_app
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_user@gmail.com
EMAIL_PASS=your_email_app_password

```

`NOTE`: To generate an app password for your Gmail account, follow the instructions [here](https://support.google.com/accounts/answer/185833?hl=en) or - navigate to your Google Account settings, click on Security, and then enable Two Factor Authentication. After that, search for App Passwords and generate a new app password for your email account and use it in the `.env` file.

`Note:` Replace the placeholders with your database credentials and JWT secret.

- Add `.gitignore` file with the following content:

```gitignore
node_modules
dist
.env
```

`Note:` The **.gitignore** file specifies which files and directories to ignore when pushing changes to a Git repository.

- Update `package.json` for scripts:

```json
"scripts": {
 "start": "node dist/index.js",
  "build": "tsc",
  "dev": "nodemon src/index.ts"
}
```

- Run the backend: 

1. Start the development server:

```bash
pnpm run dev
```

Open a browser and navigate to `http://localhost:5000/` to see the message "API is running."

The backend is now set up and running on port 5000.

2. Build and start the production server:

```bash
pnpm run build
pnpm run start
```

### 1.2 Set Up the Database Connection `PostgreSQL`

- Install the `postgreSQL` package and open the `psql` shell:

- Open the SQL Shell (psql) application (it should be installed with PostgreSQL).
- Enter the following details:
  - Server: Press `Enter` to use the default (`localhost`).
  - Database: Press `Enter` to use the default (`postgres`).
  - Port: Press `Enter` to use the default (`5432`).
  - Username: Press `Enter` to use the default (`postgres`).
  - Password: Enter the `password` you set during installation.
- You should see a prompt like this: `postgres=#`

Once logged in, you’ll see a prompt like this:

```bash
postgres=#
```

```bash
-- Create a database
CREATE DATABASE notes_app;

-- Connect to the database
\c notes_app;

-- Create a users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a sessions table for "Remember Me" functionality
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    categories VARCHAR(255)[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_pinned BOOLEAN DEFAULT false,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);
```

To verify the database was created, list all databases:

```sql
\l
```

You should see `notes_app` in the list.
Switch to the `notes_app` database:

```sql
\c notes_app
```

Verify the tables were created:

```sql
\dt
```

You should see both `users` and `sessions` in the list.
Like this:

```bash
notes_app=# \dt
         List of relations
 Schema |   Name   | Type  |  Owner
--------+----------+-------+----------
  public | sessions | table | postgres
  public | users    | table | postgres
  public | notes    | table | postgres
  (3 rows)
```

### 1.3 Create the Database Connection

Create a new file `db.ts` in the `config/` directory:

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

export default pool;
```

`Note:` The `db.ts` file creates a connection pool using the `pg` package and loads the database credentials from the `.env` file using `dotenv`.


## Test the API Endpoints in Postman

1. Register a new user:

- **POST** `http://localhost:5000/api/auth/register`

Request body:

```json
{
  "username": "purna_shrestha",
  "email": "purna@example.com",
  "password": "notes-app"
}
```

Response:

```json
{
    "message": "User registered successfully",
    "user": {
        "id": 1,
        "username": "purna_shrestha",
        "email": "purna@example.com",
        "password_hash": "$2a$10$/LuhARXAogH3dKaQxEivXuJz1DWxgc6ftf2iFPYpGCH5TZBtLC4l6",
        "created_at": "2025-02-02T17:00:37.377Z"
    }
}
```

2. Login with the registered user:

- **POST** `http://localhost:5000/api/auth/login`

Request body:

```json
{
  "email": "purna@example.com",
  "password": "notes-app"
}
```

Response:

```json
{
    "message": "Login successful",
    "token": "YOUR_JWT_TOKEN"
}
```
`Note:` Copy the `JWT token` from the response. You will need for `authenticated` requests.

Here, your expected debugging output should be like this:

```bash
Creating a new user...
User registered successfully
Creating session in the database...
Session created successfully
Cookie set successfully
Login successful for user: you@example.com
```


3. Logout the user

- **POST** `http://localhost:5000/api/auth/logout`

Request headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

`Note:` For adding the `bearer token` in the `Authorization` header, open `Auth Type` dropdown and select `Bearer Token` and paste your above copied `JWT token`.

Response:

```json
{
    "message": "Logout successful"
}
```

4. Get the current user

- **GET** `http://localhost:5000/api/auth/me`

Request headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}

`Note:` For adding the `bearer token` in the `Authorization` header, open `Auth Type` dropdown and select `Bearer Token` and paste your above copied `JWT token`.

Response:

```json
{
    "id": 1,
    "username": "purna_shrestha",
    "email": "purna@example.com",
    "created_at": "2025-02-02T17:00:37.377Z"
}
```

5. Fetch all users

- **GET** `http://localhost:5000/api/auth/users`

Request headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}

`Note:` For adding the `bearer token` in the `Authorization` header, open `Auth Type` dropdown and select `Bearer Token` and paste your above copied `JWT token`.

Response:

```json
[
  {
    "id": 1,
    "username": "purna",
    "email": "purna@gmail.com",
    "created_at": "2025-02-03T07:38:29.970Z"
  },
  {
    "id": 2,
    "username": "test",
    "email": "test@example.com",
    "created_at": "2025-02-03T07:38:29.970Z"
  }
]
```

---

1. Send OTP to the user

- **POST** `http://localhost:5000/api/auth/send-otp`
- **Purpose:** Send an OTP to the user's email for verification.

Request body:

```json
{
  "email": "your_email@gmail.com",
}

Response:

```json
{
    "message": "OTP sent successfully"
}
```

2. Verify OTP

- **POST** `http://localhost:5000/api/auth/verify-otp`
- **Purpose:** Verify the OTP sent to the user's email.

Request body:

```json
{
  "email": "your_email@gmail.com",
  "otp": "your_otp"
}

Response:

-- Success:

```json
{
    "message": "OTP verified successfully"
}

-- Error:

```json
{
    "error": "Invalid OTP"
}

-- Expired:

```json
{
    "error": "OTP expired"
}
```

--- 

6. Get all notes

- **GET** `http://localhost:5000/api/notes`
- **Purpose:** Fetch all notes from the database.

Request headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}

`Note:` For adding the `bearer token` in the `Authorization` header, open `Auth Type` dropdown and select `Bearer Token` and paste your above copied `JWT token`.

Response:

```json
[
  {
    "id": 1,
    "title": "Test Note",
    "content": "This is a test note",
    "categories": [
        "work",
        "personal"
    ],
    "created_at": "2025-02-03T20:03:22.614Z",
    "modified_at": "2025-02-03T20:03:22.614Z",
    "is_pinned": false,
    "user_id": 2
  },
  {
    "id": 2,
    "title": "Another Note",
    "content": "This is another note",
    "categories": [
        "work"
    ],
    "created_at": "2025-02-03T20:03:22.614Z",
    "modified_at": "2025-02-03T20:03:22.614Z",
    "is_pinned": true,
    "user_id": 2
  }
]
```

2. Create a new note

- **POST** `http://localhost:5000/api/notes`
- **Purpose:** Create a new note in the database.

Request body:

```json
{
  "title": "New Note",
  "content": "This is a new note",
  "categories": ["work"]
}
```

Request headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}

`Note:` For adding the `bearer token` in the `Authorization` header, open `Auth Type` dropdown and select `Bearer Token` and paste your above copied `JWT token`.

Response:

```json
{
    "id": 3,
    "title": "New Note",
    "content": "This is a new note",
    "categories": [
        "work"
    ],
    "created_at": "2025-02-03T20:03:22.614Z",
    "modified_at": "2025-02-03T20:03:22.614Z",
    "is_pinned": false,
    "user_id": 2
}
```

3. Update a note

- **PUT** `http://localhost:5000/api/notes/:id`
- **Purpose:** Update an existing note in the database.

Request body:

```json
{
  "title": "Updated Note Title: from CRUD update",
  "content": "This is the updated content",
  "categories": ["work", "CRUD"]
}
```

Request headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

Response:

```json
{
    "id": 3,
    "title": "Updated Note Title: from CRUD update",
    "content": "This is the updated content",
    "categories": [
        "work",
        "CRUD"
    ],
    "created_at": "2025-02-03T20:14:28.460Z",
    "modified_at": "2025-02-03T20:18:54.365Z",
    "is_pinned": false,
    "user_id": 2
}
```

4. Delete a note

- **DELETE** `http://localhost:5000/api/notes/:id`
- **Purpose:** Delete an existing note from the database.

Request headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

Response:

- Status: `204 No Content`
- Body: No content(empty response)

5. Toggle pin status of a note

- **PUT** `http://localhost:5000/api/notes/:id/pin`
- **Purpose:** Toggle the pin status of a note.

Request headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

Response:

- Status: `200 OK`

```json
{
    "id": 3,
    "title": "Updated Note Title: from CRUD update",
    "content": "This is the updated content",
    "categories": [
        "work",
        "CRUD"
    ],
    "created_at": "2025-02-03T20:14:28.460Z",
    "modified_at": "2025-02-03T20:18:54.365Z",
    "is_pinned": true,
    "user_id": 2
}
```

6. Error Scenarios

- a. Unauthorized access (Missing or invalid token)
  - **Status**: `401 Unauthorized`
  - **Response**: `{"error": "Unauthorized"}`

- b. Note not found (Invalid note ID)
  - **Status**: `404 Not Found`
  - **Response**: `{"error": "Note not found"}`

- c. Invalid request (Missing or invalid request body)
  - **Status**: `400 Bad Request`
  - **Response**: `{"error": "Missing required fields: title, content"}`

- d. Internal server error (Database error)
  - **Status**: `500 Internal Server Error`
  - **Response**: `{"error": "Internal server error"}`

7. Search notes

- **GET** `http://localhost:5000/api/notes/search=<query>`
- **Purpose:** Search notes based on the query string.
- **Example:** `http://localhost:5000/api/notes?search=test

Request headers:

```json
{
  "Authorization": `Bearer <JWT_TOKEN>`
} 

`Note:` For adding the `bearer token` in the `Authorization` header, open `Auth Type` dropdown and select `Bearer Token` and paste your above copied `JWT token`.

Response:

```json
[
  {
    "id": 1,
    "title": "Test Note",
    "content": "This is a test note",
    "categories": [
        "work",
        "personal"
    ],
    "created_at": "2025-02-03T20:03:22.614Z",
    "modified_at": "2025-02-03T20:03:22.614Z",
    "is_pinned": false,
    "user_id": 2
  }
]
```

8. Sort By Created Date

- **GET** `http://localhost:5000/api/notes?sortBy=created_at&sortOrder=desc`
- **Purpose:** Sort notes by created date in descending order.

Request headers:

```json
{
  "Authorization": `Bearer <JWT_TOKEN>`
}
```

Response:

```json
[
  {
    "id": 2,
    "title": "Another Note",
    "content": "This is another note",
    "categories": [
        "work"
    ],
    "created_at": "2025-02-03T20:03:22.614Z",
    "modified_at": "2025-02-03T20:03:22.614Z",
    "is_pinned": true,
    "user_id": 2
  },
  {
    "id": 1,
    "title": "Test Note",
    "content": "This is a test note",
    "categories": [
        "work",
        "personal"
    ],
    "created_at": "2025-02-03T20:03:22.614Z",
    "modified_at": "2025-02-03T20:03:22.614Z",
    "is_pinned": false,
    "user_id": 2
  }
]
```

9. Sort by Alphabetical Order

- **GET** `http://localhost:5000/api/notes?sortBy=title&sortOrder=asc`
- **Purpose:** Sort notes by title in ascending order.

Request headers:

```json
{
  "Authorization": `Bearer <JWT_TOKEN>`
}
```

Response:

```json
[
  {
    "id": 2,
    "title": "Another Note",
    "content": "This is another note",
    "categories": [
        "work"
    ],
    "created_at": "2025-02-03T20:03:22.614Z",
    "modified_at": "2025-02-03T20:03:22.614Z",
    "is_pinned": true,
    "user_id": 2
  },
  {
    "id": 1,
    "title": "Test Note",
    "content": "This is a test note",
    "categories": [
        "work",
        "personal"
    ],
    "created_at": "2025-02-03T20:03:22.614Z",
    "modified_at": "2025-02-03T20:03:22.614Z",
    "is_pinned": false,
    "user_id": 2
  }
]
```

10. Pagination

- **GET** `http://localhost:5000/api/notes?page=2&limit=2`
- **Purpose:** Fetch notes with pagination.

Request headers:

```json
{
  "Authorization": `Bearer <JWT_TOKEN>`
}
```

Response:

```json
[
  {
    "id": 3,
    "title": "Updated Note Title: from CRUD update",
    "content": "This is the updated content",
    "categories": [
        "work",
        "CRUD"
    ],
    "created_at": "2025-02-03T20:14:28.460Z",
    "modified_at": "2025-02-03T20:18:54.365Z",
    "is_pinned": true,
    "user_id": 2
  },
  {
    "id": 4,
    "title": "New Note",
    "content": "This is a new note",
    "categories": [
        "work"
    ],
    "created_at": "2025-02-03T20:03:22.614Z",
    "modified_at": "2025-02-03T20:03:22.614Z",
    "is_pinned": false,
    "user_id": 2
  }
]
```

---

## Swagger Documentation

```
pnpm add swagger-jsdoc swagger-ui-express
pnpm i --save-dev @types/swagger-jsdoc @types/swagger-ui-express
```

- **URL**: `http://localhost:5000/api-docs`

The Swagger documentation provides detailed information about the API endpoints, request and response schemas, and example requests and responses.

`Note:` For Authentication, click on the `Authorize` button and enter the `JWT token` in the `Value` field. Click on `Authorize` to set the token for all requests.


---

## Winston Logger

- **Purpose:** The Winston logger is used to log information, errors, and debug messages to the console and log files.

```
pnpm add winston
pnpm add --save-dev @types/winston
```

`Note`: The `app.log` file will be created in the `logs/` directory to store the logs. 

Example log message:

```bash
[2025-02-10 17:19:09] INFO: POST /api/auth/login - ::1
[2025-02-10 17:19:09] INFO: User login attempt: purnashrestha0310@gmail.com
[2025-02-10 17:19:09] INFO: User logged in successfully: purnashrestha0310@gmail.com, username: purna-shrestha
[2025-02-10 17:19:10] INFO: GET /api/notes?search=&sortBy=modified_at&sortOrder=desc&page=1&limit=24 - ::1
[2025-02-10 17:19:10] INFO: GET /api/notes?search=&sortBy=modified_at&sortOrder=desc&page=1&limit=24 - ::1
[2025-02-10 17:23:08] INFO: POST /api/notes - ::1
[2025-02-10 17:23:08] INFO: Note created successfully for user 2
```

---

## Upgrade to Prisma from PostgreSQL

- **Purpose:** Migrate the database connection and queries to Prisma for a more efficient and type-safe approach.

1. Install Prisma:
```bash
pnpm add prisma @prisma/client
pnpm install prisma --save-dev
```

2. Initialize Prisma:
```bash
pnpm prisma init
```

3. Configure Prisma Schema:
```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            Int      @id @default(autoincrement())
  username      String   @unique
  email         String   @unique
  password_hash String
  created_at    DateTime @default(now())
  sessions      Session[]
  notes         Note[]
}

model Session {
  id            Int      @id @default(autoincrement())
  user_id       Int
  user          User     @relation(fields: [user_id], references: [id])
  session_token String   @unique
  expires_at    DateTime
  created_at    DateTime @default(now())
}

model Note {
  id          Int        @id @default(autoincrement())
  title       String
  content     String
  categories  String[]
  created_at  DateTime   @default(now())
  modified_at DateTime   @default(now())
  is_pinned   Boolean    @default(false)
  user_id     Int
  user        User       @relation(fields: [user_id], references: [id])
}
```

4. Update `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/notes_app"
```

5. Create & Apply Migrations:
```bash
pnpm prisma migrate dev --name init
```

6. Upate `db.ts` to use Prisma Client:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

7. Update Controllers, Models, and Routes to use Prisma Client.

```typescript
// Example: // src/controllers/noteController.ts

import prisma from '../config/db';

export const getNotes = async (req, res) => {
  try {
    const notes = await prisma.notes.findMany();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
```

8. Test the API Endpoints to ensure the migration was successful.

---

5. `NOTE`: For existing database, Pull your existing database schema into Prisma

```bash
pnpm prisma db pull
```

This command will: Fetch the existing database schema and generate Prisma Client.

Generate `schema.prisma` file with your current schema.

`// prisma/schema.prisma`, you will see the schema generated from your existing database.
```bash
model User {
  id         Int     @id @default(autoincrement())
  username   String  @unique
  email      String  @unique
  password   String
  createdAt  DateTime @default(now())
  sessions   Session[]
  notes      Note[]
}

model Session {
  id          Int    @id @default(autoincrement())
  userId      Int
  sessionToken String @unique
  expiresAt   DateTime
  createdAt   DateTime @default(now())

  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Note {
  id          Int    @id @default(autoincrement())
  title       String
  content     String
  categories  String[]
  createdAt   DateTime @default(now())
  modifiedAt  DateTime @default(now())
  isPinned    Boolean @default(false)
  userId      Int

  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

6. Generate Prisma Client

```bash
pnpm prisma generate
```

7. Start using `Migration` (for future changes)
Now, whenever you want to modify the database structure (add columns, tables, etc.), don't edit manually—instead, use Prisma migrations.

For example, to add a new is_admin column in the users table:

  1. Modify `schema.prisma`:
  ```bash
  model User {
id            Int        @id @default(autoincrement())
  username      String     @unique @db.VarChar(50)
  email         String     @unique @db.VarChar(100)
  password_hash String     @db.VarChar(255)
  created_at    DateTime?  @default(now()) @db.Timestamp(6)
  notes         notes[]
  sessions      sessions[]
  is_admin      Boolean    @default(false) // New column
}
  ```

  2. Create a new migration:
  ```bash
  pnpm prisma migrate dev --name add-is-admin
  ```

  - This will a. Genreate an SQL migration file in the `prisma/migrations` directory and b. Apply the changes to the database.

5. How to Track Migrations?
After running `migration`, Prisma will store them in: 

```bash
prisma/migrations
```


---