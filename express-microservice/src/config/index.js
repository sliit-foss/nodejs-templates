import { Joi } from 'celebrate';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Config');

class Base {
  static get schema() {
    return {
      HOST: Joi.string().optional(),
      PORT: Joi.number().optional(),
      REDIS_CONNECTION_STRING: Joi.string().optional(),
      DB_URL: Joi.string().optional(),
    };
  }
  static get values() {
    return {
      HOST: process.env.HOST ?? 'localhost',
      PORT: process.env.PORT ?? 8080,
      REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING,
      DB_URL: process.env.DB_URL,
    };
  }
}

const config = Base.values;

const { error } = Joi.object(Base.schema).validate(config);

if (error) {
  logger.error(`Environment validation failed. \nDetails - ${error.details[0].message}\nExiting...`);
  process.exit(1);
}

export default config;
