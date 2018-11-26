import { redisDB } from '../db/redis';
import { ResolverTodo } from './todo';

const Resolver = new ResolverTodo(redisDB);

export const resolver = {
  greeting: ({ name = 'world' }) => `Hello ${name}`,
  getTodo: ({ id }) => Resolver.getTodo(id),
  listTodos: () => Resolver.listTodos(),
  createTodo: ({ content }) => Resolver.createTodo(content),
  completeTodo: ({ id }) => Resolver.completeTodo(id),
  deleteTodo: ({ id }) => Resolver.deleteTodo(id)
};
