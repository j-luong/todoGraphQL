import * as redis from 'redis';
import { promisify } from 'util';
import { createTodo, Todo } from '../models/todo';

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

async function getKeys(cursor: number, count = []): Promise<any> {
  const items = await scanAsync(cursor);
  count = count.concat(items[1]);
  
  if (items[0] === '0') return count;
  return getKeys(parseInt(items[0], 10), count);
}

async function getItem(id: number): Promise<Todo> {
  return getAsync(id.toString());
};

async function createItem(content: string): Promise<Todo> {
  const keys = await getKeys(0);
  const id = keys.length + 1;
  const todo = createTodo(id, content);
  return setAsync(id.toString(), todo);
}

async function listItems(): Promise<any> {
  const keys = await getKeys(0);
  const res = keys.reduce(async (acc, key) => {
    const accumulator = await acc;
    accumulator[key] = await getAsync(key);
    return accumulator;
  }, {});

  return res;
}

async function updateItem(id: number, content: string): Promise<Todo> {
  return setAsync(id, content);
}

async function deleteItem(id: number): Promise<any> {
  return delAsync(id);
}

export const redisDB = {
  createItem: async (content) => createItem(content),
  getItem: async (id) => getItem(id),
  listItems: async () => listItems(),
  updateItem: async (id, content) => updateItem(id, content),
  deleteItem: async (id) => deleteItem(id)
}
