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

export const resolver = {
  greeting: ({ name = 'world' }) =>  `Hello ${name}`,
  getTodo: ({ id }) =>  getTodo(id)
};
