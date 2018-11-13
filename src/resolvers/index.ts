import { redisDB } from '../db/redis';
import { inMemoryDB } from '../db/inmemory';
import { ResolverTodo } from './todo';

// const db = {};

// ((): void => {
//   const todos = ['Finish todoGQL', 'Complete OKRs', 'Learn l programming'];

//   todos.forEach((content, index) => {
//     const id = index + 1;
//     const newTodo = {
//       id,
//       content,
//       done: false
//     };
//     db[id] = newTodo;
//   });
// })();

console.log('TCL: inMemoryDB', inMemoryDB);
const Resolver = new ResolverTodo(inMemoryDB);

export const resolver = {
  greeting: ({ name = 'world' }) => `Hello ${name}`,
  getTodo: ({ id }) =>  Resolver.getTodo(id),
  listTodos: () => Resolver.listTodos(),
  createTodo: ({ content }) => Resolver.createTodo(content),
  completeTodo: ({ id }) => Resolver.completeTodo(id),
  deleteTodo: ({ id }) => Resolver.deleteTodo(id)
};
