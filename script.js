const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const clearBtn = document.querySelector("#clear-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodoList() {
  todoList.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement("li");
    const textSpan = document.createElement("span");
    textSpan.innerText = todo.text;
    textSpan.addEventListener("click", () => {
      toggleCompleted(i);
    });
    if (todo.completed) {
      textSpan.style.textDecoration = "line-through";
    }
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTodo(i);
    });
    li.appendChild(textSpan);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todo = {
      text: todoText,
      completed: false,
    };
    todos.push(todo);
    saveTodos();
    renderTodoList();
    todoInput.value = "";
  }
}

function deleteTodo (index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodoList();
}

function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodoList();
}

function clearTodos() {
  todos = [];
  saveTodos();
  renderTodoList();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});

clearBtn.addEventListener("click", () => {
  clearTodos();
});

renderTodoList();
