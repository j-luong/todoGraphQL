import { Todo } from '../models/todo';

export class ResolverTodo {
  private db: any;

  constructor (db: any) {
    this.db = db
  }

  getTodo(id: number): Todo[] {
    let todo;
    try {
      todo = this.db.getItem(id);
    } catch (err) {
      throw err;
    }
    return [todo]
  }
  
  listTodos(): Todo[] {
    let todos;
    try {
      todos = this.db.listItems();
    } catch (err) {
      throw err;
    }
    return todos;
  }
  
  createTodo(content: string): [Todo] {
    let todo;
    try {
      todo = this.db.createItem(content);
    } catch (err) {
      throw err;
    }
    return [todo];
  }
  
  completeTodo(id: number): [Todo] {
    let todo;
    try {
      todo = this.db.updateItem(id);
    } catch (err) {
      throw err;
    }
    return [todo];
  }
  
  deleteTodo(id: number): boolean {
    return this.db.deleteItem(id);
  }
};
