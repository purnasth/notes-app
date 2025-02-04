import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import RouterToTop from './utils/RouterToTop';
import Login from './pages/Login';
import Register from './pages/Register';
// import Navbar from './layouts/Navbar';
import { ToastContainer } from 'react-toastify';
import About from './pages/About';

// Check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Public Route Component
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <>
      <Router>
        <RouterToTop />
        {/* <Navbar /> */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/signup" element={<Navigate to="/register" />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </Router>
    </>
  );
};

export default App;
