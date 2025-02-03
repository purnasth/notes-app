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
pnpm install express pg cors bcryptjs jsonwebtoken dotenv cookie-parser
pnpm install --save-dev typescript @types/node @types/express @types/cors ts-node nodemon @types/pg @types/bcryptjs @types/jsonwebtoke @types/cookie-parser
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

```
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
```

<!-- ```
📂 backend/
├── 📂 src/
│   │── 📂 config/
│   │    └── db.ts 
│   │── 📂 controllers/
│   │    └── authController.ts
│   │── 📂 middleware/
│   │    ├── authMiddleware.ts
│   │    └── errorHandler.ts
│   │── 📂 models/
│   │    ├── sessionModel.ts
│   │    └── userModel.ts
│   │── 📂 routes/
│   │    └── authRoutes.ts
│   │── 📂 utils/
│   │    └── helper.ts
│   └── index.ts
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
``` -->

`Note:` The **src/** directory contains subdirectories for controllers, models, routes, and utilities. The **config/** directory will store configuration files. The **index.ts** file will be the entry point for the application.

- Add `.env` file with the following environment variables:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=notes_app
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

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
  (2 rows)
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