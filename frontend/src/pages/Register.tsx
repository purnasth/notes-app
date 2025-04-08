import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import PasswordToggle from '../components/PasswordToggle';
import useFormValidation from '../hooks/useFormValidation';
import { registerSchema } from '../utils/validationSchemas';
import * as yup from 'yup';
import { registerUser, sendOTP } from '../utils/api';
import { useState } from 'react';

type RegisterFormData = yup.InferType<typeof registerSchema>;

const formFields = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'eg. purna_shrestha',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email address',
    placeholder: 'eg. you@example.com',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    component: PasswordToggle,
  },
];

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation(registerSchema);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading('Sending OTP...');

    try {
      const response = await registerUser(
        data.username,
        data.email,
        data.password,
      );
      // toast.success(response.message);
      await sendOTP(data.email);
      toast.update(toastId, {
        render: response.message,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error;
      if (errorMessage.includes('already exists')) {
        toast.update(toastId, {
          render: errorMessage,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        toast.update(toastId, {
          render: 'Registration failed. Please check your information',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-full min-h-screen items-center justify-center">
      <div className="container max-w-md space-y-8">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {formFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className={`block text-base font-normal ${
                  errors[field.name as keyof RegisterFormData]
                    ? 'text-red-500'
                    : 'text-dark'
                }`}
              >
                {errors[field.name as keyof RegisterFormData]
                  ? errors[field.name as keyof RegisterFormData]?.message
                  : field.label}
              </label>
              <div className="mt-2">
                {field.component ? (
                  <field.component register={register} />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    {...register(field.name as keyof RegisterFormData)}
                    placeholder={field.placeholder}
                    className={`block w-full rounded-md bg-transparent px-4 py-2.5 text-base font-normal text-dark outline outline-1 -outline-offset-1 outline-amber-500/50 placeholder:font-light placeholder:text-dark/40 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-400 sm:text-lg`}
                  />
                )}
              </div>
            </div>
          ))}

          <div>
            <button
              type="submit"
              aria-label="Sign Up"
              disabled={isLoading}
              className={`transition-300 flex w-full justify-center rounded-md ${
                isLoading ? 'bg-amber-300' : 'bg-amber-400'
              } px-4 py-2.5 text-base font-normal uppercase text-dark shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 md:text-lg`}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}{' '}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-base text-dark/80">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-amber-500 underline hover:text-amber-600"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
