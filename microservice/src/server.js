import crypto from 'crypto';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import context from 'express-http-context';
import polyglot from "node-polyglot";
import clusterize from '@sliit-foss/clusterizer';
import { correlationId } from "./utils";
import { moduleLogger } from '@sliit-foss/module-logger';
import { defaultLimiter as rateLimiter, errorHandler, responseInterceptor } from './middleware';
import { default as translations } from './locales';
import config from './config';
import routes from './routes';

const logger = moduleLogger('Server');

clusterize(
  () => {
    const app = express();

    app.use(helmet());
    app.use(compression());
    app.use(cors());

    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true }));

    app.use(context.middleware);

    app.use((req, _res, next) => {
      context.set('correlationId', req.headers[correlationId] ?? crypto.randomUUID());
      next();
    });

    app.use((req, res, next) => {
      const locale = req.headers["accept-language"] ?? "en";
      res.polyglot = new polyglot({ allowMissing: true, onMissingKey: (key) => key });
      if (translations[locale]) res.polyglot.extend(translations[locale]);
      context.set('locale', locale) && context.set('translate', res.polyglot.t)
      next();
    })

    app.use(`/api/service-name`, rateLimiter, routes);

    app.use(responseInterceptor);

    app.use(errorHandler)

    app.listen(config.PORT, config.HOST, () => {
      logger.info(`Service listening on ${config.HOST}:${config.PORT}`);
    });
  },
  { logger },
);