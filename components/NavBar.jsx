import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        {/* Your logo or brand icon */}
                        <span className="text-white m-5 text-lg font-bold">TaskMaster</span>
                    </div>

                    {/* Mobile menu button */}
                    <div className="absolute m-5  inset-y-0 right-0 flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger menu icon */}
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Close menu icon (hidden initially) */}
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>



                    {/* Menu items */}
                    <div className={`absolute p-2  sm:pl-[450px] md:pl-[550px] lg:pl-[850px] xl:pl-[1050px] right-0 w-36 m-1 bg-black rounded  lg:bg-transparent md:bg-transparent sm:bg-transparent   xs:left-[260px] sm:relative xl:bg-transparent sm:flex sm:items-center sm:justify-center ,  ${isOpen ? 'block' : 'hidden'}xs:absolute xs:top-[150px]`}>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4  ">
                            {/* Navigation links */}
                            <Link
                                to="/"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)} // Close menu on link click
                            >
                                Home
                            </Link>
                            <Link
                                to="/tasks"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)} // Close menu on link click
                            >
                                Tasks
                            </Link>
                            {/* <Link
                                to="/ourplans"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)} // Close menu on link click
                            >
                                Plans
                            </Link> */}
                            <Link
                                to="/login"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)} // Close menu on link click
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-gray-300 bg-blue-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => setIsOpen(false)} // Close menu on link click
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default NavBar;
