import { createClient } from 'redis';
import { Redis as UpstashRedis } from '@upstash/redis';
import logger from './logger';

type RedisValue = string | number | boolean | object | null;

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
}

const isProduction = process.env.NODE_ENV === 'production';

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
    const isUpstashTls = tcpUrl.startsWith('rediss://');
    const client = createClient({
      url: tcpUrl,
      socket: {
        tls: isUpstashTls,
        reconnectStrategy: (retries) => {
          const maxRetries = isProduction ? 10 : 3;
          if (retries > maxRetries) {
            if (isProduction) {
              logger.error('Redis: Too many reconnection attempts, giving up');
            } else {
              logger.warn('Redis: Connection unavailable, continuing without cache');
            }
            return new Error('Too many retries');
          }

          return Math.min(retries * 100, 3000);
        },
      },
    });

    client.on('error', (err) => {
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

  logger.warn('Redis: No credentials configured, running without cache');
  return {
    async get() {
      return null;
    },
    async set() {
      return null;
    },
    async setEx() {
      return null;
    },
    async del() {
      return 0;
    },
    async exists() {
      return 0;
    },
    async incr() {
      return 0;
    },
    async expire() {
      return 0;
    },
    async ping() {
      return null;
    },
    async quit() {
      return 'OK';
    },
  };
}

const redisClient = createRedisClient();

export default redisClient;

// Made with Bob
