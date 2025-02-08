// ? This searchbar is for searching notes based on user input.
// import { IoSearch } from 'react-icons/io5';
// import { SearchBarProps } from '../../interfaces/types';

// const SearchBar = ({ value, onChange }: SearchBarProps) => {
//   return (
//     <>
//       {/* <form  className="w-full max-w-3xl"> */}
//       <div className="w-full max-w-3xl">
//         <label
//           className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           htmlFor="default-search"
//         >
//           Search
//         </label>
//         <div className="relative">
//           <input
//             placeholder="Search your notes"
//             className="w-full rounded-full border-2 border-amber-300 bg-amber-50 py-3 pl-14 pr-4 placeholder:text-base placeholder:font-light placeholder:text-dark focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-amber-400"
//             id="default-search"
//             type="search"
//             value={value}
//             onChange={onChange}
//           />
//           {/* <button className="transition-300 absolute bottom-1/2 left-1.5 translate-y-1/2 rounded-full border border-amber-400 bg-amber-400 p-3 text-sm font-medium text-dark hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300">
//             <IoSearch className="size-4 text-dark" />
//           </button> */}
//           <span className="transition-300 absolute bottom-1/2 left-1.5 translate-y-1/2 rounded-full border border-amber-400 bg-amber-400 p-3 text-sm font-medium text-dark hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300">
//             <IoSearch className="size-4 text-dark" />
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SearchBar;

// ? This searchbar is for searching notes based on user input and submit search query.
import { IoSearch } from 'react-icons/io5';
import { SearchBarProps } from '../../interfaces/types';
import { useState } from 'react';

const SearchBar = ({ value, onChange, setNavOpen }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChange(searchValue);
    setNavOpen(false);
  };

  return (
    <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
      <label
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="default-search"
      >
        Search
      </label>
      <div className="relative">
        <input
          placeholder="Search your notes"
          className="w-full rounded-full border-2 border-amber-300 bg-amber-50 py-3 pl-14 pr-4 placeholder:text-base placeholder:font-light placeholder:text-dark focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-amber-400"
          id="default-search"
          type="search"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="transition-300 absolute bottom-1/2 left-1.5 translate-y-1/2 rounded-full border border-amber-400 bg-amber-400 p-3 text-sm font-medium text-dark hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300"
        >
          <IoSearch className="size-4 text-dark" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
