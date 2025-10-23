import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateTokens, verifyRefreshToken } from '@/lib/auth/jwt';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refresh_token } = body;

    // Validate input
    if (!refresh_token) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_TOKEN',
          message: 'Refresh token là bắt buộc'
        }
      }, { status: 400 });
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refresh_token);
    if (!payload) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Refresh token không hợp lệ hoặc đã hết hạn'
        }
      }, { status: 401 });
    }

    // Check if member still exists and is active
    const { data: member, error: memberError } = await supabase
      .from('demo_member')
      .select('id, username, full_name, status, deleted_at')
      .eq('id', payload.member_id)
      .single();

    if (memberError || !member) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MEMBER_NOT_FOUND',
          message: 'Thành viên không tồn tại'
        }
      }, { status: 401 });
    }

    // Check if member is deleted
    if (member.deleted_at) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MEMBER_NOT_FOUND',
          message: 'Thành viên không tồn tại'
        }
      }, { status: 401 });
    }

    // Check if member is active
    if (member.status !== 1) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'ACCOUNT_INACTIVE',
          message: 'Tài khoản đã bị vô hiệu hóa'
        }
      }, { status: 401 });
    }

    // Generate new tokens
    const tokens = await generateTokens(member.id, member.username);

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        member: {
          id: member.id,
          username: member.username,
          full_name: member.full_name
        },
        ...tokens
      }
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}
