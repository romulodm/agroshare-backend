const { createClient } = require('redis');
require('dotenv').config({ path: '.env' });

let redisClient = createClient({
  legacyMode: false,
  url: process.env.REDIS_URL
});

redisClient.connect()
  .then(() => { console.log("Connected to Redis!") })
  .catch(err => console.log('Redis connection error:', err));

module.exports = redisClient;
