import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

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

export const logoutUser = async () => {
  const response = await axios.post(`${API_BASE_URL}/logout`);
  return response.data;
};
