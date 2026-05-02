import { Request, Response, NextFunction } from 'express';
import auditService, { AuditAction } from '../services/audit.service';
import logger from '../config/logger';

/**
 * Extract IP address from request
 */
function getIpAddress(req: Request): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

/**
 * Extract user agent from request
 */
function getUserAgent(req: Request): string {
  return req.headers['user-agent'] || 'unknown';
}

/**
 * Middleware to audit HTTP requests
 */
export const auditMiddleware = (action: AuditAction, resourceType: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Store original send function
    const originalSend = res.send;

    // Override send to capture response
    res.send = function (data: any) {
      // Only log successful requests (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const userId = (req as any).user?.id || 'anonymous';
        const resourceId = req.params.id || req.body?.id || 'unknown';
        const ipAddress = getIpAddress(req);
        const userAgent = getUserAgent(req);

        // Log audit event asynchronously (don't wait)
        auditService.log({
          userId,
          action,
          resourceType,
          resourceId,
          metadata: {
            method: req.method,
            path: req.path,
            query: req.query,
            statusCode: res.statusCode,
          },
          ipAddress,
          userAgent,
        }).catch(error => {
          logger.error('[Audit Middleware] Failed to log audit event:', error);
        });
      }

      // Call original send
      return originalSend.call(this, data);
    };

    next();
  };
};

/**
 * Middleware to audit authentication events
 */
export const auditAuthMiddleware = (
  action: AuditAction.LOGIN | AuditAction.LOGOUT | AuditAction.LOGIN_FAILED | AuditAction.PASSWORD_CHANGED
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;

    res.json = function (data: any) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const userId = data?.user?.id || req.body?.email || 'unknown';
        const ipAddress = getIpAddress(req);
        const userAgent = getUserAgent(req);

        auditService.logAuth(
          userId,
          action,
          {
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
          },
          ipAddress,
          userAgent
        ).catch(error => {
          logger.error('[Audit Auth Middleware] Failed to log auth event:', error);
        });
      }

      return originalJson.call(this, data);
    };

    next();
  };
};

/**
 * Middleware to audit failed authentication
 */
export const auditAuthFailureMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalStatus = res.status;

    res.status = function (code: number) {
      if (code === 401 || code === 403) {
        const userId = (req as any).user?.id || req.body?.email || 'unknown';
        const ipAddress = getIpAddress(req);
        const userAgent = getUserAgent(req);

        auditService.logAuth(
          userId,
          AuditAction.LOGIN_FAILED,
          {
            method: req.method,
            path: req.path,
            statusCode: code,
            reason: 'Authentication failed',
          },
          ipAddress,
          userAgent
        ).catch(error => {
          logger.error('[Audit Auth Failure Middleware] Failed to log auth failure:', error);
        });
      }

      return originalStatus.call(this, code);
    };

    next();
  };
};

/**
 * Middleware to audit security events
 */
export const auditSecurityMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalStatus = res.status;

    res.status = function (code: number) {
      const userId = (req as any).user?.id || 'anonymous';
      const ipAddress = getIpAddress(req);
      const userAgent = getUserAgent(req);

      if (code === 401) {
        auditService.logSecurity(
          userId,
          AuditAction.UNAUTHORIZED_ACCESS,
          'http',
          req.path,
          {
            method: req.method,
            statusCode: code,
          },
          ipAddress,
          userAgent
        ).catch(error => {
          logger.error('[Audit Security Middleware] Failed to log security event:', error);
        });
      } else if (code === 403) {
        auditService.logSecurity(
          userId,
          AuditAction.PERMISSION_DENIED,
          'http',
          req.path,
          {
            method: req.method,
            statusCode: code,
          },
          ipAddress,
          userAgent
        ).catch(error => {
          logger.error('[Audit Security Middleware] Failed to log security event:', error);
        });
      } else if (code >= 500) {
        auditService.logSecurity(
          userId,
          AuditAction.SYSTEM_ERROR,
          'http',
          req.path,
          {
            method: req.method,
            statusCode: code,
          },
          ipAddress,
          userAgent
        ).catch(error => {
          logger.error('[Audit Security Middleware] Failed to log security event:', error);
        });
      }

      return originalStatus.call(this, code);
    };

    next();
  };
};

// Made with Bob