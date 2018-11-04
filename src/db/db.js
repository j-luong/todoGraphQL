const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const delAsync = promisify(client.del).bind(client);
const scanAsync = promisify(client.scan).bind(client);

client.on('connect', () => {
  console.log('Redis DB connected');
  // client.flushdb();
  // console.log('Cleaned DB');
});

client.on('error', (err) => {
  console.error('Something went wrong:', err);
});

const getKeys = async (cursor, count = []) => {
  const items = await scanAsync(cursor);
  count = count.concat(items[1]);

  if (items[0] === '0') return count;
  return getKeys(parseInt(items[0], 10), count);
}

const listItems = async () => {
  const keys = await getKeys(0);
  const res = keys.reduce(async (acc, key) => {
    const accumulator = await acc;
    accumulator[key] = await getAsync(key);
    return accumulator;
  }, {});

  return res;
}

module.exports = {
  setAsync,
  getAsync,
  delAsync,
  listItems
};
