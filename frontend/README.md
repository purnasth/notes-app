# Notes App

Notes App is a MERN stack application that allows users to create, read, update, and delete notes. The application is built using React, Node.js, Express, and MongoDB.

---

## 🚀 Features

- **Modern & Minimalist UI Design**: The application has a clean and minimalist user interface that is easy to use and navigate.
- **Responsive Layout**: The application is fully responsive and works on all devices and screen sizes.
- **User Authentication**: Users can register, login, and logout from the application.
- **Create, Read, Update, Delete Notes**: Users can create, read, update, and delete notes.
- **Pin Notes**: Users can pin notes to keep them at the top of the list.
- **Search Notes**: Users can search for notes by title or content.
- **Filter Notes**: Users can filter notes by category.
- **Sort Notes**: Users can sort notes by created date, modified date or ascending order.
- **Pagination**: Users can navigate through multiple pages of notes.
- **Toast Notifications**: Users receive toast notifications for actions like creating, updating, and deleting notes.
- **Profile Dashboard**: Users can view their profile information and update their profile picture.
- **Profanity Filter**: Notes with profane and offensive content are automatically filtered out.

---

## 🛠️ Technologies Used

- **React**: Frontend library
- **Vite**: Fast build tool
- **TypeScript**: For static typing
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: For routing
- **Axios**: For API calls
- **React Hook Form**: For form validation
- **Yup**: For schema validation
- **React Icons**: For icons
- **React Toastify**: For toast notifications
- **Chart.js**: For charts and graphs
- **ReCharts**: For charts and graphs
- **Moment.js**: For date and time formatting
- **Dotenv**: For environment variables

---

## 📁 Project Structure

### **src/**

| Folder            | Description                                      |
|-------------------|-------------------------------------------------|
| `components/`     | Contains reusable React components               |
| `hooks/`          | Custom React hooks                               |
| `pages/`          | Page-level components                            |
| `styles/`         | Global CSS and TailwindCSS configurations        |
| `utils/`          | Utility functions and API calls                  |
| `types/`          | TypeScript type definitions                      |


## 📁 File Structure

```plaintext
📂 frontend
├── 📂 public
│   ├── favicon.ico
│   ├── robots.txt
│   └── index.html
├── 📂 src
│   ├── 📂 assets
│   │   ├── 📂 img
│   │   ├── 📂 svg
│   │   └── [Other Assets]
│   ├── 📂 components
│   │   ├── 📂 ui
│   │   │   ├── Modal.tsx
│   │   │   ├── NotesCard.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── SkeletonLoader.tsx
│   │   ├── PasswordToggle.tsx
│   │   └── SingleNote.tsx
|   ├── 📂 constants
│   │   └── data.ts
│   ├── 📂 hooks
│   │   └── useFormValidation.ts
│   ├── 📂 interfaces
│   │   └── types.ts
|   ├── 📂 layouts
│   │   ├── Navbar.tsx
│   │   └── Error404.tsx
│   ├── 📂 pages
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── 📂 utils
│   │   ├── api.ts
│   │   ├── helper.ts
│   │   └── validationSchemas.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
│   └── index.css
├── .env
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslintrc.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## ⚙️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/purnasth/notes-app.git
    ```
    ```
    cd frontend
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```
3. Create an `.env` file: 
    ```bash
    VITE_API_URL=https://api.com # Your API URL
    ```
4. Start the development server:
    ```bash
    pnpm run dev
    ```

---

## API Endpoints and Usage

1. `/auth/register`:
    - **Method**: POST
    - **Description**: Register a new user
    
2. `/auth/login`:
    - **Method**: POST
    - **Description**: Login an existing user

3. `/auth/logout`:
    - **Method**: POST
    - **Description**: Logout the current user

4. `/auth/me`:
    - **Method**: GET
    - **Description**: Get the current user

5. `/notes?query=...`: 
    - **Method**: GET
    - **Description**: Get all notes
    - **Method**: POST
    - **Description**: Create a new note
    - **Method**: PUT
    - **Description**: Update a note
    - **Method**: DELETE
    - **Description**: Delete a note

6. `/notes/:id`:
    - **Method**: GET
    - **Description**: Get a single note
    - **Method**: PUT
    - **Description**: Update a note
    - **Method**: DELETE
    - **Description**: Delete a note

7. `/notes/:id/pin`:
    - **Method**: PUT
    - **Description**: Pin a note
    - **Method**: DELETE
    - **Description**: Unpin a note"

8. `/auth/send-otp`:
    - **Method**: POST
    - **Description**: Send an OTP to the user's email

9. `/auth/verify-otp`:
    - **Method**: POST
    - **Description**: Verify the OTP sent to the user's email

---


## 📂 File Structure

``` plaintext
📂 frontend
  📂 notes-app
  ├── 📂 public
  │   ├── favicon.ico
  │   ├── robots.txt
  │   └── index.html
  ├── 📂 src
  │   ├── 📂 components
  │   │   ├── 📂 ui
  │   │   └── [Other Components]
  |   ├── 📂 components
  │   │   ├── 📂 ui
  │   │   └── [Other Components]
  |   ├── 📂 constants
  │   │   └── data.ts
  |   ├── 📂 layouts
  │   │   └── [Layout Components]
  │   ├── 📂 hooks
  │   │   └── useCustomHook.tsx
  │   ├── 📂 pages
  │   │   ├── Home.tsx
  │   │   └── About.tsx
  │   ├── 📂 utils
  │   │   ├── api.tsx
  │   ├── App.tsx
  │   ├── global.d.ts
  │   ├── main.tsx
  │   ├── vite-env.d.ts
  │   └── index.css
  ├── .env
  ├── .gitignore
  ├── .prettierignore
  ├── .prettierrc
  ├── eslintrc.config.js
  ├── index.html
  ├── package.json
  ├── postcss.config.js
  ├── README.md
  ├── tailwind.config.js
  ├── tsconfig.app.json
  ├── tsconfig.json
  ├── tsconfig.node.json
  └── vite.config.ts
```

---

## Available Scripts
- `dev`: vite
- `build`: vite build
- `preview`: vite preview

---

## Team Members

- **[Purna Shrestha](https://www.purnashrestha.com.np)** - _Frontend Developer_ - _UI/UX Designer_

---

## License

<!-- All designs, code, and assets used in this project are the property of `Purna Shrestha`. Unauthorized use, reproduction, or distribution of any designs, code, or assets without the express written permission of the owners is strictly prohibited and is subject to legal action. -->