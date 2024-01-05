export class TodoList {
  static list = [];

  static addToList(todo) {
    this.list.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.list));
  }

  static delete(id) {
    this.list = this.list.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(this.list));
  }
}

export class Todo {
  constructor(content, id) {
    this.content = content;
    this.id = id;
    this.status = "todo";
  }

  deleteTodo() {
    document.getElementById(this.id).remove();
    TodoList.delete(this.id);
  }
}
