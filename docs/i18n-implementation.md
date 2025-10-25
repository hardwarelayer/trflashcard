# i18n Implementation Guide - TR Flashcard

## 📋 Overview

This document outlines the complete i18n (internationalization) implementation for the TR Flashcard project, including the clean approach, code cleanup process, and project progress.

## 🎯 Implementation Phases

### Phase 6.1: Login Page i18n ✅ COMPLETED
- **Status**: Successfully implemented
- **Routes**: `/vi/login`, `/en/login`, `/login` (redirect)
- **Features**: 
  - Locale-specific routing
  - Translation keys for all UI elements
  - Proper NextIntlClientProvider setup
  - Clean redirect handling

### Phase 6.2: Sidebar i18n ✅ COMPLETED
- **Status**: Successfully implemented
- **Features**: 
  - Menu items translation (Dashboard, Members, Cards, Settings)
  - Admin panel title translation
  - Logout button translation
  - Language switcher with flag buttons
- **Files**: `src/components/navigation/sidebar.tsx`

### Phase 6.3: Dashboard i18n ✅ COMPLETED
- **Status**: Successfully implemented
- **Features**:
  - Statistics labels translation
  - Card titles and descriptions translation
  - Loading state translation
  - Component architecture (Server/Client separation)
- **Files**: `src/app/[locale]/dashboard/page.tsx`

### Phase 6.4: Members Page i18n ✅ COMPLETED
- **Status**: Successfully implemented
- **Features**:
  - Table headers and pagination translation
  - Create/Edit/Show forms translation
  - Form validation messages translation
  - Delete confirmation dialog translation
  - Component architecture (Server/Client separation)
  - Dynamic locale routing for Refine resources
- **Files**: 
  - `src/app/[locale]/members/page.tsx`
  - `src/app/[locale]/members/create/page.tsx`
  - `src/app/[locale]/members/edit/[id]/page.tsx`
  - `src/app/[locale]/members/show/[id]/page.tsx`

### Phase 6.5: Cards Page i18n ✅ COMPLETED
- **Status**: Successfully implemented
- **Features**:
  - Table headers and pagination translation
  - Create/Edit/Show forms translation
  - Form validation messages translation
  - Delete confirmation dialog translation
  - Component architecture (Server/Client separation)
  - Dynamic locale routing for Refine resources
  - Member selection dropdown translation
- **Files**: 
  - `src/app/[locale]/cards/page.tsx`
  - `src/app/[locale]/cards/create/page.tsx`
  - `src/app/[locale]/cards/edit/[id]/page.tsx`
  - `src/app/[locale]/cards/show/[id]/page.tsx`

### Phase 6.6: Settings Page i18n ⏳ PENDING
- **Status**: Pending
- **Target**: System config labels
- **Files**: `src/app/[locale]/settings/page.tsx`

## 🎯 Phase 6.4: Members Page i18n - COMPLETED

### **✅ Features Implemented:**

1. **Table Headers i18n** - Username, Full Name, Status, Created At, Actions
2. **Pagination i18n** - "của" / "of" with dynamic range display
3. **Create Form i18n** - All labels, placeholders, validation messages
4. **Edit Form i18n** - All labels, placeholders, validation messages
5. **Show Page i18n** - Basic info, system info, status display
6. **Delete Confirmation i18n** - Custom Popconfirm with translated text
7. **Component Architecture** - Server/Client separation for proper context
8. **Dynamic Routing** - Refine resources use current locale

### **🌍 Translation Keys Added:**

**Vietnamese (vi.json):**
```json
{
  "members": {
    "title": "Quản lý thành viên",
    "list": "Danh sách thành viên", 
    "create": "Tạo thành viên",
    "edit": "Sửa thành viên",
    "show": "Chi tiết thành viên",
    "delete": "Xóa thành viên",
    "username": "Tên đăng nhập",
    "password": "Mật khẩu",
    "fullName": "Họ tên",
    "status": "Trạng thái",
    "active": "Hoạt động",
    "inactive": "Không hoạt động",
    "createdAt": "Ngày tạo",
    "actions": "Thao tác",
    "pagination": "của",
    "basicInfo": "Thông tin cơ bản",
    "systemInfo": "Thông tin hệ thống",
    "notUpdated": "Chưa cập nhật",
    "lastUpdated": "Cập nhật lần cuối"
  }
}
```

