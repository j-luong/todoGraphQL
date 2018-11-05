import { Todo, createTodo } from '../models/todo';
const db = {};

((): void => {
  const todos = ['Finish todoGQL', 'Complete OKRs', 'Learn functional programming'];

  todos.forEach((todo, index) => {
    const count = index + 1;
    const newTodo = createTodo(count, todo);
    db[count] = newTodo;
  });
})();

function getTodo(id: number): Todo[] {
  const todo = db[id];
  if (!todo) { throw new Error(`Todo ${id} does not exist`) }
  return [{
    id: todo.id,
    content: todo.content,
    done: todo.done
  }]
}

function listTodos(): Todo[] {
  const todos = Object.keys(db).map(todoId => db[todoId]);
  return todos;
}

function newTodo(content: string): [Todo] {
  const id = parseInt(Object.keys(db).pop(), 10) + 1;
  const todo = createTodo(id, content);
  db[todo.id] = todo;
  return [todo];
}

function completeTodo(id: number): [Todo] {
  const todo = db[id];
  todo.done = true;
  return [todo];
}

function deleteTodo(id: number): [] {
  const todo = db[id];
  if (todo) { delete db[id]; }
  return [];
}

export const resolver = {
  greeting: ({ name = 'world' }) =>  `Hello ${name}`,
  getTodo: ({ id }) =>  getTodo(id),
  listTodos: () => listTodos(),
  createTodo: ({ content }) => newTodo(content),
  completeTodo: ({ id }) => completeTodo(id),
  deleteTodo: ({ id }) => deleteTodo(id)
};
