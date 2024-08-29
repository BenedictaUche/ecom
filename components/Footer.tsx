import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between align-middle items-center">
          {/* Left Side */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-center">happy kids</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">Home</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">Shop Collection</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">Our Story</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Center */}
          <div className="text-center mb-6 md:mb-0">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Facebook />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Twitter />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Instagram />
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="text-center md:text-right">
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">Store Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">Payment Methods</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-black">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="text-center mt-8">
          <h3 className="text-lg font-semibold">Join Our Mailing List</h3>
          <div className="mt-4 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email here*"
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-gray-800">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8 text-gray-600">
          <p>© 2024 by happy kids. Powered and secured by techwriterb</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
