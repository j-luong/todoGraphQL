class Todo {
  constructor(content) {
    this.id = ++Todo.counter;
    this.content = content;
    this.done = false;
  }
}

Todo.counter = 0;

module.exports = Todo;
