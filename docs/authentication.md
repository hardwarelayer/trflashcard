# Authentication & JWT Token Management

## 📊 Tổng quan

Hệ thống authentication được thiết kế với 2 luồng riêng biệt:

### 👨‍💼 Admin Authentication (Web App)
- **Xác thực**: Supabase Auth
- **Session**: Supabase session
- **Quyền**: Full access đến tất cả resources
- **UI**: Refine admin panel

### 📱 Member Authentication (Mobile App)
- **Xác thực**: JWT tokens
- **Session**: Custom JWT session
- **Quyền**: Chỉ access được resources của chính member đó
- **UI**: Mobile app (React Native/Flutter)

## 🔐 Security Considerations

### 🔑 JWT Token Structure
```typescript
interface JWTPayload {
  member_id: string
  device_id?: string
  type: 'access' | 'refresh'
}
```

### ⏰ Token Expiry
- **Access Token**: 1 hour
- **Refresh Token**: 30 days
- **Device Binding**: Token chỉ valid với device đã đăng ký

### 🔒 Security Features
- **Password Hashing**: bcrypt với salt rounds = 10
- **Token Rotation**: Optional để tăng security
- **Device Validation**: Check member_device relationship
- **Rate Limiting**: Prevent abuse

## 🔄 Authentication Flows

### 📱 Mobile App Flow
1. **Login Request** → `POST /api/auth/login`
2. **Validate Credentials** → Check username/password
3. **Generate Tokens** → Access + Refresh tokens
4. **Store Tokens** → Secure storage (EncryptedSharedPreferences)
5. **API Calls** → Include access token in headers
6. **Token Refresh** → Auto-refresh khi access token hết hạn

### 🖥️ Admin Web Flow
1. **Login Request** → Supabase Auth
2. **Supabase Session** → Server-side session
3. **Admin Panel Access** → Full CRUD operations
4. **Logout** → Clear Supabase session

## 🌍 Environment Variables

### 🔧 Required Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_32_character_secret_key_here
JWT_EXPIRES_IN=1h
REFRESH_EXPIRES_IN=30d

# App Configuration
NEXT_PUBLIC_APP_NAME=TR Flashcard
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## ✅ Best Practices

### 📱 Mobile App
- **Secure Storage**: Sử dụng SharedPreferences hoặc EncryptedSharedPreferences
- **Token Validation**: Check expiry trước khi gọi API
- **Auto-refresh**: Transparent token refresh
- **Error Handling**: Clear error messages và fallback
- **Network**: Sử dụng OkHttp cho HTTP requests
- **Coroutines**: Sử dụng suspend functions cho async operations

### 🖥️ Server-side
- **JWT Verification**: Verify signature và expiry
- **Device Validation**: Check member_device relationship
- **Rate Limiting**: Prevent abuse
- **Error Responses**: Consistent error format

### 🔒 Security
- **Short-lived Access Tokens**: 1 hour expiry
- **Long-lived Refresh Tokens**: 30 days expiry
- **Device Binding**: Token chỉ valid với device đã đăng ký
- **Token Rotation**: Optional để tăng security

## 🔧 Implementation Details

### 📱 Mobile App Authentication
```typescript
// Login API
POST /api/auth/login
{
  "username": "member1",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "member": {
    "id": "uuid",
    "username": "member1",
    "full_name": "Member One"
  }
}
```

### 🔄 Token Refresh
```typescript
// Refresh API
POST /api/auth/refresh
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 🖥️ Admin Authentication
```typescript
// Supabase Auth
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'password'
})
```

## 🚀 Next Steps

1. **Setup Supabase project** và cấu hình authentication
2. **Tạo JWT API endpoints** cho mobile app
3. **Implement token refresh logic**
4. **Add rate limiting** và security measures
5. **Test authentication flows** với Postman/Thunder Client

---

## 📚 **Related Documentation**

- **[Setup Guide](./SETUP.md)** - Hướng dẫn cài đặt và chạy dự án
- **[Dev Log](./dev-log.md)** - Log các vấn đề đã gặp và cách xử lý
- **[Compatibility Notes](./compatibility-notes.md)** - React 19 vs Ant Design v5 compatibility
- **[Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)** - Hướng dẫn deploy lên Vercel
- **[README](../readme.MD)** - Tổng quan dự án