import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { SearchBarProps } from '../../interfaces/types';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, setNavOpen }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(value);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setShowSuggestions(true); // Show suggestions while typing
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchValue.trim()) return;

    onChange(searchValue);
    setNavOpen(false);

    const updatedSearches = [
      searchValue,
      ...recentSearches.filter((search) => search !== searchValue),
    ].slice(0, 10);

    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (recentSearches.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    onChange(suggestion);
    setNavOpen(false);
    setShowSuggestions(false);
  };

  return (
    <form className="relative w-full max-w-3xl" onSubmit={handleSubmit}>
      <label
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="search-input"
      >
        Search
      </label>
      <div className="relative">
        <input
          placeholder="Search your notes"
          className="w-full rounded-full border-2 border-amber-300 bg-amber-50 py-3 pl-14 pr-4 placeholder:text-base placeholder:font-light placeholder:text-dark focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-amber-400"
          id="search-input"
          type="search"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          aria-label="Search"
          className="transition-300 absolute bottom-1/2 left-[5px] translate-y-1/2 rounded-full border border-amber-400 bg-amber-400 p-3 text-sm font-medium text-dark hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300"
        >
          <IoSearch className="size-4 text-dark" />
        </button>

        {showSuggestions && recentSearches.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-20 mt-1 flex max-h-64 flex-wrap items-center gap-2 overflow-y-auto rounded-3xl border bg-white p-3 shadow-sm">
            {recentSearches.map((search) => (
              <button
                key={search}
                type="button"
                className="transition-200 flex cursor-pointer items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                onClick={() => handleSuggestionClick(search)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    handleSuggestionClick(search);
                  }
                }}
              >
                {search}
                <button
                  type="button"
                  aria-label={`Remove ${search} from recent searches`}
                  className="flex aspect-square size-4 items-center justify-center rounded-full border border-dark/20 bg-amber-400 text-xs text-black"
                  onClick={() => {
                    const updatedSearches = recentSearches.filter(
                      (s) => s !== search,
                    );
                    setRecentSearches(updatedSearches);
                    localStorage.setItem(
                      'recentSearches',
                      JSON.stringify(updatedSearches),
                    );
                  }}
                >
                  {/* &#x2715; */}
                  <IoMdClose />
                </button>
              </button>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
