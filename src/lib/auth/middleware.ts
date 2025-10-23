import { NextRequest } from 'next/server';
import { verifyAccessToken, extractTokenFromHeader } from './jwt';

export interface AuthResult {
  success: boolean;
  member_id?: string;
  username?: string;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Authenticate request using JWT token
 */
export function authenticateRequest(request: NextRequest): AuthResult {
  try {
    // Get Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return {
        success: false,
        error: {
          code: 'MISSING_TOKEN',
          message: 'Access token là bắt buộc'
        }
      };
    }

    // Extract token from header
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      return {
        success: false,
        error: {
          code: 'INVALID_TOKEN_FORMAT',
          message: 'Token format không hợp lệ'
        }
      };
    }

    // Verify token
    const payload = verifyAccessToken(token);
    if (!payload) {
      return {
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Access token không hợp lệ hoặc đã hết hạn'
        }
      };
    }

    // Return success with member info
    return {
      success: true,
      member_id: payload.member_id,
      username: payload.username
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      error: {
        code: 'AUTH_ERROR',
        message: 'Lỗi xác thực'
      }
    };
  }
}
