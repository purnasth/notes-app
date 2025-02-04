import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Configure Axios to send credentials (cookies) with every request
axios.defaults.withCredentials = true;

// Add request interceptor to include token from localStorage
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// Register a new user
export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// Login a user
export const loginUser = async (
  email: string,
  password: string,
  rememberMe: boolean,
) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/login`,
    {
      email,
      password,
      rememberMe,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Handle user logout
export const handleLogout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/auth/logout`);
    localStorage.removeItem('token');
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Create a new note
export const createNote = async (note: {
  title: string;
  content: string;
  categories: string[];
}) => {
  const response = await axios.post(`${API_BASE_URL}/notes`, note);
  return response.data;
};

// Fetch all notes
export const getNotes = async () => {
  const response = await axios.get(`${API_BASE_URL}/notes`);
  return response.data;
};

// Update a note
export const updateNote = async (
  id: string,
  note: {
    title: string;
    content: string;
    categories: string[];
  },
) => {
  const response = await axios.put(`${API_BASE_URL}/notes/${id}`, note);
  return response.data;
};

// Delete a note
export const deleteNote = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/notes/${id}`);
};

// Toggle pin status
export const togglePin = async (id: string) => {
  const response = await axios.patch(`${API_BASE_URL}/notes/${id}/pin`, {});
  return response.data;
};

// Fetch all categories
export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
