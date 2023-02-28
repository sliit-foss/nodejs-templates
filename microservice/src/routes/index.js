import express from 'express';
import systemRoutes from '../modules/system';

const router = express.Router();

router.use('/system', systemRoutes);

export default router;