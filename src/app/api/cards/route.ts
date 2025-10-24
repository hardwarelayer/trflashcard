import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyAccessToken } from '@/lib/auth/jwt';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'created_at.desc';

    // Validate pagination
    if (page < 1) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_PAGE',
          message: 'Page phải lớn hơn 0'
        }
      }, { status: 400 });
    }

    // Calculate offset
    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('demo_card')
      .select('id, title, content, created_at, updated_at', { count: 'exact' })
      .eq('member_id', payload.member_id)
      .is('deleted_at', null);

    // Add search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // Add sorting
    const [sortField, sortOrder] = sort.split('.');
    const ascending = sortOrder === 'asc';
    query = query.order(sortField, { ascending });

    // Add pagination
    query = query.range(offset, offset + limit - 1);

    // Execute query
    const { data: cards, error, count } = await query;

    if (error) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Lỗi truy vấn database'
        }
      }, { status: 500 });
    }

    // Calculate pagination info
    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        cards: cards || [],
        pagination: {
          page,
          limit,
          total,
          total_pages: totalPages,
          has_next: page < totalPages,
          has_prev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('List cards error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}

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

    // Create new card (UUID tự sinh từ database)
    const { data: newCard, error } = await supabase
      .from('demo_card')
      .insert({
        member_id: payload.member_id,
        title: title.trim(),
        content: content.trim()
      })
      .select('id, title, content, member_id, created_at, updated_at')
      .single();

    if (error) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: 'Lỗi tạo card mới'
        }
      }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        card: newCard
      }
    });

  } catch (error) {
    console.error('Create card error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      }
    }, { status: 500 });
  }
}
