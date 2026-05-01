import { createClient } from 'redis';
import logger from './logger';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        logger.error('Redis: Too many reconnection attempts, giving up');
        return new Error('Too many retries');
      }
      const delay = Math.min(retries * 100, 3000);
      logger.warn(`Redis: Reconnecting in ${delay}ms (attempt ${retries})`);
      return delay;
    },
  },
});

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  logger.info('Redis: Connected successfully');
});

redisClient.on('reconnecting', () => {
  logger.warn('Redis: Reconnecting...');
});

redisClient.on('ready', () => {
  logger.info('Redis: Ready to accept commands');
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.error('Redis: Failed to connect:', error);
  }
})();

export default redisClient;

// Made with Bob
