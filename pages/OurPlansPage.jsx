import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function OurPlansPage() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* <NavBar /> */}
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
                                {/* <Link
                                    to="/tasks"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => setIsOpen(false)} // Close menu on link click
                                >
                                    Tasks
                                </Link> */}
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
            {/* Hero Section */}
            <div className="px-4 pt-6 md:px-28 md:pt-28 md:pb-28 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center">
                <div className="p-12">
                    <hr className='w-16 mx-auto border-white my-4 md:hidden' />
                    <h2 className='text-4xl p- md:text-6xl font-bold mb-16'>Our Plans</h2>
                    <p className='text-lg md:text-2xl mb-4 px-4'>Choose the plan that best fits your needs and start managing your tasks more effectively.</p>
                </div>
            </div>

            {/* Plans Section */}
            <div className="bg-gray-100 py-16 px-4 md:px-28">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Plan Card 1 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Free Plan</h3>
                            <p className="text-base text-gray-600 mb-6">Ideal for individuals starting out with task management.</p>
                            <ul className="text-gray-600 mb-6">
                                <li>10 Tasks</li>
                                <li>Basic Support</li>
                            </ul>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">Choose Plan</button>
                        </div>

                        {/* Plan Card 2 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <h3 className="text-2xl font-semibold  text-gray-800 mb-4">Standard Plan</h3>
                            <p className="text-base text-gray-600 mb-6">Great for small teams looking to manage tasks collaboratively.</p>
                            <ul className="text-gray-600 mb-6">
                                <li>50 Tasks</li>
                                <li>Premium Support</li>
                            </ul>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">Choose Plan</button>
                        </div>

                        {/* Plan Card 3 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Plan</h3>
                            <p className="text-base text-gray-600 mb-6">For large organizations needing advanced task management features.</p>
                            <ul className="text-gray-600 mb-6">
                                <li>Unlimited Tasks</li>
                                <li>Dedicated Support</li>
                            </ul>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">Choose Plan</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className='bg-gradient-to-r from-blue-500 to-purple-600 py-16 px-4 md:px-28'>
                <div className="rounded-full flex flex-col items-center bg-white text-blue-700 py-8 px-6 md:w-[750px] md:h-[180px] mx-auto">
                    <h3 className='text-4xl  md:text-3xl font-bold mb-2 text-center'>Ready to Get Started?</h3>
                    <a href='/register' className=" text-center  border-2 bg-bl h-14 w-44 mt-4 bg-white rounded-full text-blue-700 text-lg md:text-xl pt-3">Sign Up Now</a>
                </div>
            </div>



            <Footer />
        </>
    );
}

export default OurPlansPage;
