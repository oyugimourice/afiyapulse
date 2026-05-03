import redisClient, { isConnected } from '../config/redis';
import logger from '../config/logger';

/**
 * Cache Service
 * 
 * Provides intelligent caching strategies for ClinicalCopilot data:
 * - Patient data caching with automatic invalidation
 * - Consultation data caching for quick retrieval
 * - Drug database caching for prescription validation
 * - FHIR resource caching for referral generation
 * - Session data caching for authentication
 * - Rate limiting data storage
 */

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  prefix?: string; // Key prefix for namespacing
}

export enum CachePrefix {
  PATIENT = 'patient',
  CONSULTATION = 'consultation',
  DRUG = 'drug',
  FHIR = 'fhir',
  SESSION = 'session',
  RATE_LIMIT = 'rate_limit',
  SOAP_NOTE = 'soap_note',
  PRESCRIPTION = 'prescription',
  REFERRAL = 'referral',
  APPOINTMENT = 'appointment',
}

export enum CacheTTL {
  SHORT = 300, // 5 minutes
  MEDIUM = 1800, // 30 minutes
  LONG = 3600, // 1 hour
  VERY_LONG = 86400, // 24 hours
  SESSION = 604800, // 7 days
}

class CacheService {
  /**
   * Generate a cache key with prefix
   */
  private generateKey(prefix: string, key: string): string {
    return `${prefix}:${key}`;
  }

  /**
   * Set a value in cache
   */
  async set(
    key: string,
    value: any,
    options: CacheOptions = {}
  ): Promise<void> {
    if (!isConnected) {
      return; // Silently skip if Redis is not connected
    }
    
    try {
      const { ttl = CacheTTL.MEDIUM, prefix = '' } = options;
      const cacheKey = prefix ? this.generateKey(prefix, key) : key;
      const serializedValue = JSON.stringify(value);

      if (ttl > 0) {
        await redisClient.setEx(cacheKey, ttl, serializedValue);
      } else {
        await redisClient.set(cacheKey, serializedValue);
      }

      logger.debug(`Cache SET: ${cacheKey} (TTL: ${ttl}s)`);
    } catch (error) {
      logger.error('Cache SET error:', error);
      // Don't throw - cache failures shouldn't break the application
    }
  }

  /**
   * Get a value from cache
   */
  async get<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
    if (!isConnected) {
      return null; // Return null if Redis is not connected
    }
    
