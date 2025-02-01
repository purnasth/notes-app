import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TbMenu2 } from 'react-icons/tb';
import { SiGoogletasks } from 'react-icons/si';

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
    document.body.style.overflow = 'auto';
  }, [location]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const closeNav = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };
  return (
    <>
      <nav
        className={`fixed top-0 z-40 w-full bg-amber-50 p-4 font-serif transition-all duration-[1s] ${visible ? '' : '-translate-y-full'}`}
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
            <Link
              to="/login"
              className="transition-300 rounded-full border border-amber-400 bg-amber-50 px-6 py-2 font-medium text-amber-500 hover:bg-amber-400 hover:text-dark"
            >
              Login
            </Link>
            <div className="flex h-10 items-center gap-4 rounded-full border border-amber-400 bg-amber-300 py-1 pl-5 pr-2">
              <button
                className="inline-flex items-center justify-center gap-2 font-medium"
                onClick={toggleNav}
              >
                <TbMenu2 className="scale-150 text-base" />
              </button>

              <div className="user-profile">
                <img
                  src="https://www.purnashrestha.com.np/assets/hero-DDSQy-9a.avif"
                  alt="profile"
                  className="size-8 rounded-full border object-cover shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative">
        <div
          className={`transition-700 fixed inset-0 z-50 bg-black/30 backdrop-blur-sm ${
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={closeNav}
        />

        <div
          className={`fixed left-0 top-0 h-full w-64 bg-amber-50 text-amber-500 transition-all duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } z-50`}
        >
          <div className="p-2">
            <button
              onClick={closeNav}
              className="absolute right-4 top-4 text-4xl text-amber-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="mt-16 space-y-2">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