**English (en.json):**
```json
{
  "members": {
    "title": "Member Management",
    "list": "Member List",
    "create": "Create Member", 
    "edit": "Edit Member",
    "show": "Member Details",
    "delete": "Delete Member",
    "username": "Username",
    "password": "Password",
    "fullName": "Full Name",
    "status": "Status",
    "active": "Active",
    "inactive": "Inactive",
    "createdAt": "Created At",
    "actions": "Actions",
    "pagination": "of",
    "basicInfo": "Basic Information",
    "systemInfo": "System Information",
    "notUpdated": "Not updated",
    "lastUpdated": "Last updated"
  }
}
```

### **🔧 Technical Solutions:**

1. **Component Architecture Pattern:**
   ```typescript
   // Server Component
   export default function MembersPage({ params }: MembersPageProps) {
     const { locale } = use(params);
     return (
       <AdminLayout locale={locale}>
         <MembersContent />
       </AdminLayout>
     );
   }

   // Client Component  
   function MembersContent() {
     const t = useTranslations();
     // ... component logic
   }
   ```

2. **Custom Delete Confirmation:**
   ```typescript
   <Popconfirm
     title={t('common.deleteConfirm')}
     onConfirm={() => handleDelete(record.id)}
     okText={t('common.yes')}
     cancelText={t('common.no')}
   >
     <Button type="text" danger size="small" icon={<DeleteOutlined />} />
   </Popconfirm>
   ```

3. **Dynamic Locale Routing:**
   ```typescript
   // refine-wrapper.tsx
   resources={[
     {
       name: "demo_member",
       list: `/${locale}/members`,
       create: `/${locale}/members/create`,
       edit: `/${locale}/members/edit/:id`,
       show: `/${locale}/members/show/:id`,
     }
   ]}
   ```

### **🚀 Working Routes:**
- `/vi/members` ✅ - Vietnamese members list
- `/en/members` ✅ - English members list  
- `/vi/members/create` ✅ - Vietnamese create form
- `/en/members/create` ✅ - English create form
- `/vi/members/edit/[id]` ✅ - Vietnamese edit form
- `/en/members/edit/[id]` ✅ - English edit form
- `/vi/members/show/[id]` ✅ - Vietnamese show page
- `/en/members/show/[id]` ✅ - English show page

## 🎯 Phase 6.5: Cards Page i18n - COMPLETED

### **✅ Features Implemented:**

1. **Table Headers i18n** - Card Title, Content, Member ID, Created At, Actions
2. **Pagination i18n** - "của" / "of" with dynamic range display
3. **Create Form i18n** - All labels, placeholders, validation messages
4. **Edit Form i18n** - All labels, placeholders, validation messages
5. **Show Page i18n** - Basic info, system info, field labels
6. **Delete Confirmation i18n** - Custom Popconfirm with translated text
7. **Component Architecture** - Server/Client separation for proper context
8. **Dynamic Routing** - Refine resources use current locale
9. **Member Selection** - Dropdown with translated placeholders

### **🌍 Translation Keys Added:**

**Vietnamese (vi.json):**
```json
{
  "cards": {
    "title": "Quản lý thẻ",
    "list": "Danh sách thẻ",
    "create": "Tạo thẻ",
    "edit": "Chỉnh sửa thẻ",
    "show": "Chi tiết thẻ",
    "delete": "Xóa thẻ",
    "cardTitle": "Tiêu đề",
    "content": "Nội dung",
    "member": "Thành viên",
    "memberId": "ID Thành viên",
    "createdAt": "Ngày tạo",
    "actions": "Thao tác",
    "pagination": "của",
    "titlePlaceholder": "Nhập tiêu đề thẻ",
    "contentPlaceholder": "Nhập nội dung thẻ",
    "memberPlaceholder": "Chọn thành viên",
    "titleRequired": "Vui lòng nhập tiêu đề!",
    "titleMinLength": "Tiêu đề phải có ít nhất 3 ký tự!",
    "titleMaxLength": "Tiêu đề không được quá 100 ký tự!",
    "contentRequired": "Vui lòng nhập nội dung!",
    "contentMinLength": "Nội dung phải có ít nhất 10 ký tự!",
    "contentMaxLength": "Nội dung không được quá 1000 ký tự!",
    "memberRequired": "Vui lòng chọn thành viên!",
    "basicInfo": "Thông tin cơ bản",
    "systemInfo": "Thông tin hệ thống",
    "notUpdated": "Chưa cập nhật",
    "lastUpdated": "Cập nhật lần cuối"
  }
}
```

