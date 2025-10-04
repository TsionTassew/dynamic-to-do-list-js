// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to keep tasks in memory
    let tasks = [];

    // Save current tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the DOM and (optionally) to Local Storage
    // If taskText is omitted, the function will read from the input field.
    function addTask(taskText, save = true) {
        // If no taskText provided, read from input
        if (typeof taskText === 'undefined' || taskText === null) {
            taskText = taskInput.value.trim();
        }

        // Validate non-empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create list item and span for the task text
        const li = document.createElement('li');
        li.dataset.task = taskText; // store task text in data attribute
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // When clicked, remove the task from DOM and update Local Storage
        removeButton.addEventListener('click', function() {
            taskList.removeChild(li);
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        // Append remove button and li to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save to tasks array and Local Storage if requested
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }
    }

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks; // initialize in-memory tasks array
        storedTasks.forEach(taskText => addTask(taskText, false)); // false => don't save again
    }

    // Attach event listeners
    addButton.addEventListener('click', function() {
        addTask(); // call without args to use input value
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial load from Local Storage
    loadTasks();
});
