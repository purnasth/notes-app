import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Home from './pages/Home';
import RouterToTop from './utils/RouterToTop';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './layouts/Navbar';
import { ToastContainer } from 'react-toastify';
import About from './pages/About';
import { getNotes } from './utils/api';
import { NoteProps } from './interfaces/types';
import UserProfile from './pages/UserProfile';
import axios from 'axios';
import VerifyOTP from './pages/VerifyOTP';

const PublicRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('modified_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const limit = 24;
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
    created_at: string;
  } | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Fetch notes whenever search, categories, sort, or page changes
  useEffect(() => {
    if (!user) return; // Fetch notes only if the user is authenticated

    const fetchNotes = async () => {
      try {
        const data = await getNotes(
          search,
          categories,
          sortBy,
          sortOrder,
          page,
          limit,
        );
        setNotes(data.notes);
        setTotal(data.total);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };
    fetchNotes();
  }, [user, search, categories, sortBy, sortOrder, page, limit]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token'); // Check if token exists
      if (!token) return; // Don't make the API call if user is not logged in

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }, // Ensure token is sent
          },
        );
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Handle search input change
  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(event.target.value);
  //   setPage(1); // Reset to the first page when search changes
  // };

  // Handle search input change on submit
  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue);
    setPage(1); // Reset to the first page when search changes
  };

  // Handle category filter change
  const handleCategoryChange = (selectedCategories: string[]) => {
    setCategories(selectedCategories);
    setPage(1); // Reset to the first page when categories change
  };

  // Handle sort change
  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
    setPage(1); // Reset to the first page when sorting changes
  };

  // Handle pagination change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Router>
        <RouterToTop />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <>
                  <Navbar
                    value={search}
                    onChange={handleSearchChange}
                    onCategoryChange={handleCategoryChange}
                    onSortChange={handleSortChange}
                    isNavOpen={isNavOpen}
                    setIsNavOpen={setIsNavOpen}
                    user={user}
                  />
                  <Home
                    notes={notes}
                    setNotes={setNotes}
                    page={page}
                    total={total}
                    limit={limit}
                    onPageChange={handlePageChange}
                    search={search}
                  />
                </>
              }
            />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={
              user ? (
                <UserProfile user={user} notes={notes} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
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
    </>
  );
};

export default App;
