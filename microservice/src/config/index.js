import { Joi } from 'celebrate';

class Base {
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      REDIS_CONNECTION_STRING: Joi.string().optional(),
    };
  }
  static get values() {
    return {
      PORT: process.env.PORT ?? 8080,
      REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING,
    };
  }
}

const config = Base.values;

Joi.validate(config, Base.schema, (err) => {
  if (err) throw new Error(`Environment validation failed. \nDetails - ${JSON.stringify(err.details ?? err)}`);
});

export default config;