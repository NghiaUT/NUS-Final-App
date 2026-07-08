import { Job, Queue, Worker } from 'bullmq';
import { redisClient } from '../redis/redis.config.js';
import transporter from '../mail/mailer.config.js';

export interface EmailJobData {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const EMAIL_QUEUE_NAME = 'email_queue';

export const emailQueue = new Queue<EmailJobData>(EMAIL_QUEUE_NAME, {
  connection: redisClient as any,
});

export const emailWorker = new Worker<EmailJobData>(
  EMAIL_QUEUE_NAME,
  async (job: Job<EmailJobData>) => {
    console.log(
      `[Email Worker] Processing the job ${job.id} send mail for ${job.data.to}`
    );

    const { from, to, subject, text, html } = job.data;

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
  },
  {
    connection: redisClient.duplicate() as any, // Tách riêng một luồng redis cho queue
    concurrency: 5, // Xử lý nhiều nhất 5 email đồng thời.
  }
);

// Lắng nghe sự kiện hệ thống:

emailWorker.on('completed', (job) => {
  console.log(
    `[Email Worker] Job ${job.id} sent successfully to ${job.data.to}`
  );
});

emailWorker.on('failed', (job, err) => {
  console.error(
    `[Email Worker] Job ${job?.id?.toString()} failed: ${err.message}`
  );
});
