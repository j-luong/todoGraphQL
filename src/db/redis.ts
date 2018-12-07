import * as redis from 'redis';
import { promisify } from 'util';
import { createTodo, Todo } from '../models/todo';
import { DB } from '../models/db';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis DB connected');
});

client.on('error', (err) => {
  console.error('Something went wrong:', err);
});

const getAsync = promisify(client.get).bind(client);
const scanAsync = promisify(client.scan).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

async function getKeys(cursor: number, count = []): Promise<number[]> {
  const items = await scanAsync(cursor);
  count = count.concat(items[1]);
  
  if (items[0] === '0') {
    return count;
  };
  return getKeys(parseInt(items[0], 10), count);
}

async function getItem(id: number): Promise<Todo> {
  const todo = await getAsync(id.toString());
  return JSON.parse(todo);
};

async function createItem(content: string): Promise<Todo> {
  const keys = await getKeys(0);
  const id = keys.length + 1;
  const todo = createTodo(id, content);
  await setAsync(id.toString(), JSON.stringify(todo));
  return todo;
}

async function listItems(): Promise<Todo[]> {
  const keys = await getKeys(0);
  const pendingTodos = keys.map(async (key) => {
    const todo = await getAsync(key);
    return JSON.parse(todo);
  });
  const todos = await Promise.all(pendingTodos);

  return todos;
}

async function updateItem(id: number, todo: object): Promise<Todo> {
  return setAsync(id, JSON.stringify(todo));
}

async function deleteItem(id: number): Promise<boolean> {
  return delAsync(id);
}

export const redisDB: DB = {
  createItem: async (content) => createItem(content),
  getItem: async (id) => getItem(id),
  listItems: async () => listItems(),
  updateItem: async (id, content) => updateItem(id, content),
  deleteItem: async (id) => deleteItem(id)
}