**English (en.json):**
```json
{
  "cards": {
    "title": "Card Management",
    "list": "Card List",
    "create": "Create Card",
    "edit": "Edit Card",
    "show": "Card Details",
    "delete": "Delete Card",
    "cardTitle": "Title",
    "content": "Content",
    "member": "Member",
    "memberId": "Member ID",
    "createdAt": "Created At",
    "actions": "Actions",
    "pagination": "of",
    "titlePlaceholder": "Enter card title",
    "contentPlaceholder": "Enter card content",
    "memberPlaceholder": "Select member",
    "titleRequired": "Please enter title!",
    "titleMinLength": "Title must be at least 3 characters!",
    "titleMaxLength": "Title must not exceed 100 characters!",
    "contentRequired": "Please enter content!",
    "contentMinLength": "Content must be at least 10 characters!",
    "contentMaxLength": "Content must not exceed 1000 characters!",
    "memberRequired": "Please select member!",
    "basicInfo": "Basic Information",
    "systemInfo": "System Information",
    "notUpdated": "Not updated",
    "lastUpdated": "Last updated"
  }
}
```

### **🔧 Technical Solutions:**

1. **Component Architecture Pattern:**
   ```typescript
   // Server Component
   export default function CardsPage({ params }: CardsPageProps) {
     const { locale } = use(params);
     return (
       <AdminLayout locale={locale}>
         <CardsContent />
       </AdminLayout>
     );
   }

   // Client Component  
   function CardsContent() {
     const t = useTranslations();
     // ... component logic
   }
   ```

2. **Custom Delete Confirmation:**
   ```typescript
   <Popconfirm
     title={t('common.deleteConfirm')}
     onConfirm={() => handleDelete(record.id)}
     okText={t('common.yes')}
     cancelText={t('common.no')}
   >
     <Button type="text" danger size="small" icon={<DeleteOutlined />} />
   </Popconfirm>
   ```

3. **Dynamic Locale Routing:**
   ```typescript
   // refine-wrapper.tsx
   resources={[
     {
       name: "demo_card",
       list: `/${locale}/cards`,
       create: `/${locale}/cards/create`,
       edit: `/${locale}/cards/edit/:id`,
       show: `/${locale}/cards/show/:id`,
     }
   ]}
   ```

4. **Member Selection Dropdown:**
   ```typescript
   <Select
     placeholder={t('cards.memberPlaceholder')}
     showSearch
     loading={membersLoading}
     optionFilterProp="children"
     filterOption={(input, option) =>
       (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
     }
     options={membersOptions}
   />
   ```

### **🚀 Working Routes:**
- `/vi/cards` ✅ - Vietnamese cards list
- `/en/cards` ✅ - English cards list  
- `/vi/cards/create` ✅ - Vietnamese create form
- `/en/cards/create` ✅ - English create form
- `/vi/cards/edit/[id]` ✅ - Vietnamese edit form
- `/en/cards/edit/[id]` ✅ - English edit form
- `/vi/cards/show/[id]` ✅ - Vietnamese show page
- `/en/cards/show/[id]` ✅ - English show page

## 🧹 Code Cleanup Process

### **✅ Cleanup Completed:**

1. **Removed Unused Imports** - `useOne` from edit page
2. **Removed Unused Variables** - `memberData` from edit page  
3. **Fixed Hardcoded Locale** - `toLocaleDateString('vi-VN')` → `toLocaleDateString()`
4. **Fixed Hardcoded Locale** - `toLocaleString('vi-VN')` → `toLocaleString()`
5. **Custom Delete Button** - Replaced `DeleteButton` with `Popconfirm` + `Button`
6. **Dynamic Locale Formatting** - Date formatting automatically follows browser locale

### **🔧 Benefits:**

- **Dynamic Locale** - Date formatting will automatically follow browser locale
- **Cleaner Code** - No unused imports/variables
- **Better i18n** - Consistent with i18n approach
- **Custom Components** - Full control over UI elements and translations

## 🎓 Lessons Learned & Best Practices

### **🔧 Key Technical Patterns:**

