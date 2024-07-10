import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function TaskDetails() {
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        title: '',
        description: '',
        body: '',
        isPinned: false,
        todoList: [],
    });
    const [newTodo, setNewTodo] = useState('');
    const [todoEditMode, setTodoEditMode] = useState({ index: -1, edit: false }); // Track which todo is in edit mode
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    throw new Error(`Failed to fetch task details: ${errorData}`);
                }

                const taskData = await response.json();
                setTask(taskData);
                setUpdatedTask(taskData); // Initialize updatedTask state with fetched task data
            } catch (error) {
                setError(error.message);
                console.error('Error fetching task details:', error);
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to update task: ${errorData}`);
            }

            const updatedTaskData = await response.json();
            setTask(updatedTaskData); // Update task state with updated data
            setEditMode(false); // Exit edit mode after successful update
        } catch (error) {
            setError(error.message);
            console.error('Error updating task:', error);
        }
    };

    const handleTodoAdd = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: newTodo, isComplete: false }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to add todo: ${errorData}`);
            }

            const updatedTaskData = await response.json();
            setTask(updatedTaskData);
            setUpdatedTask(updatedTaskData);
            setNewTodo('');
        } catch (error) {
            setError(error.message);
            console.error('Error adding todo:', error);
        }
    };

    const handleTodoUpdate = async (index, updatedTodo) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}/todos/${index}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedTodo),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to update todo: ${errorData}`);
            }

            const updatedTaskData = await response.json();
            setTask(updatedTaskData);
            setUpdatedTask(updatedTaskData);
            exitTodoEditMode(); // Exit edit mode for the todo after update
        } catch (error) {
            setError(error.message);
            console.error('Error updating todo:', error);
        }
    };

    const handleTodoDelete = async (index) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}/todos/${index}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to delete todo: ${errorData}`);
            }

            const updatedTaskData = await response.json();
            setTask(updatedTaskData);
            setUpdatedTask(updatedTaskData);
        } catch (error) {
            setError(error.message);
            console.error('Error deleting todo:', error);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const enterTodoEditMode = (index) => {
        setTodoEditMode({ index, edit: true });
    };

    const exitTodoEditMode = () => {
        setTodoEditMode({ index: -1, edit: false });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({
            ...updatedTask,
            [name]: value,
        });
    };

    const handleTodoToggleComplete = async (index) => {
        const updatedTodos = [...updatedTask.todoList];
        updatedTodos[index].isComplete = !updatedTodos[index].isComplete;
        const updatedTodo = updatedTodos[index];

        setUpdatedTask({
            ...updatedTask,
            todoList: updatedTodos,
        });

        await handleTodoUpdate(index, updatedTodo);
    };

    if (error) {
        return <div className="text-red-600">Error fetching task details: {error}</div>;
    }

    if (!task) {
        return <div className="text-blue-600">Loading task details...</div>;
    }

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
                <div className="max-w-4xl mx-auto bg-white text-blue-600 rounded-lg shadow-lg p-8">
                    {editMode ? (
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="title" className="block font-medium">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={updatedTask.title}
                                    onChange={handleChange}
                                    className="w-full border-b-2 border-blue-400 bg-blue-100 outline-none focus:border-blue-600 px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block font-medium">
                                    Description:
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={updatedTask.description}
                                    onChange={handleChange}
                                    className="w-full border-b-2 border-blue-400 bg-blue-100 h-20 resize-none outline-none focus:border-blue-600 px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="body" className="block font-medium">
                                    Details:
                                </label>
                                <textarea
                                    id="body"
                                    name="body"
                                    value={updatedTask.body}
                                    onChange={handleChange}
                                    className="w-full border-b-2 border-blue-400 bg-blue-100 h-40 resize-none outline-none focus:border-blue-600 px-3 py-2 rounded"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isPinned"
                                    checked={updatedTask.isPinned}
                                    onChange={() =>
                                        setUpdatedTask({
                                            ...updatedTask,
                                            isPinned: !updatedTask.isPinned,
                                        })
                                    }
                                    className="mr-2"
                                />
                                <span className="font-medium">Pin Task</span>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleEditMode}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
                            <p className="mb-4">{task.description}</p>
                            <p className="mb-4">{task.body}</p>
                            <div className="flex items-center mb-4">
                                {/* <input
                                    type="checkbox"
                                    checked={task.isPinned}
                                    readOnly
                                    className="mr-2"
                                /> */}
                                {/* <span className="font-medium">Pinned Task</span> */}
                            </div>
                            <button
                                onClick={toggleEditMode}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Edit Task
                            </button>
                        </div>
                    )}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Todo List</h2>
                        {updatedTask.todoList.map((todo, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-blue-100 px-4 py-2 rounded mb-2"
                            >
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={todo.isComplete}
                                        onChange={() => handleTodoToggleComplete(index)}
                                        className="mr-2"
                                    />
                                    {todoEditMode.index === index && todoEditMode.edit ? (
                                        <input
                                            type="text"
                                            value={todo.title}
                                            onChange={(e) => {
                                                const updatedTodos = [...updatedTask.todoList];
                                                updatedTodos[index].title = e.target.value;
                                                setUpdatedTask({
                                                    ...updatedTask,
                                                    todoList: updatedTodos,
                                                });
                                            }}
                                            onBlur={() => handleTodoUpdate(index, todo)}
                                            className="border-b-2 border-blue-400 bg-blue-100 outline-none focus:border-blue-600 px-2 py-1 rounded"
                                            autoFocus
                                        />
                                    ) : (
                                        <span
                                            onDoubleClick={() => enterTodoEditMode(index)}
                                            className={`cursor-pointer ${todo.isComplete ? 'line-through' : ''
                                                }`}
                                        >
                                            {todo.title}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleTodoDelete(index)}
                                        className="ml-2 text-red-500 hover:text-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                className="border-b-2 border-blue-400 bg-blue-100 outline-none focus:border-blue-600 px-3 py-2 rounded w-full"
                                placeholder="New Todo"
                            />
                            <button
                                onClick={handleTodoAdd}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-2"
                            >
                                Add Todo
                            </button>
                        </div>
                    </div>
                    <div className="mt-8">
                        <Link to="/tasks" className="text-blue-600 hover:underline">
                            Back to Tasks
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default TaskDetails;
