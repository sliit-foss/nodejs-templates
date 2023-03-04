import os from 'os';
import context from 'express-http-context';
import { correlationId, hostName } from '../utils/constants';

export const responseInterceptor = (_req, res, next) => {
  if (res.headersSent) return;
  res.set(hostName, os.hostname());
  res.set(correlationId, context.get('correlationId'));
  next();
};
