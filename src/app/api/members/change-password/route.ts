import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyAccessToken } from '@/lib/auth/jwt';
import bcrypt from 'bcryptjs';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
          message: 'Access token không hợp lệ hoặc đã hết hạn'
        }
      }, { status: 401 });
    }

    const body = await request.json();
    const { current_password, new_password } = body;

    // Validate input
    if (!current_password || !new_password) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_PASSWORDS',
          message: 'Current password và new password là bắt buộc'
        }
      }, { status: 400 });
    }

    // Validate new password strength
    if (new_password.length < 6) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'WEAK_PASSWORD',
          message: 'New password phải có ít nhất 6 ký tự'
        }
      }, { status: 400 });
    }

    // Get member data
    const { data: member, error: memberError } = await supabase
      .from('demo_member')
      .select('id, username, password, status, deleted_at')
      .eq('id', payload.member_id)
      .single();

    if (memberError || !member) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MEMBER_NOT_FOUND',
          message: 'Thành viên không tồn tại'
        }
      }, { status: 404 });
    }

    // Check if member is deleted
    if (member.deleted_at) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MEMBER_NOT_FOUND',
          message: 'Thành viên không tồn tại'
        }
      }, { status: 404 });
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

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(current_password, member.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_CURRENT_PASSWORD',
          message: 'Current password không đúng'
        }
      }, { status: 401 });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(new_password, 10);

    // Update password
    const { error: updateError } = await supabase
      .from('demo_member')
      .update({
        password: hashedNewPassword,
        updated_at: new Date().toISOString()
      })
      .eq('id', member.id);

    if (updateError) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: 'Lỗi cập nhật password'
        }
      }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        message: 'Mật khẩu đã được thay đổi thành công'
      }
    });

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}
