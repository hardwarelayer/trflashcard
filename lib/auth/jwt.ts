import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'your_32_character_secret_key_here'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '30d'

// JWT payload interface
export interface JWTPayload {
  member_id: string
  device_id?: string
  type: 'access' | 'refresh'
}

// Tạo access token
export const createAccessToken = (memberId: string, deviceId?: string): string => {
  return (jwt.sign as any)(
    {
      member_id: memberId,
      device_id: deviceId,
      type: 'access'
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

// Tạo refresh token
export const createRefreshToken = (memberId: string, deviceId?: string): string => {
  return (jwt.sign as any)(
    {
      member_id: memberId,
      device_id: deviceId,
      type: 'refresh'
    },
    JWT_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN }
  )
}

// Verify JWT token
export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

// Compare password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

// Extract token từ Authorization header
export const extractToken = (authHeader?: string): string | null => {
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}
