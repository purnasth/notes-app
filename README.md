# Notes App

Notes App is a simple note-taking app that allows you to jot down your thoughts and notes as they come to you. It's a great way to keep track of your ideas, to-do lists, and anything else you need to remember. It is built with React.js, Node.js, Express and PostgreSQL. 

---

## 🚀 Feature

- **Create, Read, Update, Delete Notes**: Users can create, read, update, and delete notes.
- **Authentication**: Users can register, login, and logout from the application.
- **Search Notes**: Users can search for notes by title or content.
- **Filter Notes**: Users can filter notes by category.
- **Sort Notes**: Users can sort notes by created date, modified date or ascending order.
- **Pagination**: Users can navigate through multiple pages of notes.
- **Toast Notifications**: Users receive toast notifications for actions like creating, updating, and deleting notes.
- **Profile Dashboard**: Users can view their profile information and update their profile picture.
- **Profanity Filter**: Notes with profane and offensive content are automatically filtered out.
- **2FA+OTP**: Users have to verify their email via OTP to access the app.
- **Swagger Documentation**: API documentation for developers.
- **Winston Logging**: Logging for monitoring and debugging.

---

## 📷 Demo

## User Registration

https://github.com/user-attachments/assets/9ac76351-c60e-4a1e-8df6-2e62fb234812

## Notes Ap

https://github.com/user-attachments/assets/8739ae09-c342-4f48-8ecd-95fa6434e2a7

---

## 🛠️ Technologies Use

### Frontend
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

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **PostgreSQL**: Database
- **Nodemon**: For auto-restarting the server
- **Cors**: For enabling CORS
- **Bcrypt**: For password hashing
- **JWT**: For generating and verifying JWT tokens
- **Nodemailer**: For sending emails
- **crypto**: For generating OTP
- **speakeasy**: For filtering profane content
- **cookie-parser**: For parsing cookies
- **dotenv**: For environment variables
- **jsonwebtoken**: For generating and verifying JWT tokens
- **pg**: PostgreSQL client for Node.js
- **winston**: For logging, monitoring and storing logs
- **swagger**: For API documentation

---

## 📁 Project Structure

### **backend/src/**

| Folder            | Description                                      |
|-------------------|-------------------------------------------------|
| `config/`         | Configuration files                              |
| `controllers/`    | Route controllers                                |
| `middlewares/`    | Custom middleware functions                      |
| `models/`         | Database models                                  |
| `routes/`         | API routes                                       |
| `utils/`          | Utility functions                                |

### **frontend/src/**

| Folder            | Description                                      |
|-------------------|-------------------------------------------------|
| `components/`     | Contains reusable React components               |
| `hooks/`          | Custom React hooks                               |
| `interfaces/`          | TypeScript type definitions                      |
| `layouts/`        | Layout components                                |
| `pages/`          | Page-level components                            |
| `utils/`          | Utility functions and API calls                  |

`Note`: For detailed project instructions, setup, and installation steps, please refer to the README.md file in the respective frontend and backend directories.

`Backend`: [README.md](backend/README.md)
`Frontend`: [README.md](frontend/README.md)

---


## 📝 Task Management

