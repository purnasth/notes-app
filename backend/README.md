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
pnpm install --save-dev typescript @types/node @types/express @types/cors ts-node nodemon
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