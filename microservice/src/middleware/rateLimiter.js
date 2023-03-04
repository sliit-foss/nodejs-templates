import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import config from '../config';

const options = {
  windowMs: 1 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  max: 60,
  message: (_req, res) =>
    res.status(429).json({
      message: `Too many requests`,
    }),
};

if (config.REDIS_CONNECTION_STRING) {
  const { redis } = require('../database/redis').default;
  options.store = new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  });
}

export const defaultLimiter = rateLimit(options);
