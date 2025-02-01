import { Link } from 'react-router-dom';
import PasswordToggle from '../components/PasswordToggle';

const Login = () => {
  return (
    <>
      <main className="flex h-screen items-center justify-center">
        <div className="container max-w-md space-y-8">
          {/* <h2 className="text-center text-2xl font-bold tracking-tight text-dark">
            Login to your account
          </h2> */}
          <form className="space-y-6" action="#" method="POST">
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
                  placeholder="eg. you@example.com"
                  className="block w-full rounded-md bg-transparent px-4 py-2.5 text-base font-normal text-dark outline outline-1 -outline-offset-1 outline-amber-500/50 placeholder:font-light placeholder:text-dark/40 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-400 sm:text-lg"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-dark"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <PasswordToggle />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="remember"
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
    </>
  );
};

export default Login;
