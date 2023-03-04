import mongoose from 'mongoose';
import { moduleLogger } from '@sliit-foss/module-logger';
import config from '../../config';

const logger = moduleLogger('Database-Connector');

export const connectDatabase = () => {
  try {
    mongoose.connect(config.DB_URL, {
      keepAlive: true,
      socketTimeoutMS: 30000,
    });
    logger.info(`Connected to database successfully`);
  } catch (err) {
    logger.error(`Failed to connect to the database | message: ${err.message}`);
  }

  mongoose.connection.on('error', (err) => logger.error(`Database error - message: ${err.message} - error: ${err.message}`));

  mongoose.connection.on('disconnected', () => logger.error(`Database disconnected`));

  mongoose.connection.on('reconnected', () => logger.info(`Database reconnected`));

  process.on('exit', () => mongoose.disconnect());
};
