import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { response } from '../../../../utils';

const system = express.Router();

system.get(
  '/health',
  tracedAsyncHandler(function healthCheck(_req, res) {
    return response({ res, message: 'Server up and running!' });
  }),
);

export default system;
