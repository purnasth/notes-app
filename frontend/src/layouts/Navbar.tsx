import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TbMenu2, TbSortDescending2, TbCategory2 } from 'react-icons/tb';
import { SiGoogletasks } from 'react-icons/si';
import { IoMdClose } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close nav on route change
  useEffect(() => {
    setIsOpen(false);
    // document.body.style.overflow = 'auto';
  }, [location]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    // document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-40 w-full bg-amber-50 p-4 transition-all duration-[1s] ${visible ? '' : '-translate-y-full'}`}
      >
        <div className={`flex items-center justify-between`}>
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-dark"
          >
            <SiGoogletasks className="text-2xl text-amber-500" />
            Notes App
          </a>

          <div className="flex items-center justify-end gap-2">
            {/* <Link
              to="/login"
              className="transition-300 rounded-full border border-amber-400 bg-amber-50 px-6 py-2 font-medium text-amber-500 hover:bg-amber-400 hover:text-dark"
            >
              Login
            </Link> */}
            <div className="relative max-w-3xl">
              <IoSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-dark" />
              <input
                type="text"
                placeholder="Search your notes .."
                className="w-96 rounded-full bg-transparent py-4 pl-12 pr-4 text-base font-normal text-dark outline outline-2 -outline-offset-[6px] outline-amber-400 placeholder:text-base placeholder:font-light placeholder:text-dark focus:outline focus:outline-2 focus:-outline-offset-4 focus:outline-amber-400"
              />
            </div>

            <button
              className="group flex h-12 items-center gap-4 rounded-full border border-amber-400 bg-amber-400 py-1 pl-5 pr-1.5"
              onClick={toggleNav}
            >
              {isOpen ? (
                <IoMdClose className="scale-150 text-base" />
              ) : (
                <TbMenu2 className="scale-150 text-base" />
              )}

              <div className="user-profile rounded-full border border-dark/40">
                <img
                  src="https://www.purnashrestha.com.np/assets/hero-DDSQy-9a.avif"
                  alt="profile"
                  className="transition-300 size-10 scale-[0.95] rounded-full object-cover shadow group-hover:scale-100"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className={`relative`}>
        <div
          className={`transition-700 fixed inset-0 z-30 ${
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={toggleNav}
        />

        <div
          className={`fixed right-4 top-[5.5rem] h-fit w-80 rounded-2xl border bg-white p-3 transition-all duration-700 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-[125%]'
          } ${visible ? 'opacity-100' : '-translate-y-[150%]'} z-30`}
        >
          <div className="space-y-4">
            {/* <div className="relative max-w-3xl">
              <IoSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-dark" />
              <input
                type="text"
                placeholder="Search your notes .."
                className="w-full rounded-full bg-transparent py-4 pl-12 pr-4 text-base font-normal text-dark outline outline-2 -outline-offset-[6px] outline-amber-400 placeholder:text-base placeholder:font-light placeholder:text-dark focus:outline focus:outline-2 focus:-outline-offset-4 focus:outline-amber-400"
              />
            </div> */}

            <ul className="space-y-2">
              <li className="group">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `navlink ${isActive && 'bg-amber-400'}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="group">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `navlink ${isActive && 'bg-amber-400'}`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>

            <hr />

            <div className="p-2">
              <h3 className="text-sm text-dark">
                Select Category
                <TbCategory2 className="ml-1 inline-block text-base" />
              </h3>
              <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0 text-dark">
                <li className="group flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="category-all"
                    className="accent-amber-400"
                  />
                  <label htmlFor="category-all" className="select-none text-sm">
                    All
                  </label>
                </li>
                <li className="group flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="category-work"
                    className="accent-amber-400"
                  />
                  <label
                    htmlFor="category-work"
                    className="select-none text-sm"
                  >
                    Work
                  </label>
                </li>
                <li className="group flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="category-personal"
                    className="accent-amber-400"
                  />
                  <label
                    htmlFor="category-personal"
                    className="select-none text-sm"
                  >
                    Personal
                  </label>
                </li>
                <li className="group flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="category-study"
                    className="accent-amber-400"
                  />
                  <label
                    htmlFor="category-study"
                    className="select-none text-sm"
                  >
                    Study
                  </label>
                </li>
              </ul>
            </div>

            <hr />

            <div className="p-2">
              <h3 className="text-sm text-dark">
                Sort By
                <TbSortDescending2 className="ml-2 inline-block text-base" />
              </h3>
              <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0 text-dark">
                <li className="group flex items-center gap-1">
                  <input
                    type="radio"
                    id="sort-alphabet"
                    name="sort"
                    className="accent-amber-400"
                  />
                  <label
                    htmlFor="sort-alphabet"
                    className="select-none text-sm"
                  >
                    Alphabetical Order
                  </label>
                </li>
                <li className="group flex items-center gap-1">
                  <input
                    type="radio"
                    id="sort-created"
                    name="sort"
                    className="accent-amber-400"
                  />
                  <label htmlFor="sort-created" className="select-none text-sm">
                    Creation Date
                  </label>
                </li>
                <li className="group flex items-center gap-1">
                  <input
                    type="radio"
                    id="sort-modified"
                    name="sort"
                    className="accent-amber-400"
                  />
                  <label
                    htmlFor="sort-modified"
                    className="select-none text-sm"
                  >
                    Modified Date
                  </label>
                </li>
              </ul>
            </div>

            <hr />

            <div className="user-profile flex items-center gap-4 p-2">
              <img
                src="https://www.purnashrestha.com.np/assets/hero-DDSQy-9a.avif"
                alt="profile"
                className="size-14 rounded-full border object-cover shadow"
              />
              <div className="text-dark">
                <h3 className="text-base">Purna Shrestha</h3>
                <button
                  type="button"
                  className="transition-300 text-base font-medium text-amber-400 hover:text-amber-400 hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* <Link to="/login" className="navlink inline-block bg-amber-400 hover:bg-amber-50 border-2 hover:text-amber-500 uppercase border-amber-400">
              Login
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
