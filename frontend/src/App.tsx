import React, { useEffect, useState } from 'react';
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
import About from './pages/About';
import { getNotes } from './utils/api';
import { NoteProps } from './interfaces/types';
import UserProfile from './pages/UserProfile';
import VerifyOTP from './pages/VerifyOTP';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('modified_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const limit = 24;
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Fetch notes whenever search, categories, sort, or page changes
  useEffect(() => {
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
  }, [search, categories, sortBy, sortOrder, page, limit]);

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
        <Navbar
          value={search}
          onChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                notes={notes}
                setNotes={setNotes}
                page={page}
                total={total}
                limit={limit}
                onPageChange={handlePageChange}
                search={search}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={
              <UserProfile
                user={{
                  id: 2,
                  username: 'purna_shrestha',
                  email: 'purna@gmail.com',
                  created_at: '2025-02-02T17:45:52.851Z',
                }}
                notes={notes}
              />
            }
          />
          <Route path="/verify-otp" element={<VerifyOTP />} />
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

//! has an error
// import React, { useEffect, useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from 'react-router-dom';
// import Home from './pages/Home';
// import RouterToTop from './utils/RouterToTop';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Navbar from './layouts/Navbar';
// import { ToastContainer } from 'react-toastify';
// import About from './pages/About';
// import { getNotes } from './utils/api';
// import { NoteProps } from './interfaces/types';

// const App: React.FC = () => {
//   const [search, setSearch] = useState('');
//   const [categories, setCategories] = useState<string[]>([]);
//   const [sortBy, setSortBy] = useState('modified_at');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
//   const [page, setPage] = useState(1);
//   const limit = 12;
//   const [total, setTotal] = useState(0);
//   const [notes, setNotes] = useState<NoteProps[]>([]);
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   // Check if the user is authenticated
//   const isAuthenticated = () => {
//     const token = localStorage.getItem('token');
//     return !!token;
//   };

//   const ConditionalNavbar = ({ children }: { children: JSX.Element }) => {
//     const location = useLocation();
//     const hideNavbarPaths = ['/login', '/register', '/signup'];

//     return (
//       <>
//         {!hideNavbarPaths.includes(location.pathname) && (
//           <Navbar
//             value={search}
//             onChange={handleSearchChange}
//             onCategoryChange={handleCategoryChange}
//             onSortChange={handleSortChange}
//             isNavOpen={isNavOpen}
//             setIsNavOpen={setIsNavOpen}
//           />
//         )}
//         {children}
//       </>ildren;
//   };

//   // Public Route Component
//   const PublicRoute = ({ children }: { children: JSX.Element }) => {
//     if (isAuthenticated()) {
//       return <Navigate to="/" />;
//     }
//     return childr
//     );
//   };

//   // Protected Route Component
//   const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//     if (!isAuthenticated()) {
//       return <Navigate to="/login" />;
//     }
//     return chen;
//   };

//   // Fetch notes whenever search, categories, sort, or page changes
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const data = await getNotes(
//           search,
//           categories,
//           sortBy,
//           sortOrder,
//           page,
//           limit,
//         );
//         setNotes(data.notes);
//         setTotal(data.total);
//       } catch (error) {
//         console.error('Failed to fetch notes:', error);
//       }
//     };
//     fetchNotes();
//   }, [search, categories, sortBy, sortOrder, page, limit]);

//   // Handle search input change
//   // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   setSearch(event.target.value);
//   //   setPage(1); // Reset to the first page when search changes
//   // };

//   // Handle search input change on submit
//   const handleSearchChange = (searchValue: string) => {
//     setSearch(searchValue);
//     setPage(1); // Reset to the first page when search changes
//   };

//   // Handle category filter change
//   const handleCategoryChange = (selectedCategories: string[]) => {
//     setCategories(selectedCategories);
//     setPage(1); // Reset to the first page when categories change
//   };

//   // Handle sort change
//   const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
//     setSortBy(sortBy);
//     setSortOrder(sortOrder);
//     setPage(1); // Reset to the first page when sorting changes
//   };

//   // Handle pagination change
//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   return (
//     <>
//       <Router>
//         <RouterToTop />

//         <ConditionalNavbar>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <Home
//                     notes={notes}
//                     setNotes={setNotes}
//                     page={page}
//                     total={total}
//                     limit={limit}
//                     onPageChange={handlePageChange}
//                     search={search}
//                   />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/login"
//               element={
//                 <PublicRoute>
//                   <Login />
//                 </PublicRoute>
//               }
//             />
//             <Route
//               path="/register"
//               element={
//                 <PublicRoute>
//                   <Register />
//                 </PublicRoute>
//               }
//             />
//             <Route path="/signup" element={<Navigate to="/register" />} />
//             <Route path="/about" element={<About />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </ConditionalNavbar>
//       </Router>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss={false}
//         draggable
//         pauseOnHover
//       />
//     </>
//   );
// };

// export default App;
