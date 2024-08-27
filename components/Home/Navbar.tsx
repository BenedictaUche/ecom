import React, { useState } from 'react';
import { Search, UserRound, ShoppingBasket, AlignJustify } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="flex justify-between items-center px-6 py-4 md:px-10">
        {/* Left Icons */}
        <div className="flex items-center space-x-6">
          <Search className="text-xl cursor-pointer" />
        </div>

        {/* Logo */}
        <h1 className=" text-[59px] text-center tracking-[.25em]">
          happy kids
        </h1>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <UserRound className="text-xl cursor-pointer" />
          <ShoppingBasket className="text-xl cursor-pointer" />
          {/* Hamburger Menu for mobile */}
          <AlignJustify className="text-xl cursor-pointer md:hidden" onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex justify-center items-center space-x-8 py-4 md:py-0 md:flex-row`}
      >
        <a href="#" className="text-gray-800 hover:text-red-600">
          Shop Collection
        </a>
        <a href="#" className="text-gray-800 hover:text-red-600">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
