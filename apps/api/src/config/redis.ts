import { createClient } from 'redis';
import { Redis as UpstashRedis } from '@upstash/redis';
import logger from './logger';

type RedisValue = string | number | boolean | object | null;

// Redis reconnection strategy constants
const MAX_RETRIES_PROD = 10;
const MAX_RETRIES_DEV = 3;
const BASE_RETRY_DELAY_MS = 100;
const MAX_RETRY_DELAY_MS = 3000;

export let isConnected = false;

interface RedisAdapter {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<string | null>;
  setEx(key: string, seconds: number, value: string): Promise<string | null>;
  del(key: string | string[]): Promise<number>;
  exists(key: string): Promise<number>;
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<number>;
  ping(): Promise<string | null>;
  quit(): Promise<string>;
  keys(pattern: string): Promise<string[]>;
  ttl(key: string): Promise<number>;
  flushDb(): Promise<string>;
  info(): Promise<string>;
  dbSize(): Promise<number>;
}

class TcpRedisAdapter implements RedisAdapter {
  constructor(private readonly client: any) {}

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<string | null> {
    return this.client.set(key, value);
  }

  async setEx(key: string, seconds: number, value: string): Promise<string | null> {
    return this.client.setEx(key, seconds, value);
  }

  async del(key: string | string[]): Promise<number> {
    return this.client.del(key);
  }

  async exists(key: string): Promise<number> {
    return this.client.exists(key);
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async expire(key: string, seconds: number): Promise<number> {
    const result = await this.client.expire(key, seconds);
    return result ? 1 : 0;
  }

  async ping(): Promise<string | null> {
    return this.client.ping();
  }

  async quit(): Promise<string> {
    return this.client.quit();
  }

  async keys(pattern: string): Promise<string[]> {
    return this.client.keys(pattern);
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async flushDb(): Promise<string> {
    await this.client.flushDb();
    return 'OK';
  }

  async info(): Promise<string> {
    return this.client.info();
  }

  async dbSize(): Promise<number> {
    return this.client.dbSize();
  }
}

class UpstashRedisAdapter implements RedisAdapter {
  constructor(private readonly client: UpstashRedis) {}

  async get(key: string): Promise<string | null> {
    const value = await this.client.get<RedisValue>(key);
    return value === null || value === undefined ? null : typeof value === 'string' ? value : JSON.stringify(value);
  }

  async set(key: string, value: string): Promise<string | null> {
    await this.client.set(key, value);
    return 'OK';
  }

  async setEx(key: string, seconds: number, value: string): Promise<string | null> {
    await this.client.set(key, value, { ex: seconds });
    return 'OK';
  }

  async del(key: string | string[]): Promise<number> {
    return this.client.del(key as any);
  }

  async exists(key: string): Promise<number> {
    return this.client.exists(key);
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async expire(key: string, seconds: number): Promise<number> {
    const result = await this.client.expire(key, seconds);
    return result ? 1 : 0;
  }

  async ping(): Promise<string | null> {
    const response = await this.client.ping();
    return typeof response === 'string' ? response : 'PONG';
  }

  async quit(): Promise<string> {
    return 'OK';
  }

  async keys(pattern: string): Promise<string[]> {
    return this.client.keys(pattern) as Promise<string[]>;
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async flushDb(): Promise<string> {
    await this.client.flushdb();
    return 'OK';
  }

  async info(): Promise<string> {
    return 'Upstash Redis (info not available)';
  }

  async dbSize(): Promise<number> {
    return this.client.dbsize();
  }
}

class NoOpRedisAdapter implements RedisAdapter {
  async get(): Promise<string | null> {
    return null;
  }

  async set(): Promise<string | null> {
    return null;
  }

  async setEx(): Promise<string | null> {
    return null;
  }

  async del(): Promise<number> {
    return 0;
  }

  async exists(): Promise<number> {
    return 0;
  }

  async incr(): Promise<number> {
    return 0;
  }

  async expire(): Promise<number> {
    return 0;
  }

  async ping(): Promise<string | null> {
    return null;
  }

  async quit(): Promise<string> {
    return 'OK';
  }

  async keys(): Promise<string[]> {
    return [];
  }

  async ttl(): Promise<number> {
    return -1;
  }

  async flushDb(): Promise<string> {
    return 'OK';
  }

  async info(): Promise<string> {
    return 'No Redis connection';
  }

  async dbSize(): Promise<number> {
    return 0;
  }
}

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Creates a reconnection strategy for Redis TCP connections
 */
function createReconnectStrategy(isProduction: boolean) {
  const maxRetries = isProduction ? MAX_RETRIES_PROD : MAX_RETRIES_DEV;

  return (retries: number) => {
    if (retries > maxRetries) {
      if (isProduction) {
        logger.error('Redis: Too many reconnection attempts, giving up');
      } else {
        logger.warn('Redis: Connection unavailable, continuing without cache');
      }
      return new Error('Too many retries');
    }

    return Math.min(retries * BASE_RETRY_DELAY_MS, MAX_RETRY_DELAY_MS);
  };
}

/**
 * Sets up event handlers for Redis TCP client
 */
function setupRedisEventHandlers(client: any, isProduction: boolean): void {
  client.on('error', (err: Error) => {
    if (isProduction || isConnected) {
      logger.error('Redis Client Error:', err);
    }
  });

  client.on('connect', () => {
    isConnected = true;
    logger.info('Redis: Connected successfully');
  });

  client.on('reconnecting', () => {
    if (isProduction || isConnected) {
      logger.warn('Redis: Reconnecting...');
    }
  });

  client.on('ready', () => {
    logger.info('Redis: Ready to accept commands');
  });
}

/**
 * Creates a TCP Redis client with proper configuration and event handlers
 */
function createTcpRedisClient(tcpUrl: string): RedisAdapter {
  const isUpstashTls = tcpUrl.startsWith('rediss://');
  const client = createClient({
    url: tcpUrl,
    socket: {
      tls: isUpstashTls,
      reconnectStrategy: createReconnectStrategy(isProduction),
    },
  });

  setupRedisEventHandlers(client, isProduction);

  // IIFE is necessary because this function is called at module level (synchronous context)
  // but client.connect() is async. We handle the connection asynchronously without blocking.
  (async () => {
    try {
      await client.connect();
    } catch (error) {
      if (isProduction) {
        logger.error('Redis: Failed to connect:', error);
      } else {
        logger.warn('Redis: Not available, running without cache (this is normal in development)');
      }
    }
  })();

  return new TcpRedisAdapter(client);
}

/**
 * Creates and configures a Redis client adapter based on available credentials
 * Supports Upstash REST, TCP Redis, or falls back to a no-op adapter
 */
function createRedisClient(): RedisAdapter {
  const tcpUrl = process.env.REDIS_URL?.trim();
  const restUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (restUrl && restToken) {
    logger.info(`Redis: Using Upstash REST credentials (${restUrl})`);
    isConnected = true;
    return new UpstashRedisAdapter(
      new UpstashRedis({
        url: restUrl,
        token: restToken,
      })
    );
  }

  if (tcpUrl) {
    return createTcpRedisClient(tcpUrl);
  }

  logger.warn('Redis: No credentials configured, running without cache');
  return new NoOpRedisAdapter();
}

const redisClient = createRedisClient();

export default redisClient;

// 
