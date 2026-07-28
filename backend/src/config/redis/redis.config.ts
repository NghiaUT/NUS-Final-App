import { Redis, type RedisOptions } from 'ioredis';
import { constant } from '../constant/constant.js';

const redisOptions: RedisOptions = {
  maxRetriesPerRequest: null,
};

export const redisClient = new Redis(constant.REDIS_CLIENT_URL, redisOptions);

redisClient.on('connect', () => console.log('====> Kết nối Redis thành công!'));

redisClient.on('error', (err) =>
  console.error('====> Redis Connection bị lỗi: ', err)
);
