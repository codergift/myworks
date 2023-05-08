window.onload = function() {
    updateTodoList();
  };
  function saveToApi(event) {
    event.preventDefault();
  
    const name = event.target.todo.value;
    const description = event.target.description.value;
  
    if (name && description) {
      const todo = {
        name: name,
        description: description
      };
  
      axios.post('https://crudcrud.com/api/9978d26e58fd43fcb89131e194973d0a/todos', todo)
        .then(() => {
          // Clear the form inputs
          event.target.reset();
  
          // Update the todo list on the page
          updateTodoList();
        })
        .catch(error => console.log(error));
    } else {
      alert('Please enter a name and description for the todo.');
    }
  }
  
  function deleteTodo (id) {
    axios.delete(`https://crudcrud.com/api/9978d26e58fd43fcb89131e194973d0a/todos/${id}`)
      .then(() => {
        updateTodoList();
      })
      .catch(error => console.log(error));
  }
  
  function deleteDoneTodo (id) {
    axios.delete(`https://crudcrud.com/api/9978d26e58fd43fcb89131e194973d0a/doneTodos/${id}`)
      .then(() => {
        updateTodoList();
      })
      .catch(error => console.log(error));
  }
  
  function markTodoAsDone(id) {
    axios.get(`https://crudcrud.com/api/9978d26e58fd43fcb89131e194973d0a/todos/${id}`)
      .then(response => {
        const todo = response.data;
        const doneTodo = {
          name: todo.name,
          description: todo.description
        };
        
        axios.post('https://crudcrud.com/api/9978d26e58fd43fcb89131e194973d0a/doneTodos', doneTodo)
          .then(() => {
            axios.delete(`https://crudcrud.com/api/9978d26e58fd43fcb89131e194973d0a/todos/${id}`)
              .then(() => {
                // Update both the todo lists on the page
                updateTodoList();
                updateDoneTodoList();
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }
  
  function updateTodoList() {
    const todosContainer = document.getElementById('remainingList');
    const doneTodosContainer = document.getElementById('doneList');
  
    // Fetch remaining todos
    axios.get('https://crudcrud.com/api/9978d26e58fd43fcb89131e194973d0a/todos')
      .then(response => {
        const todos = response.data || [];
  
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
                  <button class="btn btn-sm btn-success me-2" onclick="markTodoAsDone('${todo._id}')">Done</button>
                  <button class="btn btn-sm btn-danger" onclick="deleteTodo('${todo._id}')">Delete</button>
                </div>
              </div>
              <p style="color:rgba(0, 0, 0, 0.575);">${todo.description}</p>
            `;
            todosContainer.appendChild(todoElement);
          }
        }
      })
      .catch(error => console.log(error));
  
    // Fetch completed todos
    axios.get('https://crudcrud.com/api/9978d26e58fd43fcb89131e194973d0a/doneTodos')
      .then(response => {
        const doneTodos = response.data || [];
  
        doneTodosContainer.innerHTML = '';
  
        if (doneTodos.length === 0) {
          doneTodosContainer.innerHTML = '<li>No completed todos yet.</li>';
        } else {
          for (let i = 0; i < doneTodos.length; i++) {
            const doneTodo = doneTodos[i];
            const doneTodoElement = document.createElement('li');
            doneTodoElement.innerHTML = `
              <div class="d-flex justify-content-between align-items-center">
                <span> ${doneTodo.name}</span>
                <div>
                  <button class="btn btn-sm btn-danger" onclick="deleteDoneTodo('${doneTodo._id}')">Delete</button>
                </div>
              </div>
              <p style="color:rgba(0, 0, 0, 0.575);">${doneTodo.description}</p>
            `;
            doneTodosContainer.appendChild(doneTodoElement);
          }
        }
      })
      .catch(error => console.log(error));
  }
  
  
  