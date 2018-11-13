import * as redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const scanAsync = promisify(client.scan).bind(client);

async function getKeys(cursor: number, count = []): Promise<any> {
  const items = await scanAsync(cursor);
  count = count.concat(items[1]);

  if (items[0] === '0') return count;
  return getKeys(parseInt(items[0], 10), count);
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

client.on('connect', () => {
  console.log('Redis DB connected');
});

client.on('error', (err) => {
  console.error('Something went wrong:', err);
});

export const redisDB = {
  createItem: async () => promisify(client.set).bind(client),
  getItem: async () => promisify(client.get).bind(client),
  listItems: async () => listItems(),
  deleteItem: async () => promisify(client.del).bind(client)
}
