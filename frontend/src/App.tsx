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
import Navbar from './layouts/Navbar';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <RouterToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
          // how to change the color of hte progress bar
          // toastStyle={{ backgroundColor: '#fff', color: '#111111' }}

        />
      </Router>
    </>
  );
};

export default App;