1. **Server/Client Component Separation:**
   ```typescript
   // Pattern: Server Component → AdminLayout → Client Component
   export default function PageComponent({ params }: PageProps) {
     const { locale } = use(params);
     return (
       <AdminLayout locale={locale}>
         <ContentComponent />
       </AdminLayout>
     );
   }
   ```

2. **Translation Key Organization:**
   ```json
   {
     "namespace": {
       "action": "Create/Edit/Show/Delete",
       "field": "Field labels",
       "fieldPlaceholder": "Placeholder text",
       "fieldRequired": "Required validation",
       "fieldMinLength": "Min length validation",
       "fieldMaxLength": "Max length validation",
       "basicInfo": "Basic information section",
       "systemInfo": "System information section"
     }
   }
   ```

3. **Custom Delete Confirmation Pattern:**
   ```typescript
   <Popconfirm
     title={t('common.deleteConfirm')}
     onConfirm={() => handleDelete(record.id)}
     okText={t('common.yes')}
     cancelText={t('common.no')}
   >
     <Button type="text" danger size="small" icon={<DeleteOutlined />} />
   </Popconfirm>
   ```

4. **Dynamic Locale Formatting:**
   ```typescript
   // Instead of hardcoded locale
   new Date(value).toLocaleDateString('vi-VN')
   
   // Use dynamic locale
   new Date(value).toLocaleDateString()
   ```

### **🚀 Performance Optimizations:**

1. **Component Architecture** - Reduces bundle size by separating server/client logic
2. **Dynamic Imports** - Messages loaded only when needed
3. **Context Hierarchy** - Proper NextIntlClientProvider placement
4. **Code Cleanup** - Removed unused imports and variables

### **🌍 Translation Management:**

1. **Consistent Naming** - `fieldLabel`, `fieldPlaceholder`, `fieldRequired`
2. **Namespace Organization** - Group related keys by feature
3. **Validation Messages** - Separate keys for different validation rules
4. **UI Elements** - Separate keys for labels, placeholders, and actions

### **🔧 Common Issues & Solutions:**

1. **Context Error** - Always wrap client components with NextIntlClientProvider
2. **Import Paths** - Calculate relative paths from component location
3. **Hardcoded Locale** - Use dynamic locale formatting
4. **Unused Code** - Regular cleanup of imports and variables

## 🏗️ Technical Architecture

### Core Components

#### 1. Root Layout (`src/app/layout.tsx`)
```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({ children }) {
  const messages = await getMessages();
  
  return (
    <html lang="vi">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Suspense>
            {children}
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

#### 2. Locale Layout (`src/app/[locale]/layout.tsx`)
```typescript
import { redirect } from 'next/navigation'
import RefineWrapper from '@components/refine-wrapper'

const locales = ['vi', 'en']

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params

  if (!locales.includes(locale as any)) {
    redirect('/vi')
  }

  return (
    <RefineWrapper locale={locale}>
      {children}
    </RefineWrapper>
  )
}
```

#### 3. Middleware (`middleware.ts`)
```typescript
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'always'
})

export const config = {
  matcher: ['/', '/(vi|en)/:path*', '/login']
}
```

#### 4. i18n Configuration (`i18n/request.ts`)
```typescript
import { getRequestConfig } from 'next-intl/server'

