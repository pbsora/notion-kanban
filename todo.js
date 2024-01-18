export class TodoList {
  static list = [];

  static getFromLS() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      todos = todos.map((todo) => new Todo(todo.content, todo.id, todo.status));
      this.list = [...todos];
    }
  }

  static syncLS() {
    localStorage.setItem("todos", JSON.stringify(this.list));
  }

  static addToList(todo) {
    this.list.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.list));
  }

  static delete(id) {
    this.list = this.list.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(this.list));
  }

  static update(id, status) {
    const todo = (this.list.find((el) => el.id === +id).status = status);
    this.syncLS();
  }
}

export class Todo {
  constructor(content, id, status = "todo") {
    this.content = content;
    this.id = id;
    this.status = status;
  }

  deleteTodo() {
    document.getElementById(this.id).remove();
    TodoList.delete(this.id);
  }
}
