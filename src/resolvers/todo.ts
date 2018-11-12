import { Todo, createTodo } from '../models/todo';

export class ResolverTodo {
  private db: any;

  constructor (db: any) {
    this.db = db
  }

  getTodo(id: number): Todo[] {
    const todo = this.db[id];
    if (!todo) { throw new Error(`Todo ${id} does not exist`); }
    return [todo]
  }
  
  listTodos(): Todo[] {
    const todos = Object.keys(this.db).map(todoId => this.db[todoId]);
    return todos;
  }
  
  createTodo(content: string): [Todo] {
    const id = parseInt(Object.keys(this.db).pop(), 10) + 1;
    const todo = createTodo(id, content);
    this.db[todo.id] = todo;
    return [todo];
  }
  
  completeTodo(id: number): [Todo] {
    const todo = this.db[id];
    if (!todo) { throw new Error(`Todo ${id} does not exist.`); }
    todo.done = true;
    return [todo];
  }
  
  deleteTodo(id: number): boolean {
    const todo = this.db[id];
    if (todo) {
      delete this.db[id];
      return true;
    }
    return false;
  }
};
