import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      marginTop: '50px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Trang không tồn tại</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <div>
        <Link 
          href="/" 
          style={{ 
            color: '#1890ff', 
            textDecoration: 'none',
            marginRight: '20px'
          }}
        >
          → Về trang chủ
        </Link>
        <Link 
          href="/login" 
          style={{ 
            color: '#1890ff', 
            textDecoration: 'none'
          }}
        >
          → Đăng nhập
        </Link>
      </div>
    </div>
  );
}
