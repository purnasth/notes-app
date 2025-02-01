import { Link } from 'react-router-dom';
import PasswordToggle from '../components/PasswordToggle';

const Register = () => {
  return (
    <>
      <main className="flex h-screen items-center justify-center bg-white">
        <div className="container max-w-md space-y-8">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-base font-medium text-dark"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md bg-transparent px-4 py-2.5 text-base font-normal text-dark outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-400 sm:text-lg"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-dark"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-transparent px-4 py-2.5 text-base font-normal text-dark outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-400 sm:text-lg"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-dark"
              >
                Password
              </label>
              <div className="mt-2">
                <PasswordToggle />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="transition-300 flex w-full justify-center rounded-md bg-amber-400 px-4 py-2.5 text-base font-normal uppercase text-dark shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 md:text-lg"
              >
                Sign Up
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
    </>
  );
};

export default Register;
