import * as winston from 'winston';
import { Logger } from './types';

const logFormat = winston.format.printf(({ level, message, meta }) => {
  const stack = meta && meta.stack ? meta.stack : undefined;

  return JSON.stringify({
    '@timestamp': new Date().toISOString(),
    '@version': 1,
    environment: process.env.NODE_ENV,
    host: process.env.HOST,
    message,
    stack,
    severity: level,
    type: 'stdin',
  });
});

export const createLogger = (level: string = 'debug'): Logger =>
  winston.createLogger({
    level,
    format: winston.format.combine(winston.format.splat(), logFormat),
    transports: [new winston.transports.Console()],
  });
