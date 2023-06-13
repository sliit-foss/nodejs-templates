import Redis from 'ioredis';
import Redlock from 'redlock';
import { moduleLogger } from '@sliit-foss/module-logger';
import config from '../../config';

const logger = moduleLogger('Redis');

export const redis = new Redis(config.REDIS_CONNECTION_STRING);

export const redlock = new Redlock([redis]);

redis.on('connect', () => logger.info('Redis connected'));
redis.on('error', (err) => logger.error(`Redis error - message: ${err.message}`, err));

redis.setKey = redis.set;

redis.set = (key, value, ttl) => redis.setKey(key, value, 'EX', ttl ?? 30);

redis.getOrDefault = async (key, defaultValue) => {
    let res = await redis.get(key);
    if (res) return JSON.parse(res);
    res = typeof defaultValue === 'function' ? await defaultValue() : defaultValue;
    if (res) redis.set(key, JSON.stringify(res));
    return res;
};

export default { redis, redlock };
