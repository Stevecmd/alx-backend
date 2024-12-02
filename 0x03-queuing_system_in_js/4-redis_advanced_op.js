// Connects to the Redis server and logs appropriate messages
// based on the connection status.

import { createClient, print } from 'redis';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Create Hash
client.hset('cache', 'Portland', 50, print);
client.hset('cache', 'Seattle', 80, print);
client.hset('cache', 'New York', 20, print);
client.hset('cache', 'Bogota', 20, print);
client.hset('cache', 'Cali', 40, print);
client.hset('cache', 'Paris', 2, print);

// Display Hash
client.hgetall('cache', (err, reply) => {
  if (err) {
    console.error(err);
  } else {
    console.log(reply);
  }
});
