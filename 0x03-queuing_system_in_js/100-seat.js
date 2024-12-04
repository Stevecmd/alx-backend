// Module dependencies
const redis = require('redis');
const { promisify } = require('util');

// Create client to Redis server
const client = redis.createClient();

// Promisify Redis client methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Express related dependencies
const express = require('express');
const kue = require('kue');
const queue = kue.createQueue();
const app = express();
const port = 1245;

// Reservation flag
let reservationEnabled = true;

/**
 * Reserve a seat
 * @param {number} number - The number of available seats
 */
async function reserveSeat (number) {
  await setAsync('available_seats', number);
}

/**
 * Get the current available seats
 * @return {Promise<number>} - The current available seats
 */
async function getCurrentAvailableSeats () {
  const seats = await getAsync('available_seats');
  return parseInt(seats, 10);
}

// API endpoint to get the current available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats });
});

// API endpoint to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  }).on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  });
});

// API endpoint to start the queue processing
app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const currentSeats = await getCurrentAvailableSeats();
    if (currentSeats > 0) {
      await reserveSeat(currentSeats - 1);
      if (currentSeats - 1 === 0) {
        reservationEnabled = false;
      }
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
});

// Start the server
app.listen(port, async () => {
  await reserveSeat(50);
  console.log(`Server is running on port ${port}`);
});
