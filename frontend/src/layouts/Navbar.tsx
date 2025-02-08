import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { TbMenu2, TbSortDescending2, TbCategory2 } from 'react-icons/tb';
import { SiGoogletasks } from 'react-icons/si';
import { IoMdClose } from 'react-icons/io';
import { getInitials } from '../utils/helper';
import SearchBar from '../components/ui/SearchBar';
import { handleLogout } from '../utils/api';
import axios from 'axios';
import { GrPowerReset } from 'react-icons/gr';

interface NavbarProps {
  value: string;
  onChange: (searchValue: string) => void;
  onCategoryChange: (categories: string[]) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  value,
  onChange,
  onCategoryChange,
  onSortChange,
  isNavOpen,
  setIsNavOpen,
}) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null,
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'All',
  ]);
  const [selectedSort, setSelectedSort] = useState<{
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }>({
    sortBy: 'modified_at',
    sortOrder: 'desc',
  });

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
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            withCredentials: true,
          },
        );
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleCategoryCheckboxChange = (category: string) => {
    let updatedCategories;
    if (category === 'All') {
      updatedCategories = ['All'];
    } else {
      updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category && c !== 'All')
        : [...selectedCategories.filter((c) => c !== 'All'), category];
    }
    setSelectedCategories(updatedCategories);
  };

  const handleSortRadioChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setSelectedSort({ sortBy, sortOrder });
  };

  const handleApplyFilters = () => {
    // If "All" is selected, pass an empty array to fetch all categories
    const categoriesToSend = selectedCategories.includes('All')
      ? []
      : selectedCategories;
    onCategoryChange(categoriesToSend);
    onSortChange(selectedSort.sortBy, selectedSort.sortOrder);
    setIsNavOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategories(['All']);
    setSelectedSort({ sortBy: 'modified_at', sortOrder: 'desc' });
    onCategoryChange([]);
    onSortChange('modified_at', 'desc');
    setIsNavOpen(false);
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
            <div className="flex w-full min-w-96">
              <SearchBar
                value={value}
                onChange={onChange}
                setNavOpen={setIsNavOpen}
              />
            </div>
            <button
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
          className={`fixed right-4 top-[5.5rem] h-fit w-80 rounded-2xl border bg-white p-3 transition-all duration-700 ease-in-out ${
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

            <SearchBar
              value={value}
              onChange={onChange}
              setNavOpen={setIsNavOpen}
            />
            <hr />

            <div className="p-2">
              <h3 className="text-sm text-dark">
                Select Category
                <TbCategory2 className="ml-1 inline-block text-base" />
              </h3>
              <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0 text-dark">
                {['All', 'Work', 'Personal', 'Study'].map((category) => (
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
                      className="select-none text-sm"
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
                onClick={handleApplyFilters}
                className="transition-200 w-full rounded-md border-2 border-amber-400 bg-amber-400 py-2 text-sm font-medium text-dark hover:bg-amber-100 hover:text-amber-500"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="transition-200 w-full flex-1 rounded-md border-2 border-amber-300 bg-amber-100 px-3 py-2 text-sm font-medium text-dark hover:bg-amber-200 hover:text-dark"
              >
                <GrPowerReset className="inline-block text-base" />
                {/* Reset Filters */}
              </button>
            </div>

            <hr />

            <div className="user-profile flex items-center gap-4 p-2">
              <Link to="/profile" className="flex items-center gap-2 text-dark">
                <span className="transition-300 flex size-14 scale-[0.95] items-center justify-center rounded-full border border-amber-500 bg-amber-100 p-2 text-xl font-bold text-amber-500 outline outline-1 outline-offset-2 outline-amber-500/40 group-hover:scale-100">
                  {getInitials(user?.username || 'Guest')}
                </span>
              </Link>
              <div className="text-dark">
                <h3 className="text-base capitalize">
                  {user?.username || 'Guest'}
                </h3>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="transition-300 text-base font-medium text-amber-400 hover:text-amber-400 hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
