import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <>
      <main className="relative z-auto h-screen w-full">
        <div className="container flex size-full max-w-3xl flex-col items-center justify-center gap-4 text-center">
          <Link to="https://www.purnashrestha.com.np/" target="_blank">
            <img
              src="https://www.purnashrestha.com.np/assets/hero_noise-1rKfdf1M.png"
              alt="Purna Shrestha"
              className="size-52 object-cover rounded-full"
            />
          </Link>

          <h1 className="mt-4 font-title text-5xl capitalize leading-snug">
            Welcome to Notes App
          </h1>

          <p className="max-w-3xl font-body">
            This is a simple notes app that allows you to create, read, update,
            and delete notes. You can also search for notes by title or content
            and more categories can be added along with the filtering feature.
            The account is authenticated on the client side using JWT and the
            notes are stored in the local storage.
          </p>
        </div>
      </main>
    </>
  );
};

export default Intro;
