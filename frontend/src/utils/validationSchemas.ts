import * as yup from 'yup';

// Login form schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required*'),
  password: yup.string().required('Password is required*'),
  remember: yup.boolean(),
});

// Register form schema
export const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required*'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required*'),
  password: yup.string().required('Password is required*'),
});