import { Todo, createTodo } from '../models/todo';

const db = {};

((): void => {
  const todos = ['Finish todoGQL', 'Complete OKRs', 'Learn to program'];

  todos.forEach((content, index) => {
    const id = index + 1;
    const newTodo = {
      id,
      content,
      done: false
    };
    db[id] = newTodo;
  });
})();

function createItem(content: string): Todo {
  const id = parseInt(Object.keys(db).pop(), 10) + 1;
  const todo = createTodo(id, content);

  return todo;
}

function getItem(id: number): Todo {
  const todo = db[id];
  if (!todo) { throw new Error(`Todo ${id} does not exist`); }

  return todo;
}

function listItems(): Todo[] {
  const todos = Object.keys(db).map(todoId => db[todoId]);
  return todos;
}

function deleteItem(id: number): boolean {
  const todo = db[id];
  if (todo) {
    delete db[id];
    return true;
  }
  return false;
}

function updateItem(id: number): Todo {
  const todo = db[id];
  if (!todo) { throw new Error(`Todo ${id} does not exist.`); }
  todo.done = true;
  return todo;
}

export const inMemoryDB = {
  createItem: ({ content }): Todo => createItem(content),
  getItem: ({ id }): Todo => getItem(id),
  listItems: (): Todo[] => listItems(),
  updateItem: ({ id }): Todo => updateItem(id),
  deleteItem: ({ id }): boolean => deleteItem(id)
}
