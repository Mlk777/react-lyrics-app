import React from 'react';

const Navbar = () => {
  return (
    <header className='mb-8 md:mb-12 bg-gray-100'>
      <nav className='p-4'>
        <ul className='flex justify-center'>
          <li className='text-4xl md:text-5xl lg:text-6xl tracking-widest text-gray-900 font-bold'>
            <i className='fas fa-music fa-lg'></i> MYLyrics Finder
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
