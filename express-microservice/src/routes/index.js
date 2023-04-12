import fs from 'fs';
import express from 'express';

const router = express.Router();

// Register all modules

fs.readdirSync(`${__dirname}/../modules`)?.forEach((module) => {
  fs.readdirSync(`${__dirname}/../modules/${module}/api`)?.forEach((v) => {
    router.use(`/${v}/${module}`, require(`../modules/${module}/api/${v}/controller`).default);
  });
});

export default router;
