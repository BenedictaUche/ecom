import React, { useState } from 'react';
import { Search, UserRound, ShoppingBasket, AlignJustify } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {cartItems} = useCart()

  return (
    <header className="w-full">
      <div className="flex justify-between items-center px-6 py-4 md:px-10">

        <div className="flex items-center space-x-6">
          <Search className="text-xl cursor-pointer" />
        </div>
        <h1 className=" text-[59px] text-center tracking-[.25em]">
          happy kids
        </h1>


        <div className="flex items-center space-x-6">
          <Link href="/cart" className='cursor-pointer inline-flex items-center gap-1'><ShoppingBasket className="text-xl cursor-pointer" /><span className=" bg-black text-white rounded-full py-[1px] px-[2.5px] h-5 w-5 items-center flex justify-center">{cartItems.length}</span></Link>
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
        <Link href="/" className="text-gray-800 hover:text-red-600">
          Home
        </Link>
        <Link href="/producfs" className="text-gray-800 hover:text-red-600">
          Shop Collection
        </Link>
        <Link href="/producfs/Collection" className="text-gray-800 hover:text-red-600">
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
