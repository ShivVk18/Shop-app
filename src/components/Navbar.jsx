import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/logo.png'

function Navbar() {
  const { cart } = useSelector((state) => state);

  return (
    <nav className="bg-gray-800 shadow-lg p-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <img className="h-10 w-auto rounded-full " src={logo}  />
            </NavLink>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                <NavLink to="/category" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Category</NavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <NavLink to="/cart" className="relative text-gray-300 hover:text-white">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;