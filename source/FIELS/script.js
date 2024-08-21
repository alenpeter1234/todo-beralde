let todos = [];
let currentEditIndex = -1;

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';

        const text = document.createElement('span');
        text.textContent = todo;
        todoItem.appendChild(text);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTodo(index);
        todoItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(index);
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    });
}

function addTodo() {
    const input = document.getElementById('todo-input');
    const newTodo = input.value.trim();
    
    if (newTodo) {
        if (currentEditIndex === -1) {
            todos.push(newTodo);
        } else {
            todos[currentEditIndex] = newTodo;
            currentEditIndex = -1;
        }
        input.value = '';
        renderTodos();
    }
}

function editTodo(index) {
    const input = document.getElementById('todo-input');
    input.value = todos[index];
    currentEditIndex = index;
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}
