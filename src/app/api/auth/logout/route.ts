import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    // Get Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_TOKEN',
          message: 'Access token là bắt buộc'
        }
      }, { status: 401 });
    }

    // Extract token from header
    const token = authHeader.replace('Bearer ', '');
    
    // Verify token
    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Access token không hợp lệ'
        }
      }, { status: 401 });
    }

    // For JWT, we don't need to store tokens on server side
    // The client should discard the tokens
    // In a more sophisticated system, you might want to maintain a blacklist

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        message: 'Đăng xuất thành công'
      }
    });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}
