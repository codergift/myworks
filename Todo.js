function saveToLocalStorage(event) {
    event.preventDefault();
  
    const name = event.target.todo.value;
    const description = event.target.description.value;
  
    if (name && description) {
      const todo = {
        name: name,
        description: description
      };
  
      // Get the existing todos from local storage
      const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
  
      // Add the new todo to the existing todos array
      existingTodos.push(todo);
  
      // Save the updated todos array to local storage
      localStorage.setItem('todos', JSON.stringify(existingTodos));
  
      // Clear the form inputs
      event.target.reset();
  
      // Update the todo list on the page
      updateTodoList();
    } else {
      alert('Please enter a name and description for the todo.');
    }
  }
  
  function deleteTodo (index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    updateTodoList();
  }
  function deleteDoneTodo (index) {
    const doneTodos = JSON.parse(localStorage.getItem('doneTodos')) || [];
    doneTodos.splice(index, 1);
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
    updateTodoList();
  }
  
  
  function markTodoAsDone(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const doneTodos = JSON.parse(localStorage.getItem('doneTodos')) || [];
  
    const doneTodo = todos.splice(index, 1)[0];
    doneTodos.push(doneTodo);
  
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
  
    updateTodoList();
  }
  
  function updateTodoList() {
    const todosContainer = document.getElementById('remainingList');
    const doneTodosContainer = document.getElementById('todoDone');
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const doneTodos = JSON.parse(localStorage.getItem('doneTodos')) || [];
  
    todosContainer.innerHTML = '';
    doneTodosContainer.innerHTML = '<h6>Task Done:</h6>';
  
    if (todos.length === 0) {
      todosContainer.innerHTML = '<li>No todos added yet.</li>';
    } else {
      for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const todoElement = document.createElement('li');
        todoElement.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <span>${todo.name}</span>
            <div>
              <button class="btn btn-sm btn-success me-2" onclick="markTodoAsDone(${i})">Done</button>
              <button class="btn btn-sm btn-danger" onclick="deleteTodo(${i})">Delete</button>
            </div>
          </div>
          <p>${todo.description}</p>
        `;
        todosContainer.appendChild(todoElement);
      }
    }
  
    if (doneTodos.length === 0) {
      doneTodosContainer.innerHTML = '<p>No tasks completed yet.</p>';
    } else {
      const doneList = document.createElement('ul');
      for (let i = 0; i < doneTodos.length; i++) {
        const doneTodo = doneTodos[i];
        const doneTodoElement = document.createElement('li');
        doneTodoElement.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <span>${doneTodo.name}</span>
            <div>
              <button class="btn btn-sm btn-danger" onclick="deleteDoneTodo(${i})">Delete</button>
            </div>
          </div>
          <p>${doneTodo.description}</p>
        `;
        doneList.appendChild(doneTodoElement);
      }
      doneTodosContainer.appendChild(doneList);
    }
  }
  
  
  function deleteCompletedTask(event) {
    event.target.parentNode.parentNode.remove();
  }
  // Call updateTodoList and updateDoneTodoList on page load
  updateTodoList();
  updateDoneTodoList();
  