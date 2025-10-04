// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select important elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input value and remove extra spaces

        // Check if input is empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add event to remove the task when clicked
        removeButton.onclick = function() {
            taskList.removeChild(li);
        };

        // Append button to li, then li to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input field after adding task
        taskInput.value = '';
    }

    // Add event listener for button click
    addButton.addEventListener('click', addTask);

    // Add event listener for pressi
