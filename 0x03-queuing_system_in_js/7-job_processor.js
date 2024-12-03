// Create the Job processor
import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Create a blacklisted numbers array
const blacklistedNumbers = [
  '4153518780',
  '4153518781'
];

/**
   * Send a notification to the user with a given phone number and message.
   *
   * @param {string} phoneNumber - The phone number of the user to send the notification to.
   * @param {string} message - The message to send to the user.
   * @param {Object} job - The job object from kue.
   * @param {function} done - The callback function to call when the job is complete.
   */
function sendNotification (phoneNumber, message, job, done) {
  job.progress(0, 100);

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Send the notification
  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done();
}

// Process the job
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
