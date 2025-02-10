import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { TbHome } from 'react-icons/tb';

interface HeaderProps {
  page: string;
}

const Header = ({ page }: HeaderProps) => {
  // const location = useLocation();
  // const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <>
      <nav
        className={`fixed top-0 z-40 w-full bg-amber-50 p-4 transition-all duration-[0.85s]`}
      >
        <div className={`flex items-center justify-between`}>
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-dark md:text-2xl"
          >
            <img src={logo} alt="Logo" className="size-10 object-contain" />
            Notes App
          </a>

          <ul className="group flex h-12 items-center gap-2 rounded-full border border-amber-400 bg-amber-400 py-1 pl-1 pr-5 text-dark">
            <li className="rounded-full border border-amber-100">
              <Link
                to="/"
                aria-label="Home"
                className="transition-300 flex size-10 scale-[0.95] items-center justify-center rounded-full border border-amber-100 bg-amber-100 p-2 text-xl font-bold text-amber-500 shadow group-hover:scale-100"
              >
                <TbHome className="scale-150 text-base" />
              </Link>
            </li>
            <li aria-current="page" aria-label={page}>
              <span className="font-semibold capitalize">{page}</span>
            </li>
          </ul>

          {/* <ul className="flex h-12 items-center gap-2 rounded-full bg-red-600 px-6">
            <li>
              <Link to="/" className={`bg-amber-500`}>
                Home
              </Link>
            </li>
            <li aria-current="page">
              <span className="">{page}</span>
            </li>
          </ul> */}
        </div>
      </nav>
    </>
  );
};

export default Header;
