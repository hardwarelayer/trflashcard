import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

// Token payload interface
export interface TokenPayload {
  member_id: string;
  username: string;
  type: 'access' | 'refresh';
}

// JWT token response interface
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: 'Bearer';
}

/**
 * Generate JWT tokens for member
 */
export async function generateTokens(memberId: string, username: string): Promise<TokenResponse> {
  const accessPayload: TokenPayload = {
    member_id: memberId,
    username,
    type: 'access'
  };

  const refreshPayload: TokenPayload = {
    member_id: memberId,
    username,
    type: 'refresh'
  };

  const accessToken = jwt.sign(accessPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  } as SignOptions);

  const refreshToken = jwt.sign(refreshPayload, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN
  } as SignOptions);

  // Calculate expires in seconds
  const expiresIn = 3600; // 1 hour in seconds

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
    token_type: 'Bearer'
  };
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Verify access token specifically
 */
export function verifyAccessToken(token: string): TokenPayload | null {
  const payload = verifyToken(token);
  if (payload && payload.type === 'access') {
    return payload;
  }
  return null;
}

/**
 * Verify refresh token specifically
 */
export function verifyRefreshToken(token: string): TokenPayload | null {
  const payload = verifyToken(token);
  if (payload && payload.type === 'refresh') {
    return payload;
  }
  return null;
}

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}
