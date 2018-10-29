class Todo {
  constructor(content) {
    this.id = content.id;
    this.content = content.body;
    this.done = false;
  }
}

module.exports = Todo;
