import pino from 'pino';

export const logger = pino({
  name: 'bounty-snake',
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  prettyPrint: process.env.NODE_ENV !== 'production',
});
