import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import DoneButton from '../images/doneBUTTON.png';
import PinIcon from '../images/pinIcon.png';

function Tasks() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        body: '',
        todoList: [],
        isPinned: false
    });
    const [showForm, setShowForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterActive, setIsFilterActive] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchTasks(token);
            setIsLoggedIn(true);
        } else {
            console.log('No token found. Redirecting to login page...');
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        const filteredData = tasks.filter(task => {
            return (
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredTasks(filteredData);
    }, [searchTerm, tasks]);

    const fetchTasks = (token) => {
        fetch('http://localhost:3000/api/tasks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setTasks(data);
                setFilteredTasks(data); // Initialize filteredTasks with all tasks
            })
            .catch(err => console.error('Error fetching tasks:', err));
    };

    const deleteTask = async (taskId, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete task: ${response.status} - ${errorText}`);
            }

            console.log('Task deleted successfully');
            fetchTasks(token); // Refresh tasks after deletion
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData), // Ensure formData is correctly populated
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            setFormData({
                title: '',
                description: '',
                body: '',
                todoList: [],
                isPinned: false,
            });
            fetchTasks(token);
            setShowForm(false);
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };



    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
    };

    const handleUniqueFilter = (filterType, value) => {
        const filteredData = tasks.filter(task => {
            // Implement your unique filter logic here
            switch (filterType) {
                case 'isPinned':
                    return task.isPinned === value;
                // Add more cases for additional filters as needed
                default:
                    return true;
            }
        });
        setFilteredTasks(filteredData);
    };

    const toggleFilters = () => {
        setIsOpen(!isOpen);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            await deleteTask(taskId, token);
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    const updateTask = async (taskId, updatedData) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            fetchTasks(token); // Refresh tasks after update
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };
    const handleUpdateTask = async (taskId, updatedData) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            // Update the local state with the updated task data
            const updatedTasks = tasks.map(task => {
                if (task._id === taskId) {
                    return { ...task, isPinned: !task.isPinned }; // Toggle the isPinned status
                }
                return task;
            });

            setTasks(updatedTasks);
            handleUniqueFilter('isPinned', true); // Update filtered tasks based on filters

        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };

    return (
        <>

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
                                    to="/userpage"
                                    className="text-gray-300 bg-blue-500 text-xl hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md  font-medium"
                                    onClick={() => setIsOpen(false)} // Close menu on link click
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/"
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
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-16 px-4 md:px-28">
                <h1 className="text-4xl md:text-6xl font-bold mb-16 text-center">Task Manager</h1>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={toggleFilters}
                        className="bg-white text-blue-600 py-3 px-6 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
                    >
                        {isOpen ? 'Close Filters' : 'Open Filters'}
                    </button>
                </div>

                {isOpen && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-center">Filters</h2>
                        <div className="flex justify-center space-x-4 mb-4">
                            {/* Example filter buttons */}
                            <button
                                onClick={() => handleUniqueFilter('isPinned', true)}
                                className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >


                                Pinned Tasks
                            </button>
                            {/* Add more filter buttons as needed */}
                        </div>

                        <div className="flex justify-center mb-4">
                            <input
                                type="text"
                                placeholder="Search tasks"
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Changed text color to black
                                value={searchTerm}
                                onChange={handleFilter}
                            />
                        </div>
                    </div>
                )}

                <div className="text-center mb-10">
                    <button
                        onClick={toggleForm}
                        className="bg-white text-blue-600 py-3 px-6 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
                    >
                        {showForm ? 'Close Form' : 'Add New Task'}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto mb-10">
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create New Task</h2>

                        <div className="mb-4">
                            <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter title"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                placeholder="Enter description"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="body" className="block text-lg font-semibold mb-2">Body</label>
                            <textarea
                                id="body"
                                name="body"
                                value={formData.body}
                                onChange={handleInputChange}
                                className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={6}
                                placeholder="Enter detailed body"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="isPinned" className="block text-lg font-semibold mb-2">Pin Task</label>
                            <input
                                type="checkbox"
                                id="isPinned"
                                name="isPinned"
                                checked={formData.isPinned}
                                onChange={() => setFormData({ ...formData, isPinned: !formData.isPinned })}
                                className="mr-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">Pin this task</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        >
                            Add Task
                        </button>
                    </form>
                )}

                <h2 className="text-3xl font-bold mb-6 text-center">Your Tasks</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTasks.map(task => (
                        <div key={task._id} className="relative bg-white text-blue-600 shadow-lg p-6 rounded-lg transition duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                            <p className="text-gray-600 mb-4">{task.description}</p>
                            <Link to={`/tasks/${task._id}`} className="text-blue-600 hover:text-blue-700">
                                View Details
                            </Link>
                            <button
                                onClick={() => handleDeleteTask(task._id)}
                                className="absolute top-2 right-6"
                            >
                                <img src={DoneButton} className="w-48" alt="Done" />
                            </button>
                            <button
                                onClick={() => handleUpdateTask(task._id, { ...task, isPinned: !task.isPinned })}
                                className="absolute top-4 left-[320px] bg-white text-blue-600 py-1 px-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                {task.isPinned ? 'Unpin' : 'Pin'}


                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Tasks;
