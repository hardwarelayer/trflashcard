import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateTokens, comparePassword } from '@/lib/auth/jwt';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_CREDENTIALS',
          message: 'Username và password là bắt buộc'
        }
      }, { status: 400 });
    }

    // Find member by username
    const { data: member, error: memberError } = await supabase
      .from('demo_member')
      .select('id, username, password, full_name, status, deleted_at')
      .eq('username', username)
      .single();

    if (memberError || !member) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Tên đăng nhập hoặc mật khẩu không đúng'
        }
      }, { status: 401 });
    }

    // Check if member is deleted
    if (member.deleted_at) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Tên đăng nhập hoặc mật khẩu không đúng'
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

    // Verify password
    const isPasswordValid = await comparePassword(password, member.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Tên đăng nhập hoặc mật khẩu không đúng'
        }
      }, { status: 401 });
    }

    // Generate JWT tokens
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
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}
