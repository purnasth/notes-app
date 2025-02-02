import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import PasswordToggle from '../components/PasswordToggle';
import useFormValidation from '../hooks/useFormValidation';
import { loginSchema } from '../utils/validationSchemas';
import * as yup from 'yup';

// Define the form data type
type LoginFormData = yup.InferType<typeof loginSchema>;

// Define form fields
const formFields = [
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
    component: PasswordToggle, // Custom component for password field
  },
];

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useFormValidation(loginSchema);

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log('Form Data:', data);
    toast.success('Login successful!');
  };

  return (
    <>
      <main className="flex h-screen items-center justify-center">
        <div className="container max-w-md space-y-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className={`block text-base font-normal ${
                    errors[field.name as keyof LoginFormData]
                      ? 'text-red-500'
                      : 'text-dark'
                  }`}
                >
                  {errors[field.name as keyof LoginFormData]
                    ? errors[field.name as keyof LoginFormData]?.message
                    : field.label}
                </label>
                <div className="mt-2">
                  {field.component ? (
                    <field.component register={register} />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      {...register(field.name as keyof LoginFormData)}
                      placeholder={field.placeholder}
                      className={`block w-full rounded-md bg-transparent px-4 py-2.5 text-base font-normal text-dark outline outline-1 -outline-offset-1 outline-amber-500/50 placeholder:font-light placeholder:text-dark/40 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-400 sm:text-lg`}
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  {...register('remember')}
                  className="mr-2 accent-amber-400"
                  defaultChecked
                />
                <label
                  htmlFor="remember"
                  className="select-none text-base text-dark/60"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="text-base text-amber-500 underline hover:text-amber-600 hover:no-underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="transition-300 flex w-full justify-center rounded-md bg-amber-400 px-4 py-2.5 text-base font-normal uppercase text-dark shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 md:text-lg"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-base text-dark/80">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-amber-500 underline hover:text-amber-600"
            >
              Register here
            </Link>
          </p>
        </div>
      </main>

      {/* <ToastContainer /> */}
    </>
  );
};

export default Login;