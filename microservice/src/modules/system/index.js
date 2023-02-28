import express from 'express';
import routes from './api/v1/controller';

const router = express.Router();

router.use(`/`, routes);

export default router;