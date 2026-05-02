import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import logger from '../config/logger';

/**
 * Security Middleware
 * 
 * Implements comprehensive security headers and protections:
 * - Helmet for security headers
 * - Content Security Policy (CSP)
 * - HSTS (HTTP Strict Transport Security)
 * - XSS Protection
 * - CSRF Protection
 * - Clickjacking Protection
 * - MIME Type Sniffing Protection
 */

/**
 * Helmet configuration for security headers
 */
export const securityHeaders = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  
  // HTTP Strict Transport Security (HSTS)
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  
  // X-Frame-Options (Clickjacking protection)
  frameguard: {
    action: 'deny',
  },
  
  // X-Content-Type-Options (MIME sniffing protection)
  noSniff: true,
  
  // X-XSS-Protection
  xssFilter: true,
  
  // Referrer Policy
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
  
  // Hide X-Powered-By header
  hidePoweredBy: true,
  
  // DNS Prefetch Control
  dnsPrefetchControl: {
    allow: false,
  },
  
  // IE No Open
  ieNoOpen: true,
  
  // Permissions Policy
  permittedCrossDomainPolicies: {
    permittedPolicies: 'none',
  },
});

/**
 * CORS configuration
 */
export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-CSRF-Token',
  ],
  exposedHeaders: [
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'X-Cache',
  ],
  maxAge: 86400, // 24 hours
};

/**
 * Additional security headers middleware
 */
export const additionalSecurityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Prevent caching of sensitive data
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // HIPAA compliance headers
  res.setHeader('X-PHI-Protected', 'true');
  res.setHeader('X-HIPAA-Compliant', 'true');
  
  next();
};

/**
 * Request sanitization middleware
 */
export const sanitizeRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Remove potentially dangerous characters from query params
  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = (req.query[key] as string)
          .replace(/<script[^>]*>.*?<\/script>/gi, '')
          .replace(/<[^>]+>/g, '')
          .trim();
      }
    }
  }
  
  // Sanitize request body
  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }
  
  next();
};

/**
 * Recursively sanitize object
 */
function sanitizeObject(obj: any): void {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key]
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}

/**
 * IP whitelist middleware (for admin endpoints)
 */
export const ipWhitelist = (allowedIPs: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIP = req.ip || req.socket.remoteAddress || '';
    
    if (allowedIPs.includes(clientIP) || allowedIPs.includes('*')) {
      return next();
    }
    
    logger.warn(`IP whitelist blocked: ${clientIP}`);
    res.status(403).json({
      success: false,
      error: 'Access denied: IP not whitelisted',
    });
  };
};

/**
 * Request size limit middleware
 */
export const requestSizeLimit = (maxSize: number = 10 * 1024 * 1024) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.headers['content-length'] || '0');
    
    if (contentLength > maxSize) {
      logger.warn(`Request size limit exceeded: ${contentLength} bytes`);
      return res.status(413).json({
        success: false,
        error: 'Request entity too large',
      });
    }
    
    next();
  };
};

/**
 * Secure session configuration
 */
export const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict' as const, // CSRF protection
  },
  name: 'sessionId', // Don't use default 'connect.sid'
};

/**
 * CSRF token validation middleware
 */
export const csrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  const token = req.headers['x-csrf-token'] as string;
  const sessionToken = (req as any).session?.csrfToken;
  
  if (!token || !sessionToken || token !== sessionToken) {
    logger.warn('CSRF token validation failed');
    return res.status(403).json({
      success: false,
      error: 'Invalid CSRF token',
    });
  }
  
  next();
};

/**
 * Generate CSRF token
 */
export const generateCSRFToken = (req: Request): string => {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  
  if ((req as any).session) {
    (req as any).session.csrfToken = token;
  }
  
  return token;
};

// Made with Bob