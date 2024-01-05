const newTodoBtn = document.getElementById("new-todo");
const todoForm = document.getElementById("todo-form");
const cancelBtn = document.getElementById("cancel");
const todoInput = document.getElementById("todo-input");
const todoTemplate = document.getElementById("todo-template");

const todoTab = document.getElementById("todo");
const progressTab = document.getElementById("progress");
const doneTab = document.getElementById("done");
const lanes = document.querySelectorAll(".lane");

import { Todo, TodoList } from "./todo.js";

//Get existing tasks from Local Storage
initialDOMLoad();
//Adds drag-events to existing tasks
dragEvents();

newTodoBtn.addEventListener("click", displayInput);

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  hideInput();
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = new Todo(todoInput.value, Math.floor(Math.random() * 100000));
  todoInput.value = "";
  TodoList.addToList(todo);

  const node = createNode(todo);

  hideInput();
  todoTab.insertBefore(node, newTodoBtn);
  dragEvents();
});

function displayInput() {
  newTodoBtn.classList.toggle("hidden");
  todoForm.classList.toggle("hidden");
  setTimeout(() => {
    todoInput.focus();
  }, 100);
}

function hideInput() {
  newTodoBtn.classList.toggle("hidden");
  todoForm.classList.toggle("hidden");
}

function createNode(todo) {
  const newTodo = todoTemplate.content.cloneNode(true);
  newTodo.querySelector("span").textContent = todo.content;
  newTodo.querySelector("div").setAttribute("id", todo.id);
  newTodo
    .querySelector("button")
    .addEventListener("click", () => todo.deleteTodo());
  return newTodo;
}

function dragEvents() {
  const draggables = document.querySelectorAll(".draggable");
  draggables.forEach((item) => {
    item.addEventListener("dragstart", () => {
      item.classList.add("is-dragging");
      item.classList.toggle("drag");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("is-dragging");
      item.classList.toggle("drag");
      TodoList.update(item.id, item.parentElement.id);
    });
  });
}

function initialDOMLoad() {
  TodoList.getFromLS();
  TodoList.list.forEach((todo) => {
    const node = createNode(todo);
    switch (todo.status) {
      case "todo":
        todoTab.insertBefore(node, newTodoBtn);
        break;
      case "progress":
        progressTab.appendChild(node);
        break;
      case "done":
        doneTab.appendChild(node);
        break;
    }
  });
}

lanes.forEach((lane) => {
  lane.addEventListener("dragover", (e) => {
    e.preventDefault();
    const curTask = document.querySelector(".is-dragging");

    if (lane.id === "todo") lane.insertBefore(curTask, newTodoBtn);
    else lane.appendChild(curTask);
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") displayInput();
  else if (e.key === "Escape") hideInput();
});
