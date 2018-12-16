import { redisDB } from '../db/redis';
import { ResolverTodo } from './todo';

const Resolver = new ResolverTodo(redisDB);

export const resolver = {
  greeting: ({ name = 'world' }) => `Hello ${name}`,
  getTodo: async ({ id }) => Resolver.getTodo(id),
  listTodos: async () => Resolver.listTodos(),
  createTodo: async ({ content }) => Resolver.createTodo(content),
  completeTodo: async ({ id }) => Resolver.completeTodo(id),
  deleteTodo: async ({ id }) => Resolver.deleteTodo(id)
};