    try {
      const { prefix = '' } = options;
      const cacheKey = prefix ? this.generateKey(prefix, key) : key;
      const value = await redisClient.get(cacheKey);

      if (!value) {
        logger.debug(`Cache MISS: ${cacheKey}`);
        return null;
      }

      logger.debug(`Cache HIT: ${cacheKey}`);
      return JSON.parse(value) as T;
    } catch (error) {
      logger.error('Cache GET error:', error);
      return null;
    }
  }

  /**
   * Delete a value from cache
   */
  async delete(key: string, options: CacheOptions = {}): Promise<void> {
    if (!isConnected) {
      return; // Silently skip if Redis is not connected
    }
    
    try {
      const { prefix = '' } = options;
      const cacheKey = prefix ? this.generateKey(prefix, key) : key;
      await redisClient.del(cacheKey);
      logger.debug(`Cache DELETE: ${cacheKey}`);
    } catch (error) {
      logger.error('Cache DELETE error:', error);
    }
  }

  /**
   * Delete multiple keys matching a pattern
   */
  async deletePattern(pattern: string): Promise<void> {
    if (!isConnected) {
      return; // Silently skip if Redis is not connected
    }
    
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
        logger.debug(`Cache DELETE PATTERN: ${pattern} (${keys.length} keys)`);
      }
    } catch (error) {
      logger.error('Cache DELETE PATTERN error:', error);
    }
  }

  /**
   * Check if a key exists in cache
   */
  async exists(key: string, options: CacheOptions = {}): Promise<boolean> {
    if (!isConnected) {
      return false; // Return false if Redis is not connected
    }
    
    try {
      const { prefix = '' } = options;
      const cacheKey = prefix ? this.generateKey(prefix, key) : key;
      const exists = await redisClient.exists(cacheKey);
      return exists === 1;
    } catch (error) {
      logger.error('Cache EXISTS error:', error);
      return false;
    }
  }

  /**
   * Get or set a value (cache-aside pattern)
   */
  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.get<T>(key, options);
    if (cached !== null) {
      return cached;
    }

    // If not in cache, fetch and store
    const value = await fetchFn();
    await this.set(key, value, options);
    return value;
  }

  /**
   * Increment a counter (useful for rate limiting)
   */
  async increment(
    key: string,
    options: CacheOptions = {}
  ): Promise<number> {
    if (!isConnected) {
      return 0; // Return 0 if Redis is not connected (effectively no rate limiting)
    }
    
    try {
      const { ttl = CacheTTL.SHORT, prefix = '' } = options;
      const cacheKey = prefix ? this.generateKey(prefix, key) : key;
      
      const value = await redisClient.incr(cacheKey);
      
      // Set expiry on first increment
      if (value === 1 && ttl > 0) {
        await redisClient.expire(cacheKey, ttl);
      }

      return value;
    } catch (error) {
      logger.error('Cache INCREMENT error:', error);
      return 0;
    }
  }

  /**
   * Get TTL (time to live) for a key
   */
  async getTTL(key: string, options: CacheOptions = {}): Promise<number> {
    if (!isConnected) {
      return -1; // Return -1 if Redis is not connected
    }
    
    try {
      const { prefix = '' } = options;
      const cacheKey = prefix ? this.generateKey(prefix, key) : key;
      return await redisClient.ttl(cacheKey);
    } catch (error) {
      logger.error('Cache TTL error:', error);
      return -1;
    }
  }

  /**
   * Set expiry for a key
   */
  async expire(
    key: string,
    ttl: number,
    options: CacheOptions = {}
  ): Promise<void> {
    if (!isConnected) {
      return; // Silently skip if Redis is not connected
    }
    
    try {
      const { prefix = '' } = options;
      const cacheKey = prefix ? this.generateKey(prefix, key) : key;
      await redisClient.expire(cacheKey, ttl);
      logger.debug(`Cache EXPIRE: ${cacheKey} (TTL: ${ttl}s)`);
    } catch (error) {
      logger.error('Cache EXPIRE error:', error);
    }
  }

  // ==================== Domain-Specific Methods ====================

  /**
   * Cache patient data
   */
  async cachePatient(patientId: string, data: any): Promise<void> {
    await this.set(patientId, data, {
      prefix: CachePrefix.PATIENT,
      ttl: CacheTTL.LONG,
    });
  }

  /**
   * Get cached patient data
   */
  async getPatient<T>(patientId: string): Promise<T | null> {
    return this.get<T>(patientId, { prefix: CachePrefix.PATIENT });
  }

  /**
   * Invalidate patient cache
   */
  async invalidatePatient(patientId: string): Promise<void> {
    await this.delete(patientId, { prefix: CachePrefix.PATIENT });
  }

  /**
   * Cache consultation data
   */
  async cacheConsultation(consultationId: string, data: any): Promise<void> {
    await this.set(consultationId, data, {
      prefix: CachePrefix.CONSULTATION,
      ttl: CacheTTL.MEDIUM,
    });
  }

  /**
   * Get cached consultation data
   */
  async getConsultation<T>(consultationId: string): Promise<T | null> {
    return this.get<T>(consultationId, { prefix: CachePrefix.CONSULTATION });
  }

  /**
   * Invalidate consultation cache
   */
  async invalidateConsultation(consultationId: string): Promise<void> {
    await this.delete(consultationId, { prefix: CachePrefix.CONSULTATION });
  }

  /**
   * Cache drug information
   */
  async cacheDrug(drugName: string, data: any): Promise<void> {
    await this.set(drugName.toLowerCase(), data, {
      prefix: CachePrefix.DRUG,
      ttl: CacheTTL.VERY_LONG, // Drug data rarely changes
    });
  }

  /**
   * Get cached drug information
   */
  async getDrug<T>(drugName: string): Promise<T | null> {
    return this.get<T>(drugName.toLowerCase(), { prefix: CachePrefix.DRUG });
  }

  /**
   * Cache FHIR resource
   */
  async cacheFHIRResource(
    resourceType: string,
    resourceId: string,
    data: any
  ): Promise<void> {
    const key = `${resourceType}:${resourceId}`;
    await this.set(key, data, {
      prefix: CachePrefix.FHIR,
      ttl: CacheTTL.LONG,
    });
  }

  /**
   * Get cached FHIR resource
   */
  async getFHIRResource<T>(
    resourceType: string,
    resourceId: string
  ): Promise<T | null> {
    const key = `${resourceType}:${resourceId}`;
    return this.get<T>(key, { prefix: CachePrefix.FHIR });
  }

  /**
   * Invalidate FHIR resource cache
   */
  async invalidateFHIRResource(
    resourceType: string,
    resourceId: string
  ): Promise<void> {
    const key = `${resourceType}:${resourceId}`;
    await this.delete(key, { prefix: CachePrefix.FHIR });
  }

  /**
   * Cache session data
   */
  async cacheSession(sessionId: string, data: any): Promise<void> {
    await this.set(sessionId, data, {
      prefix: CachePrefix.SESSION,
      ttl: CacheTTL.SESSION,
    });
  }

  /**
   * Get cached session data
   */
  async getSession<T>(sessionId: string): Promise<T | null> {
    return this.get<T>(sessionId, { prefix: CachePrefix.SESSION });
  }

  /**
   * Invalidate session
   */
  async invalidateSession(sessionId: string): Promise<void> {
    await this.delete(sessionId, { prefix: CachePrefix.SESSION });
  }

  /**
   * Invalidate all sessions for a user
   */
  async invalidateUserSessions(userId: string): Promise<void> {
    await this.deletePattern(`${CachePrefix.SESSION}:*:${userId}`);
  }

  /**
   * Rate limiting: Check and increment request count
   */
  async checkRateLimit(
    identifier: string,
    limit: number,
    windowSeconds: number
  ): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
    const key = `${identifier}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;
    const count = await this.increment(key, {
      prefix: CachePrefix.RATE_LIMIT,
      ttl: windowSeconds,
    });

    const allowed = count <= limit;
    const remaining = Math.max(0, limit - count);
    const resetAt = new Date(
      (Math.floor(Date.now() / 1000 / windowSeconds) + 1) * windowSeconds * 1000
    );

    return { allowed, remaining, resetAt };
  }

  /**
   * Cache SOAP note
   */
  async cacheSOAPNote(consultationId: string, data: any): Promise<void> {
    await this.set(consultationId, data, {
      prefix: CachePrefix.SOAP_NOTE,
      ttl: CacheTTL.MEDIUM,
    });
  }

  /**
   * Get cached SOAP note
   */
  async getSOAPNote<T>(consultationId: string): Promise<T | null> {
    return this.get<T>(consultationId, { prefix: CachePrefix.SOAP_NOTE });
  }

  /**
   * Cache prescription
   */
  async cachePrescription(prescriptionId: string, data: any): Promise<void> {
    await this.set(prescriptionId, data, {
      prefix: CachePrefix.PRESCRIPTION,
      ttl: CacheTTL.LONG,
    });
  }

  /**
   * Get cached prescription
   */
  async getPrescription<T>(prescriptionId: string): Promise<T | null> {
    return this.get<T>(prescriptionId, { prefix: CachePrefix.PRESCRIPTION });
  }

  /**
   * Cache referral
   */
  async cacheReferral(referralId: string, data: any): Promise<void> {
    await this.set(referralId, data, {
      prefix: CachePrefix.REFERRAL,
      ttl: CacheTTL.LONG,
    });
  }

  /**
   * Get cached referral
   */
  async getReferral<T>(referralId: string): Promise<T | null> {
    return this.get<T>(referralId, { prefix: CachePrefix.REFERRAL });
  }

  /**
   * Cache appointment
   */
  async cacheAppointment(appointmentId: string, data: any): Promise<void> {
    await this.set(appointmentId, data, {
      prefix: CachePrefix.APPOINTMENT,
      ttl: CacheTTL.MEDIUM,
    });
  }

  /**
   * Get cached appointment
   */
  async getAppointment<T>(appointmentId: string): Promise<T | null> {
    return this.get<T>(appointmentId, { prefix: CachePrefix.APPOINTMENT });
  }

  /**
   * Invalidate appointment cache
   */
  async invalidateAppointment(appointmentId: string): Promise<void> {
    await this.delete(appointmentId, { prefix: CachePrefix.APPOINTMENT });
  }

  /**
   * Clear all cache (use with caution)
   */
  async clearAll(): Promise<void> {
    if (!isConnected) {
      logger.warn('Cache: Cannot clear - Redis not connected');
      return;
    }
    
    try {
      await redisClient.flushDb();
      logger.warn('Cache: All keys cleared');
    } catch (error) {
      logger.error('Cache CLEAR ALL error:', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{
    totalKeys: number;
    memoryUsed: string;
    hitRate: string;
  }> {
    if (!isConnected) {
      return {
        totalKeys: 0,
        memoryUsed: 'N/A (Redis not connected)',
        hitRate: 'N/A',
      };
    }
    
    try {
      const info = await redisClient.info('stats');
      const dbSize = await redisClient.dbSize();

      // Parse info string for stats
      const stats = info.split('\r\n').reduce((acc, line) => {
        const [key, value] = line.split(':');
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);

      const hits = parseInt(stats.keyspace_hits || '0');
      const misses = parseInt(stats.keyspace_misses || '0');
      const total = hits + misses;
      const hitRate = total > 0 ? ((hits / total) * 100).toFixed(2) : '0.00';

      return {
        totalKeys: dbSize,
        memoryUsed: stats.used_memory_human || 'N/A',
        hitRate: `${hitRate}%`,
      };
    } catch (error) {
      logger.error('Cache STATS error:', error);
      return {
        totalKeys: 0,
        memoryUsed: 'N/A',
        hitRate: 'N/A',
      };
    }
  }
}

export default new CacheService();

// Made with Bob