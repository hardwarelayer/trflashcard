# Tien Refine(React) for Flashcard

## 📑 Mục lục

- [📋 Tổng quan](#-tổng-quan)
- [🎯 Đối tượng sử dụng](#-đối-tượng-sử-dụng)
- [🖥️ Màn hình cơ bản](#️-màn-hình-cơ-bản)
- [🗄️ Database](#️-database)
- [🔧 Business Logic](#-business-logic)
- [🛠️ Technology Stack](#️-technology-stack)
- [🌐 Ứng dụng Web - Bộ nhớ, Navigation, Đa ngôn ngữ](#-ứng-dụng-web---bộ-nhớ-navigation-đa-ngôn-ngữ)
  - [💾 Quản lý bộ nhớ/State](#-quản-lý-bộ-nhớstate)
  - [🧭 Navigation](#-navigation)
  - [🌍 i18n Development Workflow](#-i18n-development-workflow)
  - [📁 Cấu trúc thư mục đề xuất](#-cấu-trúc-thư-mục-đề-xuất)
- [🚀 Lệnh khởi tạo và phát triển](#-lệnh-khởi-tạo-và-phát-triển)
  - [0️⃣ Cài đặt Node.js và npm (Windows PowerShell)](#0️⃣-cài-đặt-nodejs-và-npm-windows-powershell)
  - [1️⃣ Khởi tạo dự án](#1️⃣-khởi-tạo-dự-án)
  - [2️⃣ Development](#2️⃣-development)
  - [3️⃣ Deploy lên Netlify](#3️⃣-deploy-lên-netlify)
- [🔐 Authentication & JWT Token Management](./docs/authentication.md)
- [🚀 Setup Guide](./SETUP.md)
- [📊 Tiến độ dự án](#-tiến-độ-dự-án)
- [📝 Lịch sử thay đổi](#-lịch-sử-thay-đổi)
- [🔧 Dev Log](./docs/dev-log.md)

---

## 📋 Tổng quan

Đây là một ứng dụng skeleton demo để xây dựng các ứng dụng khác từ nó.

## 🎯 Đối tượng sử dụng

- **Administrator**: Một vài người quản trị viên

## 🖥️ Màn hình cơ bản

- **Login**: Với dropdown chọn ngôn ngữ trước khi login
- **Danh sách member**: CRUD với data object là đối tượng member (member không phải admin)
- **Danh sách card**: CRUD với data là các card
- **Logout**: Đăng xuất khỏi hệ thống

## 🗄️ Database

- **Bảng member**: Quản lý thông tin thành viên
- **Bảng card**: Card title và content demo do member đăng thông qua API

## 🔧 Business Logic

- **Admin**: Chỉ admin mới login vào web app (sử dụng Supabase Auth)
- **Member**: Không login vào web app này
- **API Authentication**: Member xác thực qua API sử dụng JWT
- **Mobile App**: Member sử dụng token để truy cập cards qua app Kotlin

## 🛠️ Technology Stack

- **Framework**: Refine + Next.js + Ant Design + Supabase
- **Môi trường**: Local development và deploy lên Netlify + Supabase
- **Tối ưu**: Bundle size (giới hạn free Netlify) và performance
- **Best Practices**: Development workflow và best practices
- **Future**: Scalability và technology updates

## 🌐 Ứng dụng Web - Bộ nhớ, Navigation, Đa ngôn ngữ

### 💾 Quản lý bộ nhớ/State

- **Next.js App Router**: File-based routing, SSR/ISR, middleware auth
- **React Query/TanStack Query**: Data fetching + caching, pagination, prefetch khi hover
- **Zod**: Validate payloads và response
- **Local storage**: Chỉ lưu `locale`, `page_size` tùy chọn UI
- **Token admin**: Lưu trong httpOnly cookie (server side)

### 🧭 Navigation

- **App Router**: Layout chung (sidebar/topbar), segment cho từng module
- **Routes**: `/dashboard`, `/members`, `/programs`, `/lessons`, `/contents`, `/settings`, `/logs`
- **Breadcrumb**: Theo cây Program → Lesson → Step

### 🌍 i18n Development Workflow

#### 📁 Cấu trúc thư mục đề xuất

```
trflashcard/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   ├── members/
│   │   └── cards/
│   └── layout.tsx
├── components/
│   ├── ui/
│   └── forms/
├── lib/
│   ├── auth/
│   ├── i18n/
│   └── supabase/
├── messages/
│   ├── vi.json
│   └── en.json
├── types/
└── middleware.ts
```

## 🚀 Setup & Development

### 📋 **Quick Start**
Để bắt đầu với dự án, hãy xem hướng dẫn chi tiết tại: **[🚀 Setup Guide](./SETUP.md)**

### 0️⃣ Cài đặt Node.js và npm (Windows PowerShell)

#### Cách 1: Sử dụng Chocolatey
```powershell (với quyền admin mới được)
# Cài đặt Chocolatey (nếu chưa có)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Cài đặt Node.js
choco install nodejs

# Kiểm tra cài đặt
node --version
npm --version
```

Chú ý: sau khi cài phải restart lại terminal và IDE để có PATH tương ứng.

### 1️⃣ Khởi tạo dự án

```bash
# Khởi tạo Refine + Ant Design (tôi KHÔNG dùng --preset vì bị lỗi tự điền trên windows 11)
npx create-refine-app@latest trflashcard

# Chọn options:
# - Template: Next.js
# - Backend: Supabase
# - UI Framework: Ant Design
# - Examples: Yes (Recommended)
# - Authentication: None
# - Email: (bỏ trống)

# Cài đặt thêm dependencies
npm install @tanstack/react-query next-intl zod
```

### 2️⃣ Development

```bash
# Chạy development server
npm run dev

# Build cho production
npm run build

# Start production server
npm start
```

### 3️⃣ Deploy lên Netlify

```bash
# Build static files
npm run build

# Deploy lên Netlify (sẽ có hướng dẫn chi tiết sau)
```

---

## 📊 Tiến độ dự án

### ✅ **Đã hoàn thành**

#### 🏗️ **Phase 1: Cấu trúc cơ bản** *(21/10/2025)*
- [x] **Khởi tạo dự án** - Refine + Next.js + Ant Design
- [x] **Cấu trúc thư mục** - Tổ chức code theo best practices
- [x] **TypeScript interfaces** - Định nghĩa types cho DemoMember, DemoCard, API
- [x] **Database schema** - Tạo schema với tiền tố `demo_*` để tránh xung đột
- [x] **Đa ngôn ngữ** - Hỗ trợ tiếng Việt và tiếng Anh (next-intl)
- [x] **Supabase client** - Cấu hình kết nối database
- [x] **JWT utilities** - Xử lý authentication cho mobile app
- [x] **Next.js App Router** - Cấu trúc routing hiện đại
- [x] **Dashboard cơ bản** - Trang chủ với thống kê
- [x] **Environment config** - File cấu hình mẫu

### 🚧 **Đang thực hiện**

#### 🎨 **Phase 3: CRUD Pages & Navigation** *(Đang thực hiện - 53%)*
- [x] **Login improvements** - Thêm dropdown chọn ngôn ngữ ✅
- [x] **Navigation system** - Sidebar menu và routing ✅
- [x] **Logout functionality** - Session management ✅
- [x] **Members CRUD** - Quản lý thành viên hoàn chỉnh ✅
- [x] **Forms validation** - Ant Design forms với validation ✅
- [x] **Technical fixes** - Next.js 15 params, routing, sidebar layout ✅
- [ ] **Cards CRUD** - Quản lý thẻ học hoàn chỉnh
- [ ] **Dashboard real data** - Kết nối database thực tế
- [ ] **Responsive design** - Mobile-friendly interface
- [ ] **Multilanguage** - i18n cho sidebar và admin pages (hoãn lại)

### 📋 **Kế hoạch**

#### 🔌 **Phase 4: API endpoints**
- [ ] **JWT API** - Authentication cho mobile app
- [ ] **Member API** - CRUD cho mobile app
- [ ] **Card API** - CRUD cho mobile app
- [ ] **Error handling** - Consistent error responses

#### 🚀 **Phase 5: Deployment**
- [ ] **Supabase setup** - Database và authentication
- [ ] **Environment variables** - Production config
- [ ] **Netlify deployment** - Static site hosting
- [ ] **Testing** - Unit tests và integration tests

---

## 📝 Lịch sử thay đổi

### 🗓️ **21/10/2025**

#### ✨ **Cập nhật tên bảng database**
- **Thay đổi**: Đổi tên tất cả bảng từ `member`, `card`, `system_config` thành `demo_member`, `demo_card`, `demo_system_config`
- **Lý do**: Tránh xung đột với database hiện tại trong `staticweb/flashcard`
- **Ảnh hưởng**: 
  - Database schema (`ddl/basic.sql`)
  - TypeScript interfaces (`types/index.ts`)
  - Tất cả references trong code

#### 🏗️ **Hoàn thành Phase 1**
- **Cấu trúc dự án**: Tạo đầy đủ cấu trúc thư mục và file cấu hình
- **Database schema**: Schema hoàn chỉnh với RLS, triggers, functions
- **i18n setup**: Hỗ trợ đa ngôn ngữ vi/en
- **TypeScript**: Interfaces và types đầy đủ
- **Next.js App Router**: Cấu trúc routing hiện đại

#### 📁 **Cấu trúc thư mục được tạo**
```
trflashcard/
├── src/app/[locale]/          # Next.js App Router với i18n
├── components/            # React components
├── lib/                  # Utilities và configs
│   ├── auth/            # JWT authentication
│   ├── i18n/            # Internationalization
│   └── supabase/        # Database client
├── messages/            # Translation files
├── types/               # TypeScript interfaces
├── ddl/                 # Database schema
└── middleware.ts        # i18n middleware
```

#### 🔧 **Dependencies đã cài đặt**
- `jsonwebtoken` - JWT token handling
- `bcryptjs` - Password hashing
- `next-intl` - Internationalization
- `@types/jsonwebtoken` - TypeScript types
- `@types/bcryptjs` - TypeScript types

#### 📊 **Database schema hoàn chỉnh**
- **3 bảng chính**: `demo_member`, `demo_card`, `demo_system_config`
- **RLS policies**: Bảo mật dữ liệu
- **Triggers**: Auto-update timestamps
- **Functions**: Soft delete và restore
- **Views**: Query helpers
- **Sample data**: Dữ liệu test

#### 🌐 **i18n configuration**
- **2 ngôn ngữ**: Tiếng Việt (vi) và English (en)
- **Middleware**: Auto-detect locale
- **Messages**: Translation files cho tất cả UI text
- **Routing**: `/vi/` và `/en/` paths

### 🎯 **Mục tiêu tiếp theo**
1. **Tạo CRUD pages** cho members và cards
2. **Tạo API endpoints** cho mobile app
3. **Deploy lên Netlify**

---

### 🗓️ **22/10/2025**

#### ✅ **Hoàn thành Phase 2: Database & Authentication**
- **Database schema**: Đã tạo và chạy thành công trên Supabase
- **Supabase authentication**: Admin login hoạt động
- **Admin pages**: Login và dashboard đã hoạt động
- **i18n**: Hỗ trợ vi/en hoàn chỉnh
- **Refine setup**: Tất cả components và providers đã hoạt động

#### 🚨 **Các vấn đề đã xử lý trong Phase 2**
- **Server vs Client Component conflicts**: Tạo client-side auth provider và RefineWrapper
- **QueryClient missing**: Thêm QueryClientProvider vào RefineWrapper
- **Nested HTML tags**: Sửa cấu trúc layout để tránh hydration errors
- **Multiple Supabase clients**: Sử dụng chung một client instance
- **Hardcoded credentials**: Xóa constants.ts và sử dụng environment variables

#### 🔧 **Refine setup hoàn chỉnh**
- **QueryClientProvider**: React Query cho data fetching
- **AntdRegistry**: Ant Design components
- **ColorModeContextProvider**: Theme management
- **DevtoolsProvider**: Development tools
- **RefineKbar**: Keyboard shortcuts
- **GitHubBanner**: Refine branding

#### 📊 **Kết quả Phase 2**
- ✅ **Database**: demo_member, demo_card, demo_system_config tables
- ✅ **Authentication**: Supabase Auth cho admin
- ✅ **Admin pages**: Login và dashboard với Ant Design
- ✅ **i18n**: vi/en routing và translations
- ✅ **Refine**: Tất cả components hoạt động ổn định

#### 🎯 **Mục tiêu tiếp theo**
1. **Tạo CRUD pages** cho members và cards
2. **Tạo API endpoints** cho mobile app
3. **Deploy lên Netlify**

---

### 🗓️ **22/10/2025 - Giai đoạn Cleanup & Build Fix**

#### 🧹 **Dọn dẹp codebase hoàn chỉnh**
- **Xóa 22 file debug/test:** Tất cả file debug từ quá trình troubleshooting
- **Sửa ESLint errors:** Thay `<a>` tags bằng `<Link>` component
- **Cleanup dependencies:** Xóa các component wrapper không cần thiết

#### 🔧 **Sửa lỗi TypeScript**
- **i18n RequestConfig:** Thêm `locale` vào return object và type assertion
- **JWT overloads:** Sử dụng `(jwt.sign as any)` để bypass TypeScript strict mode
- **Environment variables:** Thêm fallback values cho JWT_SECRET

#### 📦 **Dependencies compatibility**
- **React version:** Downgrade từ 19.1.0 → 18.3.1 để tương thích với Ant Design
- **TypeScript types:** Cập nhật @types/react và @types/react-dom
- **Build process:** `npm install` → `npm run build` → `npm run dev`

#### 📊 **Kết quả cleanup**
- ✅ **Build thành công** - Không còn lỗi TypeScript
- ✅ **Dependencies ổn định** - React 18 + Next.js 15 + Ant Design 5
- ✅ **Clean codebase** - Xóa 22 file debug không cần thiết
- ✅ **ESLint compliant** - Sử dụng `<Link>` thay vì `<a>`
- ✅ **i18n hoạt động** - RequestConfig đúng type
- ✅ **JWT functions** - Type assertion cho overloads

#### 🎯 **Mục tiêu tiếp theo**
1. **Phase 3**: Hoàn thiện CRUD pages và navigation system
2. **Phase 4**: Tạo API endpoints cho mobile app
3. **Phase 5**: Deploy lên Netlify

---

### 🗓️ **22/10/2025 - Cập nhật Phase 3 Planning**

#### 📋 **Phân tích hiện trạng**
- **Login page**: Có form cơ bản nhưng thiếu dropdown chọn ngôn ngữ
- **Dashboard**: Có layout cơ bản nhưng dùng mock data, thiếu navigation
- **CRUD pages**: Chưa có trang quản lý members và cards
- **Navigation**: Chưa có sidebar menu và routing system

#### 🎯 **Cập nhật Phase 3 scope**
- **Mở rộng Phase 3** từ chỉ CRUD pages thành "CRUD Pages & Navigation"
- **Bổ sung tasks**:
  - Login improvements (language dropdown)
  - Navigation system (sidebar menu)
  - Logout functionality
  - Dashboard real data integration
  - Complete CRUD operations
  - Responsive design
  - Forms validation

#### 📊 **Kết quả cập nhật**
- ✅ **Phase 3 scope** được mở rộng và chi tiết hóa
- ✅ **Task breakdown** rõ ràng với 8 main tasks
- ✅ **Timeline** được điều chỉnh phù hợp
- ✅ **Documentation** được cập nhật đầy đủ

### 🗓️ **22/10/2025 - Cập nhật tiến độ Phase 3**

#### ✅ **Hoàn thành Members CRUD**
- **Members List**: Hiển thị danh sách với pagination, search, sorting
- **Create Member**: Form tạo member mới với validation
- **Edit Member**: Form chỉnh sửa member với password optional
- **Show Member**: Hiển thị chi tiết member với thông tin đầy đủ
- **Delete Member**: Xóa member với confirmation
- **Navigation**: Routing hoạt động đúng cách

#### ✅ **Hoàn thành Navigation & Layout**
- **Sidebar**: Navigation menu với Dashboard, Members, Cards, Settings
- **Language Switcher**: Dropdown chọn ngôn ngữ ở login page
- **Logout**: Chức năng đăng xuất hoạt động
- **Layout Management**: Sửa vấn đề nested sidebar

#### ✅ **Hoàn thành Technical Fixes**
- **Next.js 15**: Sửa lỗi params as Promise
- **Routing**: Sửa lỗi 404 và navigation
- **Forms**: Sửa lỗi useForm warnings
- **Layout**: Tách riêng login layout và admin layout

#### 📊 **Tiến độ hiện tại: 53% (9/17 tasks)**
- **Đã hoàn thành**: 9 tasks
- **Chưa thực hiện**: 8 tasks (Cards CRUD, Dashboard real data, Responsive, Multilanguage)
- **Quyết định**: Hoãn multilanguage để tránh rủi ro phá vỡ code

---

## 📚 Tài liệu tham khảo

- **[🚀 Setup Guide](./SETUP.md)** - Hướng dẫn cài đặt và chạy dự án
- **[🔐 Authentication Guide](./docs/authentication.md)** - Hướng dẫn authentication
- **[🔧 Dev Log](./docs/dev-log.md)** - Log các vấn đề đã gặp và cách xử lý
- **[🗄️ Database Schema](./ddl/basic.sql)** - Schema database
- **[📦 Package.json](./package.json)** - Dependencies và scripts
