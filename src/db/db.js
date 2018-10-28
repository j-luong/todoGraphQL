const redis = require('redis');
const Promise = require('bluebird');
const client = redis.createClient(); // this creates a new DB

const setAsync = Promise.promisify(client.set, { context: client });
const getAsync = Promise.promisify(client.get, { context: client });
const delAsync = Promise.promisify(client.del, { context: client });

client.on('connect', () => {
  console.log('Redis DB connected');
});

client.on('error', (err) => {
  console.error('Something went wrong ', err);
});

module.exports = {
  setAsync,
  getAsync,
  delAsync
};
