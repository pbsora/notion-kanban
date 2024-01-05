const newTodoBtn = document.getElementById("new-todo");
const todoForm = document.getElementById("todo-form");
const cancelBtn = document.getElementById("cancel");

newTodoBtn.addEventListener("click", () => {
  newTodoBtn.classList.toggle("hidden");
  todoForm.classList.toggle("hidden");
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newTodoBtn.classList.toggle("hidden");
  todoForm.classList.toggle("hidden");
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = new FormData(todoForm);
  console.log(Object.entries(todo));
});
