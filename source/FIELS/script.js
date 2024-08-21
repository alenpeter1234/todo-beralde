document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo();
    });

    function addTodo() {
        const text = input.value.trim();
        if (text === '') return;

        const li = document.createElement('li');
        li.classList.add('list-group-item', 'todo-item');

        li.innerHTML = `
            <input type="checkbox" class="mr-2">
            <span class="todo-text">${text}</span>
            <button class="btn btn-warning btn-sm float-right mr-2">Edit</button>
            <button class="btn btn-danger btn-sm float-right">Delete</button>
        `;

        todoList.appendChild(li);
        input.value = '';
        
        
        Swal.fire({
            icon: 'success',
            title: 'Task Added',
            text: `'${text}' has been added to your list!`,
            timer: 1500,
            showConfirmButton: false
        });

        
        li.querySelector('.btn-warning').addEventListener('click', () => {
            Swal.fire({
                title: 'Edit Task',
                input: 'text',
                inputValue: li.querySelector('.todo-text').textContent,
                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    li.querySelector('.todo-text').textContent = result.value;
                    Swal.fire(
                        'Updated!',
                        'Your task has been updated.',
                        'success'
                    );
                }
            });
        });

        
        li.querySelector('.btn-danger').addEventListener('click', () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to recover this task!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete!'
            }).then((result) => {
                if (result.isConfirmed) {
                    li.remove();
                    Swal.fire(
                        'Deleted!',
                        'Your task has been deleted.',
                        'success'
                    );
                }
            });
        });

        
        li.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
            if (e.target.checked) {
                li.querySelector('.todo-text').style.textDecoration = 'line-through';
            } else {
                li.querySelector('.todo-text').style.textDecoration = 'none';
            }
        });
    }
});