- Please refer to the [Project Board](https://github.com/users/purnasth/projects/6) for task management and progress tracking.

### Attachments

![image](https://github.com/user-attachments/assets/2e196adf-c0be-4aaf-99a0-57b57ff5f2fb)

---

## Engineering Decisions

- **Frontend**: The frontend is built with React.js, a popular JavaScript library for building user interfaces. React allows us to create reusable components and manage the state of our application efficiently. We chose Vite as our build tool for its fast build times and modern features. TypeScript is used for static typing, which helps catch errors early in the development process. TailwindCSS is used for styling, as it allows us to quickly build responsive designs without writing custom CSS. React Router is used for routing, allowing us to navigate between different pages in our application. Axios is used for making API calls to the backend server. React Hook Form and Yup are used for form validation, ensuring that user input is correct before submitting it to the server. React Icons is used for adding icons to our components. React Toastify is used for displaying toast notifications to the user. Chart.js and ReCharts are used for creating charts and graphs to visualize data. Moment.js is used for date and time formatting, making it easy to display dates in a user-friendly format. Dotenv is used for managing environment variables, allowing us to keep sensitive information out of our codebase.

- **Backend**: The backend is built with Node.js, a JavaScript runtime that allows us to run JavaScript code on the server. Express is used as a web framework for Node.js, providing a set of tools for building web applications. PostgreSQL is used as the database for storing user data and notes. Nodemon is used for auto-restarting the server when changes are made to the codebase. Cors is used to enable Cross-Origin Resource Sharing, allowing the frontend to make requests to the backend server. Bcrypt is used for hashing passwords, ensuring that user data is stored securely. JWT is used for generating and verifying JSON Web Tokens, which are used for user authentication. Nodemailer is used for sending emails, such as verification emails and password reset emails. Crypto is used for generating one-time passwords (OTPs) for two-factor authentication. Speakeasy is used for filtering profane content from user input. Cookie-parser is used for parsing cookies sent by the frontend. Jsonwebtoken is used for generating and verifying JSON Web Tokens. Pg is a PostgreSQL client for Node.js, allowing us to interact with the database from our Node.js server.

---

## Assumptions Made During Development

- **Frontend**: We assume that users have a basic understanding of how to use a web application. Users should be able to navigate between different pages, interact with forms, and understand how to use common UI components like buttons and input fields. We also assume that users have a modern web browser that supports the latest web technologies, such as ES6 JavaScript, CSS Grid, and Flexbox. Users should have a stable internet connection to access the application and should be able to create an account and log in to the application.

- **Backend**: We assume that users have a basic understanding of how web servers work and how to make HTTP requests. Users should be able to send requests to the backend server and receive responses in JSON format. We also assume that users have a basic understanding of databases and how to interact with them using SQL queries. Users should be able to create, read, update, and delete data in the database. We also assume that users have a basic understanding of authentication and security best practices. Users should be able to create secure passwords, verify their email address, and enable two-factor authentication to protect their account.

---

## Future Enhancements

- **Monitoring and Logging**: Implement monitoring and logging to track errors, performance metrics, and user interactions in the application.
- **Swagger Documentation**: Add Swagger documentation to provide a detailed API reference for developers and users.
- **Mobile App**: Develop a mobile app version of the application for iOS and Android devices.
- **Accessibility**: Improve accessibility by adding ARIA attributes, keyboard navigation, and other features to make the application usable by people with disabilities.
- **Offline Support**: Implement offline support using service workers and IndexedDB to allow users to access the application even when they are offline.
- **Real-time Collaboration**: Add real-time collaboration features to allow multiple users to edit the same note simultaneously.
- **Voice Recognition**: Implement voice recognition to allow users to create notes by speaking into their microphone.
- **Machine Learning**: Use machine learning to automatically categorize notes, suggest tags, and provide insights based on the user's notes.
- **Localization**: Add support for multiple languages and locales to make the application accessible to users around the world.
- **Automated Testing**: Implement automated testing using tools like Jest and React Testing Library to ensure that new features do not introduce regressions.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Set up a CI/CD pipeline to automate the testing, building, and deployment of the application to production.
- **User Analytics**: Use analytics tools like Google Analytics or Amplitude to track user behavior and make data-driven decisions to improve the application.
- **Feedback Mechanism**: Add a feedback mechanism to allow users to submit feedback, bug reports, and feature requests directly from the application.
- **Documentation**: Improve the documentation of the application by adding inline comments, code examples, and detailed guides for developers and users.

---

## Prerequisites 

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).
- **PostgreSQL**: Make sure you have PostgreSQL installed on your machine. You can download it from [https://www.postgresql.org/](https://www.postgresql.org/).
- **Git**: Make sure you have Git installed on your machine. You can download it from [https://git-scm.com/](https://git-scm.com/).
- **npm/pnpm**: Make sure you have npm or pnpm installed on your machine. You can install it by running `npm install -g npm` or `npm install -g pnpm`.
- **postman**: Make sure you have postman installed on your machine. You can download it from [https://www.postman.com/](https://www.postman.com/).

---

Thank you for using Notes App! We hope you enjoy using it as much as we enjoyed building it. If you have any questions, feedback, or feature requests, please don't hesitate to reach out to us. Happy note-taking!

