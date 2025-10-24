import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyAccessToken } from '@/lib/auth/jwt';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_CARD_ID',
          message: 'Card ID không hợp lệ'
        }
      }, { status: 400 });
    }

    // Get card details
    const { data: card, error } = await supabase
      .from('demo_card')
      .select('id, title, content, member_id, created_at, updated_at')
      .eq('id', id)
      .eq('member_id', payload.member_id)
      .is('deleted_at', null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          success: false,
          error: {
            code: 'CARD_NOT_FOUND',
            message: 'Card không tồn tại hoặc bạn không có quyền truy cập'
          }
        }, { status: 404 });
      }

      return NextResponse.json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Lỗi truy vấn database'
        }
      }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        card
      }
    });

  } catch (error) {
    console.error('Get card error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_CARD_ID',
          message: 'Card ID không hợp lệ'
        }
      }, { status: 400 });
    }

    const body = await request.json();
    const { title, content } = body;

    // Validate input
    if (!title || !content) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Title và content là bắt buộc'
        }
      }, { status: 400 });
    }

    // Validate title length
    if (title.length > 200) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'TITLE_TOO_LONG',
          message: 'Title không được vượt quá 200 ký tự'
        }
      }, { status: 400 });
    }

    // Validate content length
    if (content.length > 10000) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'CONTENT_TOO_LONG',
          message: 'Content không được vượt quá 10000 ký tự'
        }
      }, { status: 400 });
    }

    // Update card
    const { data: updatedCard, error } = await supabase
      .from('demo_card')
      .update({
        title: title.trim(),
        content: content.trim(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('member_id', payload.member_id)
      .is('deleted_at', null)
      .select('id, title, content, member_id, created_at, updated_at')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          success: false,
          error: {
            code: 'CARD_NOT_FOUND',
            message: 'Card không tồn tại hoặc bạn không có quyền truy cập'
          }
        }, { status: 404 });
      }

      return NextResponse.json({
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: 'Lỗi cập nhật card'
        }
      }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        card: updatedCard
      }
    });

  } catch (error) {
    console.error('Update card error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_CARD_ID',
          message: 'Card ID không hợp lệ'
        }
      }, { status: 400 });
    }

    // Soft delete card
    const { data: deletedCard, error } = await supabase
      .from('demo_card')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: payload.member_id
      })
      .eq('id', id)
      .eq('member_id', payload.member_id)
      .is('deleted_at', null)
      .select('id, title')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          success: false,
          error: {
            code: 'CARD_NOT_FOUND',
            message: 'Card không tồn tại hoặc bạn không có quyền truy cập'
          }
        }, { status: 404 });
      }

      return NextResponse.json({
        success: false,
        error: {
          code: 'DELETE_ERROR',
          message: 'Lỗi xóa card'
        }
      }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        message: 'Card đã được xóa thành công'
      }
    });

  } catch (error) {
    console.error('Delete card error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}
