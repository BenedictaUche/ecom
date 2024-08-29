import React, { useState } from 'react';
import { Search, UserRound, ShoppingBasket, AlignJustify } from 'lucide-react';
import Link from 'next/link';

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
        <Link href="#" className="text-gray-800 hover:text-red-600">
          Shop Collection
        </Link>
        <Link href="/producfs/add-product" className="text-gray-800 hover:text-red-600">
          Add or Edit
        </Link>
        <Link href="#" className="text-gray-800 hover:text-red-600">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