const locales = ['vi', 'en']

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as any)) {
    return {
      locale: 'vi',
      messages: (await import(`../messages/vi.json`)).default
    }
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
```

### Translation Files

#### Vietnamese (`messages/vi.json`)
```json
{
  "auth": {
    "email": "Email",
    "password": "Mật khẩu",
    "login": "Đăng nhập",
    "adminLogin": "Đăng nhập Admin",
    "adminNote": "Chỉ dành cho quản trị viên"
  },
  "errors": {
    "required": "Trường này là bắt buộc",
    "invalidEmail": "Email không hợp lệ"
  }
}
```

#### English (`messages/en.json`)
```json
{
  "auth": {
    "email": "Email",
    "password": "Password",
    "login": "Login",
    "adminLogin": "Admin Login",
    "adminNote": "For administrators only"
  },
  "errors": {
    "required": "This field is required",
    "invalidEmail": "Invalid email format"
  }
}
```

## 🔧 Implementation Process

### Clean Approach Strategy

1. **Revert to Clean State**
   - Reverted to previous git commit
   - Started with clean codebase
   - No debugging artifacts

2. **Systematic Implementation**
   - Root layout first (NextIntlClientProvider)
   - Locale layout (redirect handling)
   - Middleware configuration
   - i18n request config
   - Translation files
   - Login page implementation
   - Redirect page for `/login`

3. **Error Resolution**
   - Fixed `notFound()` in layouts (replaced with `redirect()`)
   - Fixed module resolution paths
   - Fixed NextIntlClientProvider context
   - Fixed locale-specific message loading

### Code Cleanup Process

#### Files Removed
- `src/app/[locale]/hello/` - Test directory
- `src/app/[locale]/simple-dashboard/` - Test directory  
- `src/app/[locale]/test-dashboard/` - Test directory
- `src/app/login/` - Duplicate login directory
- `src/components/login-form.tsx` - Unused component

#### Cleanup Script (`cleanup.ps1`)
```powershell
Remove-Item "src\app\[locale]\hello" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "src\app\[locale]\simple-dashboard" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "src\app\[locale]\test-dashboard" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "src\app\login" -Recurse -Force -ErrorAction SilentlyContinue
```

## ⚠️ Known Issues & Solutions

### 1. useForm Warning (IGNORED)
**Issue**: `Warning: Instance created by useForm is not connected to any Form element`

**Root Cause**: Ant Design + Next.js 15 compatibility issue

**Solution**: **IGNORE** - This is a known warning that doesn't affect functionality
- App works correctly
- Ant Design team working on fix
- No impact on production

**Attempted Fixes (Reverted)**:
- Added `formReady` state
- Added conditional rendering
- Added useEffect delays

**Final Decision**: Ignore warning, focus on core functionality

### 2. CSS-in-JS Warning (FIXED)
**Issue**: `Warning: [Ant Design CSS-in-JS] You are registering a cleanup function after unmount`

**Solution**: Added `StyleProvider` with `hashPriority="high"`
```typescript
import { StyleProvider } from '@ant-design/cssinjs';

<AntdRegistry>
  <StyleProvider hashPriority="high">
    <ColorModeContextProvider>
      {/* ... */}
    </ColorModeContextProvider>
  </StyleProvider>
</AntdRegistry>
```

## 🚀 Current Status

### ✅ Completed
- **Phase 6.1**: Login Page i18n ✅
- **Phase 6.2**: Sidebar i18n ✅
- **Phase 6.3**: Dashboard i18n ✅
- **Phase 6.4**: Members Page i18n ✅
- **Phase 6.5**: Cards Page i18n ✅
- Clean codebase
- Proper routing setup
- Translation infrastructure
- CSS-in-JS fixes
- Context hierarchy fixes
- Dynamic locale routing
- Custom delete confirmation
- Code cleanup process
- Member selection dropdown i18n

### ⏳ Pending
- **Phase 6.6**: Settings Page i18n

## 📊 Implementation Progress

### **Phase 6.1: Login Page i18n - COMPLETED**
**Features Implemented:**
- Language Switcher - Select dropdown với flag icons (🇻🇳 🇺🇸)
- Translation Keys - `auth.*` namespace với email, password, login, adminLogin, adminNote
- Navigation Logic - `handleLanguageChange` để switch giữa `/vi/login` và `/en/login`
- Context Setup - NextIntlClientProvider trong login layout
- Routes Working - `/vi/login`, `/en/login`, `/login` (redirect)

**Technical Solutions:**
- Import path fixes: `../../../../messages/${locale}.json`
- NextIntlClientProvider với messages loading
- Language switcher với router.push()

### **Phase 6.2: Sidebar i18n - COMPLETED**
**Features Implemented:**
- Menu Items i18n - Dashboard, Members, Cards, Settings sử dụng `t('navigation.*')`
- Admin Panel Text - "Admin Panel" → `t('navigation.adminPanel')`
- Logout Button - "Logout" → `t('navigation.logout')`
- Language Switcher - Đã có sẵn với flag buttons
- Context Fix - AdminLayout có NextIntlClientProvider với messages loading

**Technical Solutions:**
- AdminLayout NextIntlClientProvider với dynamic messages loading
- Import path fixes: `../../../messages/${locale}.json`
- Error handling với fallback to Vietnamese

### **Phase 6.3: Dashboard i18n - COMPLETED**
**Features Implemented:**
- Statistics i18n - Total Members, Total Cards, Recent Members, Recent Cards
- Card Titles i18n - Members, Cards, Settings với emoji
- Descriptions i18n - Quản lý thành viên, Quản lý thẻ học, Cấu hình hệ thống
- Loading State i18n - "Loading dashboard data..." → `t('common.loading')`
- Component Architecture - Tách DashboardContent để fix context error

**Technical Solutions:**
- Component separation: DashboardPage → AdminLayout → DashboardContent
- Context hierarchy: NextIntlClientProvider → useTranslations
- 12 new translation keys cho dashboard

### **Translation Keys Summary:**
**Navigation (7 keys):** `dashboard`, `members`, `cards`, `settings`, `logout`, `adminPanel`, `language`
**Dashboard (12 keys):** `title`, `totalMembers`, `totalCards`, `recentMembers`, `recentCards`, `membersTitle`, `cardsTitle`, `settingsTitle`, `membersDescription`, `cardsDescription`, `settingsDescription`, `totalMembersCount`, `totalCardsCount`, `appSettings`
**Auth (8 keys):** `login`, `logout`, `username`, `password`, `email`, `adminLogin`, `adminNote`, `selectLanguage`, `language`

### **Working Routes:**
- `/vi/login` ✅ - Vietnamese login
- `/en/login` ✅ - English login  
- `/login` ✅ - Redirect to `/vi/login`
- `/vi/dashboard` ✅ - Vietnamese dashboard
- `/en/dashboard` ✅ - English dashboard

### **Language Switcher:**
- Login page: Select dropdown ✅
- Sidebar: Button switches ✅
- Navigation: Menu items ✅

## 🔧 Technical Solutions Summary

### **Context Hierarchy Pattern:**
```
Root Layout (NextIntlClientProvider)
├── Locale Layout (RefineWrapper)
│   └── AdminLayout (NextIntlClientProvider + messages)
│       └── Page Components (useTranslations)
```

### **Common Issues & Solutions:**

#### **1. NextIntlClientProvider Context Error**
**Problem:** `useTranslations` hook không tìm thấy context
**Solution:** 
- AdminLayout wrap với NextIntlClientProvider
- Dynamic messages loading với fallback
- Component separation (Server vs Client)

#### **2. Import Path Errors**
**Problem:** `Module not found: Can't resolve '../../messages'`
**Solution:**
- Login layout: `../../../../messages/${locale}.json`
- Admin layout: `../../../messages/${locale}.json`
- Relative path calculation từ component location

#### **3. Component Architecture**
**Problem:** Server components không thể sử dụng `useTranslations`
**Solution:**
- DashboardPage (Server) → AdminLayout → DashboardContent (Client)
- Context propagation đúng cách
- Không duplicate NextIntlClientProvider

### **Translation Key Structure:**
```json
{
  "namespace": {
    "key": "value"
  }
}
```

**Namespaces Used:**
- `common` - Loading, save, cancel, delete, edit, create, search, filter, error, success, confirm, yes, no
- `navigation` - dashboard, members, cards, settings, logout, adminPanel, language
- `auth` - login, logout, username, password, email, adminLogin, adminNote, selectLanguage, language
- `dashboard` - title, totalMembers, totalCards, recentMembers, recentCards, membersTitle, cardsTitle, settingsTitle, membersDescription, cardsDescription, settingsDescription, totalMembersCount, totalCardsCount, appSettings
- `errors` - required, invalidEmail, minLength, maxLength, networkError, serverError, unauthorized, notFound

## 📝 Best Practices

### 1. Translation Key Structure
```json
{
  "namespace": {
    "key": "value"
  }
}
```

### 2. Component Implementation
```typescript
"use client"
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('auth.adminLogin')}</h1>
    </div>
  );
}
```

### 3. Layout Implementation
```typescript
import { NextIntlClientProvider } from 'next-intl';

export default async function Layout({ children, params }) {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
```

## 🎯 Next Steps

1. **Phase 6.2**: Implement sidebar i18n
2. **Phase 6.3**: Implement dashboard i18n
3. **Phase 6.4**: Implement members page i18n
4. **Phase 6.5**: Implement cards page i18n
5. **Phase 6.6**: Implement settings page i18n

## 📚 References

- [Next.js i18n Documentation](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Ant Design CSS-in-JS](https://ant.design/docs/react/customize-theme#css-in-js)

---

**Last Updated**: January 2025
**Status**: Phase 6.1 Complete, Phase 6.2 In Progress
