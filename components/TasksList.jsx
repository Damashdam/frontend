import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TasksList() {
    const [tasks, setTasks] = useState([]);



    return (
        <div className="container mx-auto text-center mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map(task => (
                    <div key={task._id} className="bg-white shadow-md p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-2">{task.title}</h2>
                        <p className="text-gray-600 mb-4">{task.description}</p>
                        {/* Render more details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TasksList;
