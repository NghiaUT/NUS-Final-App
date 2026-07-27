import { Redis, type RedisOptions } from 'ioredis';
import { constant } from '../constant/constant.js';

const redisConfig: RedisOptions = {
  host: constant.REDIS_CLIENT_HOST,
  port: Number(constant.REDIS_CLIENT_PORT),
  maxRetriesPerRequest: null,
};

export const redisClient = new Redis(redisConfig);

redisClient.on('connect', () => console.log('====> Kết nối Redis thành công!'));

redisClient.on('error', (err) =>
  console.error('====> Redis Connection bị lỗi: ', err)
);
