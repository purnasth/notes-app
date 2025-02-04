# Notes App

Notes App is a MERN stack application that allows users to create, read, update, and delete notes. The application is built using React, Node.js, Express, and MongoDB.

---

## 🚀 Features

- **Modern UI Design**:

---

## 🛠️ Technologies Used

- **React**: Frontend library
- **Vite**: Fast build tool
- **TypeScript**: For static typing
- **TailwindCSS**: Utility-first CSS framework

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
    VITE_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI # Your reCAPTCHA site key
    ```
4. Start the development server:
    ```bash
    pnpm run dev
    ```

---

## API Endpoints and Usage

1. `/api1` (api.tsx)
   - **Files**: ``, ``
   - **Usage**: 
   - **Details**:

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

## 📝 Frontend Documentation

### 1. For Deployment on Cloudflare:
``` plaintext
1. Go to the Cloudflare dashboard.
2. Select the website you want to deploy.
3. Go to the `Workers & Pages` tab.
4. Connect your GitHub repository.
5. Select the branch you want to deploy.
6. Click on the `Deploy` button.
    - use the following command: `pnpm run build`
    - use the following directory: `dist`
   OR 
   Simply select the "React Vite" framework and deploy.
```

## Team Members

- **[Purna Shrestha](https://www.purnashrestha.com.np)** - _Frontend Developer_ - _UI/UX Designer_

---

## License

<!-- All designs, code, and assets used in this project are the property of `Purna Shrestha`. Unauthorized use, reproduction, or distribution of any designs, code, or assets without the express written permission of the owners is strictly prohibited and is subject to legal action. -->