import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { TbMenu2, TbSortDescending2, TbCategory2 } from 'react-icons/tb';
import logo from '../assets/logo.svg';
import { IoMdClose } from 'react-icons/io';
import { getInitials } from '../utils/helper';
import SearchBar from '../components/ui/SearchBar';
import { handleLogout } from '../utils/api';
import { GrPowerReset } from 'react-icons/gr';
import ConfirmModal from '../components/ui/ConfirmModal';
import { TbUserSquareRounded , TbLogout} from 'react-icons/tb';

interface NavbarProps {
  value: string;
  onChange: (searchValue: string) => void;
  onCategoryChange: (categories: string[]) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
  user: { username: string; email: string } | null;
}

const Navbar: React.FC<NavbarProps> = ({
  value,
  onChange,
  onCategoryChange,
  onSortChange,
  isNavOpen,
  setIsNavOpen,
  user,
}) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'all',
  ]);
  const [selectedSort, setSelectedSort] = useState<{
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }>({
    sortBy: 'modified_at',
    sortOrder: 'desc',
  });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isNavOpen ? 'hidden' : 'auto';
  }, [isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleCategoryCheckboxChange = (category: string) => {
    let updatedCategories;
    if (category === 'all') {
      updatedCategories = ['all'];
    } else {
      updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== 'all'), category];
    }
    setSelectedCategories(updatedCategories);
  };

  const handleSortRadioChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setSelectedSort({ sortBy, sortOrder });
  };

  const handleApplyFilters = () => {
    // If "all" is selected, pass an empty array to fetch all categories
    const categoriesToSend = selectedCategories.includes('all')
      ? []
      : selectedCategories;
    onCategoryChange(categoriesToSend);
    onSortChange(selectedSort.sortBy, selectedSort.sortOrder);
    setIsNavOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategories(['all']);
    setSelectedSort({ sortBy: 'modified_at', sortOrder: 'desc' });
    onCategoryChange([]);
    onSortChange('modified_at', 'desc');
    setIsNavOpen(false);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setIsLogoutModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-40 w-full bg-amber-50 p-4 transition-all duration-[0.85s] ${visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
      >
        <div className={`flex items-center justify-between`}>
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-dark md:text-2xl"
          >
            <img src={logo} alt="Logo" className="size-10 object-contain" />
            Notes App
          </a>

          <div className="flex items-center justify-end gap-2">
            <div className={`hidden w-full min-w-96 md:flex`}>
              <SearchBar
                value={value}
                onChange={onChange}
                setNavOpen={setIsNavOpen}
              />
            </div>
            <button
              type="button"
              aria-label="Toggle Navigation"
              className="group flex h-12 items-center gap-4 rounded-full border border-amber-400 bg-amber-400 py-1 pl-5 pr-1.5 text-dark"
              onClick={toggleNav}
            >
              {isNavOpen ? (
                <IoMdClose className="scale-150 text-base" />
              ) : (
                <TbMenu2 className="scale-150 text-base" />
              )}

              <div className="user-profile rounded-full border border-amber-100">
                <span className="transition-300 flex size-10 scale-[0.95] items-center justify-center rounded-full border border-amber-100 bg-amber-100 p-2 text-xl font-bold text-amber-500 shadow group-hover:scale-100">
                  {getInitials(user?.username || 'Guest')}
                </span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className={`relative`}>
        <div
          className={`transition-700 fixed inset-0 z-30 backdrop-blur ${
            isNavOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={toggleNav}
        />

        <div
          className={`fixed right-4 top-[5.5rem] h-fit w-[calc(100%-2rem)] rounded-2xl border bg-white p-3 transition-all duration-700 ease-in-out md:w-80 ${
            isNavOpen ? 'translate-x-0' : 'translate-x-[125%]'
          } ${visible ? 'opacity-100' : '-translate-y-[150%]'} z-30`}
        >
          <div className="space-y-4">
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

            <div className="w-full md:hidden">
              <SearchBar
                value={value}
                onChange={onChange}
                setNavOpen={setIsNavOpen}
              />
            </div>
            <hr />

            <div className="p-2">
              <h3 className="text-sm text-dark">
                Select Category
                <TbCategory2 className="ml-1 inline-block text-base" />
              </h3>
              <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0 text-dark">
                {[
                  'all',
                  'work',
                  'personal',
                  'study',
                  'reminder',
                  'ideas',
                  'other',
                ].map((category) => (
                  <li key={category} className="group flex items-center gap-1">
                    <input
                      type="checkbox"
                      id={`category-${category.toLowerCase()}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryCheckboxChange(category)}
                      className="accent-amber-400"
                    />
                    <label
                      htmlFor={`category-${category.toLowerCase()}`}
                      className="select-none text-sm capitalize"
                    >
                      {category}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <hr />

            <div className="p-2">
              <h3 className="text-sm text-dark">
                Sort By
                <TbSortDescending2 className="ml-2 inline-block text-base" />
              </h3>
              <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0 text-dark">
                {[
                  {
                    id: 'sort-alphabet',
                    label: 'Alphabetical Order',
                    value: 'title',
                  },
                  {
                    id: 'sort-created',
                    label: 'Creation Date',
                    value: 'created_at',
                  },
                  {
                    id: 'sort-modified',
                    label: 'Modified Date',
                    value: 'modified_at',
                  },
                ].map((sort) => (
                  <li key={sort.id} className="group flex items-center gap-1">
                    <input
                      type="radio"
                      id={sort.id}
                      name="sort"
                      checked={selectedSort.sortBy === sort.value}
                      onChange={() => handleSortRadioChange(sort.value, 'asc')}
                      className="accent-amber-400"
                    />
                    <label htmlFor={sort.id} className="select-none text-sm">
                      {sort.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Apply Filters"
                onClick={handleApplyFilters}
                className="transition-200 w-full rounded-md border border-amber-400 bg-amber-100 py-3 text-sm font-medium text-dark hover:bg-amber-200 hover:text-dark"
              >
                Apply Filters
              </button>
              <button
                type="button"
                aria-label="Reset Filters"
                onClick={handleResetFilters}
                className="transition-200 w-full flex-1 rounded-md border border-amber-400 bg-amber-100 px-4 py-3 text-sm font-medium text-dark hover:bg-amber-200 hover:text-dark"
              >
                <GrPowerReset className="inline-block text-base" />
                {/* Reset Filters */}
              </button>
            </div>

            <hr />

            <div className="user-profile flex items-center gap-3 rounded-xl border bg-amber-100 p-2">
              <Link to="/profile" className="flex items-center gap-2 text-dark">
                <span className="transition-300 flex size-16 scale-[0.85] items-center justify-center rounded-full border border-amber-500 bg-amber-400 p-2 text-2xl font-bold text-dark/80 outline outline-1 outline-offset-4 outline-amber-500 group-hover:scale-100">
                  {getInitials(user?.username || 'Guest')}
                </span>
              </Link>
              <div className="space-y-1 text-dark">
                <h3 className="text-base capitalize">
                  {user?.username || 'Guest'}
                </h3>
                <div className="flex items-center gap-2">
                  <Link
                    to="/profile"
                    aria-label="Profile"
                    className="transition-200 flex items-center gap-1 rounded-full border border-blue-400 bg-blue-100 p-0.5 px-1.5 text-xs font-medium text-blue-600 hover:bg-blue-500 hover:text-white"
                  >
                    <TbUserSquareRounded className="text-base" />
                    Profile
                  </Link>
                  <button
                    type="button"
                    aria-label="Logout"
                    onClick={handleLogoutClick}
                    className="transition-200 flex items-center gap-1 rounded-full border border-red-400 bg-red-100 p-0.5 px-1.5 text-xs font-medium text-red-600 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                    <TbLogout className="text-base" />
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="relative flex items-center overflow-hidden rounded-xl p-2">
              <div className="absolute bottom-0 left-0 right-0 -z-20 h-2/3 bg-amber-300"></div>
              <Link
                to="/profile"
                aria-label="Profile"
                className="transition-200 flex -translate-y-4 items-center gap-1 rounded-full border border-blue-400 bg-blue-100 p-0.5 px-1.5 text-xs font-medium text-blue-600 hover:bg-blue-500 hover:text-white"
              >
                <TbUserSquareRounded className="text-xl" />
                Profile
              </Link>
              <div className="mx-auto mb-2 space-y-2 text-center">
                <Link
                  to="/profile"
                  className="flex items-center justify-center gap-2 text-dark"
                >
                  <span className="transition-300 flex size-14 scale-[0.95] items-center justify-center rounded-full border border-amber-500 bg-amber-100 p-2 text-xl font-bold text-amber-500 outline outline-1 outline-offset-2 outline-amber-500/40 group-hover:scale-100">
                    {getInitials(user?.username || 'Guest')}
                  </span>
                </Link>
                <h3 className="text-base capitalize">
                  {user?.username || 'Guest'}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Logout"
                onClick={handleLogoutClick}
                className="transition-200 flex -translate-y-4 items-center gap-1 rounded-full border border-red-400 bg-red-100 p-0.5 px-1.5 text-xs font-medium text-red-600 hover:bg-red-500 hover:text-white"
              >
                Logout
                <TbUserSquareRounded className="text-xl" />
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        message="Do you really want to logout? This will log you out of the application."
      />
    </>
  );
};

export default Navbar;
