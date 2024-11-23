// Add event listeners to filter buttons
document.getElementById('all').addEventListener('click', () => filterTodos('all'));
document.getElementById('active').addEventListener('click', () => filterTodos('active'));
document.getElementById('completed').addEventListener('click', () => filterTodos('completed'));

function filterTodos(filter) {
    const todoItems = todosUL.children;
    for (let item of todoItems) {
        const isCompleted = item.querySelector('.checkbox').checked;
        if (filter === 'all') {
            item.style.display = 'flex';
        } else if (filter === 'active' && isCompleted) {
            item.style.display = 'none';
        } else if (filter === 'completed' && !isCompleted) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
    }
}


// Get references to DOM elements
const form = document.getElementById('form');       // Form element
const input = document.getElementById('input');     // Input field for new to-dos
const todosUL = document.getElementById('todos');   // Unordered list to display to-dos

// Retrieve todos from localStorage or initialize an empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render existing todos on page load
if (todos.length > 0) {
    todos.forEach((todo) => addTodoElement(todo));
}

// Add event listener to the form to handle new to-do submissions
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting traditionally
    addTodo();          // Call function to add a new to-do
});

// Function to add a new to-do
function addTodo() {
    const todoText = input.value.trim(); // Get the input value and trim whitespace
    if (todoText !== '') {
        const todo = {
            text: todoText,
            completed: false
        };
        todos.push(todo);          // Add new to-do to the array
        addTodoElement(todo);      // Add to-do to the DOM
        updateLocalStorage();      // Update localStorage
        input.value = '';          // Clear the input field
    }
}

// Function to create and add a to-do element to the DOM
function addTodoElement(todo) {
    // Create list item
    const todoEl = document.createElement('li');

    // Create and append the number element
    const numberEl = document.createElement('span');
    numberEl.classList.add('number');
    numberEl.textContent = todos.indexOf(todo) + 1; // Display the current index
    todoEl.appendChild(numberEl);

    // Create and append the checkbox
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = todo.completed;
    checkboxEl.classList.add('checkbox');
    checkboxEl.addEventListener('change', () => {
        todo.completed = checkboxEl.checked;
        textEl.classList.toggle('completed', todo.completed);
        updateLocalStorage();
    });
    todoEl.appendChild(checkboxEl);

    // Create and append the text element
    const textEl = document.createElement('span');
    textEl.classList.add('text');
    textEl.textContent = todo.text;
    if (todo.completed) {
        textEl.classList.add('completed');
    }
    todoEl.appendChild(textEl);

    // Create and append the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
        todos = todos.filter((t) => t !== todo); // Remove from array
        todosUL.removeChild(todoEl);             // Remove from DOM
        updateNumbers();                         // Update numbering
        updateLocalStorage();                    // Update localStorage
    });
    todoEl.appendChild(deleteBtn);

    // Append the complete to-do element to the list
    todosUL.appendChild(todoEl);
}

// Function to update the numbering of to-dos
function updateNumbers() {
    const numberEls = document.querySelectorAll('.number');
    numberEls.forEach((numberEl, index) => {
        numberEl.textContent = index + 1;
    });
}

// Function to update localStorage with the current to-dos
function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add event listener to the text element for editing
textEl.addEventListener('dblclick', () => {
    const newText = prompt('Edit your to-do:', todo.text);
    if (newText !== null && newText.trim() !== '') {
        todo.text = newText.trim();
        textEl.textContent = todo.text;
        updateLocalStorage();
    }
});

// Modify the addTodo function to include a due date
const dueDate = prompt('Enter due date (YYYY-MM-DD):');
todo.dueDate = dueDate;

// In addTodoElement, create and append the due date element
const dueDateEl = document.createElement('span');
dueDateEl.classList.add('due-date');
dueDateEl.textContent = `Due: ${todo.dueDate}`;
todoEl.appendChild(dueDateEl);

