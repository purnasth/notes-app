import { Link } from 'react-router-dom';
import { TbBrandGithub } from 'react-icons/tb';
import { RiPenNibLine } from 'react-icons/ri';

import { IoBulbOutline } from 'react-icons/io5';

import human1 from '../assets/svg/human-1.svg';
import human2 from '../assets/svg/human-2.svg';
import Header from '../layouts/Header';

const About = () => {
  return (
    <>
      <Header page="about" />
      <main className="my-16 flex h-full flex-col items-center justify-center lg:my-0 lg:h-screen">
        <div className="relative mx-auto max-w-3xl 2xl:max-w-5xl">
          <div className="pointer-events-none absolute inset-0 -z-10 flex select-none items-start justify-start">
            <RiPenNibLine className="-z-10 text-6xl text-amber-400" />
            <RiPenNibLine className="absolute inset-0 -z-20 origin-center scale-150 animate-pulse text-6xl text-amber-400 opacity-10 blur-md" />
          </div>
          <div className="pointer-events-auto absolute inset-0 top-2/3 -z-20 flex -translate-x-8 -translate-y-1/2 select-none items-end justify-end md:top-1/3">
            <IoBulbOutline className="-z-10 text-6xl text-amber-400" />
            <IoBulbOutline className="absolute inset-0 -z-20 origin-center scale-150 animate-pulse text-6xl text-amber-400 blur-md" />
            <IoBulbOutline className="absolute bottom-0 -z-20 origin-center scale-150 animate-pulse text-6xl text-amber-400 blur-lg" />
            <IoBulbOutline className="absolute bottom-0 -z-20 origin-center scale-150 animate-pulse text-6xl text-amber-400 blur-lg" />
          </div>
          <div className="z-10 space-y-8 text-center">
            <span className="rounded-full border-2 border-amber-400 px-3 py-1 text-sm font-medium uppercase text-amber-500">
              Notes App
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-dark md:text-5xl md:leading-snug xl:text-6xl xl:leading-snug 2xl:text-7xl 2xl:leading-snug">
              Write down your Every Task, Note, and Ideas as They Come to You
            </h1>
            <p className="mx-auto w-full px-4 text-base md:w-4/5 md:text-base">
              Notes App is a simple note-taking app that allows you to jot down
              your thoughts and notes as they come to you. It's a great way to
              keep track of your ideas, to-do lists, and anything else you need
              to remember.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Link
                to="/"
                className="transition-300 relative mt-4 inline-block rounded-full border-4 border-amber-400 bg-amber-400 px-6 py-2 font-semibold text-dark hover:bg-amber-50 hover:text-dark"
              >
                Try Notes, it's FREE!
              </Link>
              <span className="text-xs">
                or Build your own. Source code{' '}
                <Link
                  to="https://github.com/purnasth/notes-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-200 inline-flex items-center justify-center gap-1 rounded-full border border-dark bg-[#333] px-1 text-white hover:bg-white hover:text-[#333]"
                >
                  GitHub
                  <TbBrandGithub />
                </Link>
              </span>
            </div>
          </div>
        </div>

        <img
          src={human1}
          alt="Add Task"
          className="absolute bottom-0 left-0 -z-20 hidden h-24 w-auto object-contain mix-blend-darken md:block md:h-64 lg:h-[60vh]"
          draggable="false"
        />
        <img
          src={human2}
          alt="Add Task"
          className="absolute bottom-0 right-0 -z-20 hidden h-24 w-auto object-contain mix-blend-darken md:block md:h-64 lg:h-[60vh]"
          draggable="false"
        />
      </main>
    </>
  );
};

export default About;
