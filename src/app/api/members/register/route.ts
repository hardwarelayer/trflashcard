import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateTokens } from '@/lib/auth/jwt';
import bcrypt from 'bcryptjs';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, full_name } = body;

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

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'WEAK_PASSWORD',
          message: 'Password phải có ít nhất 6 ký tự'
        }
      }, { status: 400 });
    }

    // Check if username already exists
    const { data: existingMember, error: checkError } = await supabase
      .from('demo_member')
      .select('id')
      .eq('username', username)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is what we want
      return NextResponse.json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Lỗi kiểm tra username'
        }
      }, { status: 500 });
    }

    if (existingMember) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'USERNAME_EXISTS',
          message: 'Username đã tồn tại'
        }
      }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new member
    const { data: newMember, error: createError } = await supabase
      .from('demo_member')
      .insert({
        username,
        password: hashedPassword,
        full_name: full_name || null,
        status: 1 // Active by default
      })
      .select('id, username, full_name, status, created_at')
      .single();

    if (createError) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: 'Lỗi tạo member mới'
        }
      }, { status: 500 });
    }

    // Generate JWT tokens
    const tokens = await generateTokens(newMember.id, newMember.username);

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        member: {
          id: newMember.id,
          username: newMember.username,
          full_name: newMember.full_name
        },
        ...tokens
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}
