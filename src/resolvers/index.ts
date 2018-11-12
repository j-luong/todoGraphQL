import { ResolverTodo } from './todo';

const db = {};

((): void => {
  const todos = ['Finish todoGQL', 'Complete OKRs', 'Learn l programming'];

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

const Resolver = new ResolverTodo(db);


export const resolver = {
  greeting: ({ name = 'world' }) =>  `Hello ${name}`,
  getTodo: ({ id }) =>  Resolver.getTodo(id),
  listTodos: () => Resolver.listTodos(),
  createTodo: ({ content }) => Resolver.createTodo(content),
  completeTodo: ({ id }) => Resolver.completeTodo(id),
  deleteTodo: ({ id }) => Resolver.deleteTodo(id)
};
