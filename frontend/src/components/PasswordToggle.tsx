import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface PasswordToggleProps {
  register: any; // Register function from react-hook-form
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({ register }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative">
      <input
        type={isShowPassword ? 'text' : 'password'}
        id="password"
        name="password"
        {...register('password')}
        placeholder={'eg. #dk8bPjX5PW#4'}
        autoComplete="new-password"
        className="block w-full rounded-md bg-transparent px-4 py-2.5 text-base font-normal text-dark outline outline-1 -outline-offset-1 outline-amber-500/50 placeholder:font-light placeholder:text-dark/40 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-400 sm:text-lg"
      />

      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute inset-y-0 right-0 flex items-center px-4"
      >
        {isShowPassword ? (
          <FaRegEye
            className="cursor-pointer text-xl text-amber-400"
            onClick={toggleShowPassword}
          />
        ) : (
          <FaRegEyeSlash
            className="cursor-pointer text-xl text-dark/40"
            onClick={toggleShowPassword}
          />
        )}
      </button>
    </div>
  );
};

export default PasswordToggle;
