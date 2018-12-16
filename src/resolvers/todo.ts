import { Todo } from '../models/todo';

export class ResolverTodo {
  private db: any;

  constructor (db: any) {
    this.db = db;
  }

  async getTodo(id: number): Promise<Todo[]> {
    let todo;
    try {
      todo = await this.db.getItem(id);
    } catch (err) {
      throw err;
    }
    return [todo];
  }

  async listTodos(): Promise<Todo[]> {
    let todos;
    try {
      todos = await this.db.listItems();
    } catch (err) {
      throw err;
    }
    return todos;
  }

  async createTodo(content: string): Promise<Todo[]> {
    let todo;
    try {
      todo = await this.db.createItem(content);
    } catch (err) {
      throw err;
    }
    return [todo];
  }

  async completeTodo(id: number): Promise<Todo[]> {
    let todo;
    try {
      todo = await this.db.getItem(id);
    } catch (err) {
      throw err;
    }

    try {
      todo.done = true;
      await this.db.updateItem(id, todo);
    } catch (err) {
      throw err;
    }
    return [todo];
  }

  async deleteTodo(id: number): Promise<boolean> {
    return this.db.deleteItem(id);
  }
}
