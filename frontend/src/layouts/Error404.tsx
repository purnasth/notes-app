import React from 'react';
import error from '../assets/error.svg';

interface Error404Props {
  message?: string;
}

const Error404: React.FC<Error404Props> = ({ message }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img
        src={error}
        alt="Error 404"
        className="mb-5 mt-8 w-96 max-w-md select-none md:w-1/2"
        draggable="false"
      />
      {/* <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p> */}
      <p className="mx-auto max-w-xl text-center text-base">
        {message || 'Go Home'}
      </p>
    </div>
  );
};

export default Error404;
