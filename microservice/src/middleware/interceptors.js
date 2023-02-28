import context from 'express-http-context';
import { correlationId } from "../utils";

export const responseInterceptor = (_req, res, next) => {
    if (res.headersSent) return;
    res.set(correlationId, context.get('correlationId'));
    next();
}