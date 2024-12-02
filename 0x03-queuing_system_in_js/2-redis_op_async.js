// Connect to the Redis server and log appropriate
// messages based on the connection status
import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school in Redis
function setNewSchool (schoolName, value) {
  client.set(schoolName, value, print);
}

// Promisify the get function
const getAsync = promisify(client.get).bind(client);

// Function to display the value of a school from Redis using async/await
async function displaySchoolValue (schoolName) {
  try {
    const reply = await getAsync(schoolName);
    console.log(reply);
  } catch (err) {
    console.error(err);
  }
}

// Function calls
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
