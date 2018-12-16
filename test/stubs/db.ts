import { createTodo, Todo } from '../../src/models/todo';

let db = {};

function initialise(): void {
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
}

function createItem(content: string): Todo {
  const id = parseInt(Object.keys(db).pop(), 10) + 1 || 1;
  const todo = createTodo(id, content);

  db[id] = todo;

  return todo;
}

function getItem(id: number): Todo {
  const todo = db[id];
  if (!todo) { throw new Error(`Todo ${id} does not exist`); }

  return todo;
}

function listItems(): Todo[] {
  return Object.keys(db).map(todoId => db[todoId]);
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

function resetDB(): void {
  db = {};
  initialise();
}

initialise();
export const dbStub = {
  createItem: createItem,
  getItem: getItem,
  listItems: listItems,
  updateItem: updateItem,
  deleteItem: deleteItem,
  resetDB: resetDB
};
