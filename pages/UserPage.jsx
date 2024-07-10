import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import introPic from '../images/introImage.png';





function UserPage() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };




    return (
        <div>

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
                                {/* <Link
                                    to="/userpage"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => setIsOpen(false)} // Close menu on link click
                                >
                                    Home
                                </Link> */}
                                <Link
                                    to="/tasks"
                                    className="text-gray-300 bg-blue-500 text-xl hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md  font-medium"
                                    onClick={() => setIsOpen(false)} // Close menu on link click
                                >
                                    Tasks
                                </Link>
                                <Link
                                    to="/tasks"
                                    className="text-gray-300 bg-red-500 text-xl hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md  font-medium"
                                    onClick={() => setIsOpen(false)} // Close menu on link click
                                >
                                    LogOut
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </nav >


            <div className="px-4 pt-16  md:px-28 md:pt-28 md:pb-28 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <div className="text-center p-12 md:flex md:items-center md:justify-between">
                    <div className="md:w-1/2 md:text-left">
                        <hr className='w-16 mx-auto border-white my-4 md:hidden' />
                        <h2 className='text-4xl p- md:text-6xl font-bold mb-16  '>Welcome to TaskMaster</h2>
                        <p className='text-lg md:text-2xl mb-12 px-4'>TaskMaster is your go-to task management solution, designed to streamline your productivity effortlessly.</p>
                        <a href='/tasks' className='rounded-full text-black w-40 border-2  mx-2 my-8 border-white py-3 px-6 bg-white text-lg md:text-xl'>Start Managing Tasks</a>
                    </div>
                    <div className="md:w-1/2 md:text-right">
                        <img src={introPic} className='w-[1500px]   md:max-w-full md:h-auto mt-8 ' alt="Intro" />
                    </div>
                </div>
            </div>

            {/* <div className='bg-gradient-to-r from-blue-500 to-purple-600 py-16 px-4 md:px-28'>
                <div className="rounded-full flex flex-col items-center bg-white text-blue-700 py-8 px-6 md:w-[750px] md:h-[180px] mx-auto">
                    <h3 className='text-4xl md:text-3xl font-bold mb-2 text-center'>Upgrade Your Plan</h3>
                    <a href="/ourplans" className="border-2 bg-bl h-14 w-44 mt-4 bg-white rounded-full text-blue-700 text-lg pt-3 text-center md:text-xl">Click Here</a>
                </div>
            </div> */}



            {/* <NavBar /> */}
            <Footer />

        </div>
    )
}

export default UserPage
