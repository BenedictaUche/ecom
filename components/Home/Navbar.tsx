import React, { useState } from 'react';
import { Search, User, ShoppingBasket, AlignJustify, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full">
      <div className="flex justify-between items-center px-6 py-4 md:px-10">

        {/* Search Icon (hidden on small screens) */}
        <div className="flex items-center space-x-6">
          <Search className="text-xl sm:block hidden cursor-pointer" />
        </div>

        {/* Logo (hidden on small screens) */}
        <h1 className=" text-[30px] sm:text-[59px] hidden sm:block text-center tracking-[.25em]">
          happy kids
        </h1>

        {/* Cart Icon and Hamburger Menu */}
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="cursor-pointer inline-flex items-center gap-1 relative">
            <ShoppingBasket className="text-xl cursor-pointer" />
            <span className="absolute -top-2 -right-3 bg-black text-white rounded-full h-5 w-5 text-center text-[10px] flex items-center justify-center">
              {cartItems.length}
            </span>
          </Link>
          {/* Hamburger Menu for mobile */}
          <AlignJustify className="text-xl cursor-pointer md:hidden" onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`fixed inset-0 bg-white z-20 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center space-y-6`}
      >
        <X className="absolute top-6 right-6 text-xl cursor-pointer" onClick={toggleMenu} />
        <Link href="/" className="text-gray-800 hover:text-red-600" onClick={toggleMenu}>
          Home
        </Link>
        <Link href="/producfs" className="text-gray-800 hover:text-red-600" onClick={toggleMenu}>
          Shop Collection
        </Link>
        <Link href="/producfs/Collection" className="text-gray-800 hover:text-red-600" onClick={toggleMenu}>
          Add to your collection
        </Link>
        <div className="mt-4 flex items-center space-x-6">
          <Search className="text-xl cursor-pointer" />
        </div>
      </nav>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex justify-center items-center space-x-8 py-4 md:py-0 md:flex-row">
        <Link href="/" className="text-gray-800 hover:text-red-600">
          Home
        </Link>
        <Link href="/producfs" className="text-gray-800 hover:text-red-600">
          Shop Collection
        </Link>
        <Link href="/producfs/collection" className="text-gray-800 hover:text-red-600">
          Add your collection
        </Link>
        <Link href="#" className="text-gray-800 hover:text-red-600">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
