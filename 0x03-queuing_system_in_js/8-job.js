// Job creation function

/**
 * Creates an array of jobs with a given type and data.
 *
 * @param {object[]} jobs - An array of objects with a phoneNumber and message property.
 * @param {object} queue - The kue queue object.
 * @throws {Error} If jobs is not an array.
 */
function createPushNotificationsJobs (jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (!err) {
          console.log(`Notification job created: ${job.id}`);
        }
      });

    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    }).on('failed', (err) => {
      console.log(`Notification job ${job.id} failed: ${err}`);
    }).on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  });
}

export default createPushNotificationsJobs;
