import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await axios.post(`${API_BASE_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (
  email: string,
  password: string,
  rememberMe: boolean,
) => {
  const response = await axios.post(
    `${API_BASE_URL}/login`,
    {
      email,
      password,
      rememberMe,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );
  return response.data;
};

export const handleLogout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem('token');
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
  }
};
