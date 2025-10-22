# 🚀 Hướng dẫn Setup dự án TR Flashcard

## 📋 Yêu cầu hệ thống

- **Node.js**: >= 20.0.0
- **npm**: >= 10.0.0
- **Git**: Để clone repository
- **Supabase account**: Để setup database và authentication

## 🔧 Cài đặt

### 1️⃣ **Clone repository**
```bash
git clone <repository-url>
cd trflashcard
```

### 2️⃣ **Cài đặt dependencies**
```bash
npm install
```

### 3️⃣ **Setup environment variables**

**Bước 1: Tạo file `.env.local`**
```bash
# Copy file environment template
cp env.example .env.local
```

**Bước 2: Kiểm tra file đã được tạo**
```bash
# Kiểm tra file .env.local đã tồn tại
ls -la .env.local
```

**Bước 3: Chỉnh sửa `.env.local`**
```bash
# Mở file .env.local và thay thế các giá trị placeholder
# bằng thông tin Supabase thực tế của bạn
```

**Nội dung `.env.local` (thay thế các giá trị placeholder):**
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration (for Mobile App)
JWT_SECRET=your_32_character_secret_key_here
JWT_EXPIRES_IN=1h
REFRESH_EXPIRES_IN=30d

# App Configuration
NEXT_PUBLIC_APP_NAME=TR Flashcard
NEXT_PUBLIC_APP_VERSION=1.0.0
```

> ⚠️ **Lưu ý bảo mật**: File `.env.local` chứa thông tin nhạy cảm và sẽ KHÔNG được commit lên git (đã được exclude trong `.gitignore`).

### 4️⃣ **Setup Supabase Database**

1. **Tạo Supabase project** tại [supabase.com](https://supabase.com)
2. **Chạy database schema:**
   ```sql
   -- Copy nội dung từ file ddl/basic.sql
   -- Paste vào Supabase SQL Editor và chạy
   ```
3. **Cập nhật environment variables** với Supabase credentials

### 5️⃣ **Chạy development server**
```bash
npm run dev
```

### 6️⃣ **Truy cập ứng dụng**
- **URL**: http://localhost:3000
- **Auto redirect**: http://localhost:3000 → http://localhost:3000/vi
- **Login**: Sử dụng Supabase Admin credentials

## 🗄️ Database Schema

### **Bảng chính:**
- `demo_member` - Quản lý thành viên
- `demo_card` - Quản lý thẻ học
- `demo_system_config` - Cấu hình hệ thống

### **Tính năng:**
- **RLS (Row Level Security)** - Bảo mật dữ liệu
- **Triggers** - Auto-update timestamps
- **Soft Delete** - Xóa mềm với `deleted_at`
- **Sample Data** - Dữ liệu test sẵn có

## 🌐 Internationalization (i18n)

### **Hỗ trợ ngôn ngữ:**
- **Tiếng Việt (vi)** - Ngôn ngữ mặc định
- **English (en)** - Ngôn ngữ phụ

### **URLs:**
- `/vi/` - Tiếng Việt
- `/en/` - English
- `/` - Auto redirect to `/vi/`

## 🔐 Authentication

### **Admin Authentication:**
- **Provider**: Supabase Auth
- **Login page**: `/vi/login`
- **Dashboard**: `/vi/dashboard`

### **Member Authentication (Mobile):**
- **Provider**: Custom JWT
- **API endpoints**: `/api/auth/*`
- **Token types**: Access token (1h), Refresh token (30d)

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Chạy development server
npm run build        # Build production
npm run start        # Chạy production server
npm run lint         # Kiểm tra ESLint

# Refine CLI
npm run refine       # Refine CLI commands
```

## 📁 Cấu trúc dự án

```
trflashcard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # i18n routing
│   │   │   ├── login/         # Admin login
│   │   │   ├── dashboard/     # Admin dashboard
│   │   │   ├── members/       # Members CRUD
│   │   │   └── cards/         # Cards CRUD
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   ├── providers/             # Refine providers
│   │   ├── auth-provider/     # Authentication
│   │   └── data-provider/     # Data fetching
│   └── utils/                 # Utilities
│       └── supabase/          # Supabase client
├── ddl/                       # Database schema
│   └── basic.sql              # Database schema
├── docs/                      # Documentation
│   ├── authentication.md     # Auth guide
│   └── dev-log.md            # Development log
├── i18n/                      # Internationalization
│   └── request.ts             # i18n config
├── lib/                       # Libraries
│   └── auth/                  # JWT authentication
├── messages/                  # Translation files
│   ├── vi.json               # Vietnamese
│   └── en.json               # English
├── types/                     # TypeScript interfaces
│   └── index.ts              # Type definitions
├── .env.local                 # Environment variables
├── next.config.mjs           # Next.js config
├── middleware.ts              # i18n middleware
└── package.json              # Dependencies
```

## 🚨 Troubleshooting

### **Lỗi thường gặp:**

#### 1. **Environment variables không load**
```bash
# Kiểm tra file .env.local có tồn tại
ls -la .env.local

# Nếu file không tồn tại, tạo lại từ template
cp env.example .env.local

# Kiểm tra nội dung file
cat .env.local

# Restart development server
npm run dev
```

#### 2. **Supabase connection failed**
```bash
# Kiểm tra Supabase URL và keys
# Kiểm tra Supabase project status
# Kiểm tra network connection
```

#### 3. **Build errors**
```bash
# Clear cache và reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 4. **TypeScript errors**
```bash
# Kiểm tra types
npm run lint

# Fix types nếu cần
```

## 📚 Tài liệu tham khảo

- **README.md** - Tổng quan dự án
- **docs/authentication.md** - Hướng dẫn authentication
- **docs/dev-log.md** - Log các vấn đề đã gặp và cách xử lý
- **ddl/basic.sql** - Database schema

## 🎯 Next Steps

1. **Phase 3**: CRUD Pages - Members và Cards management
2. **Phase 4**: API endpoints - JWT cho mobile app
3. **Phase 5**: Deployment - Netlify hosting

---

## 💡 Tips

- **Luôn chạy `npm run build`** trước khi commit
- **Kiểm tra ESLint** với `npm run lint`
- **Backup database** trước khi thay đổi schema
- **Sử dụng TypeScript** để tránh lỗi runtime

**Chúc bạn phát triển thành công!** 🚀
