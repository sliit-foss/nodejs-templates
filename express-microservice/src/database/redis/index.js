import Redis from 'ioredis';
import Redlock from 'redlock';
import { moduleLogger } from '@sliit-foss/module-logger';
import config from '../../config';

const logger = moduleLogger('Redis');

const redis = new Redis(config.REDIS_CONNECTION_STRING);

const redlock = new Redlock([redis]);

redis.on('connect', () => logger.info('Redis connected'));
redis.on('error', (err) => logger.error(`Redis error - message: ${err.message}`, err));

redis.set = (key, value, ttl) => redis.set(key, value, 'EX', ttl ?? 30);

export default { redis, redlock };
