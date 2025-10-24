# API Testing Guide

## 📋 Overview

This guide provides comprehensive testing instructions for all TR Flashcard APIs including authentication, member management, and card operations.

## 🔐 Authentication APIs

### **1. Member Registration**

**Endpoint:** `POST /api/members/register`

```http
POST /api/members/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass123",
  "full_name": "Test User"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "member": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "testuser",
      "full_name": "Test User",
      "status": true,
      "created_at": "2025-10-22T11:00:00Z",
      "updated_at": "2025-10-22T11:00:00Z"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 3600
    }
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "USERNAME_EXISTS",
    "message": "Username đã tồn tại"
  }
}
```

### **2. Member Login**

**Endpoint:** `POST /api/auth/login`

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass123"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "member": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "testuser",
      "full_name": "Test User",
      "status": true
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 3600
    }
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Username hoặc password không đúng"
  }
}
```

### **3. Token Refresh**

**Endpoint:** `POST /api/auth/refresh`

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 3600
    }
  }
}
```

### **4. Logout**

**Endpoint:** `POST /api/auth/logout`

```http
POST /api/auth/logout
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

### **5. Change Password**

**Endpoint:** `POST /api/members/change-password`

```http
POST /api/members/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "current_password": "testpass123",
  "new_password": "newpass456"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Đổi mật khẩu thành công"
}
```

## 📚 Card APIs

### **1. List Cards**

**Endpoint:** `GET /api/cards`

```http
GET /api/cards?page=1&limit=10&search=test&sort=created_at.desc
Authorization: Bearer <access_token>
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "Test Card",
        "content": "This is a test card",
        "created_at": "2025-10-22T11:00:00Z",
        "updated_at": "2025-10-22T11:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "total_pages": 1,
      "has_next": false,
      "has_prev": false
    }
  }
}
```

### **2. Get Card Details**

**Endpoint:** `GET /api/cards/:id`

```http
GET /api/cards/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <access_token>
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "card": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Test Card",
      "content": "This is a test card",
      "member_id": "member-uuid-from-token",
      "created_at": "2025-10-22T11:00:00Z",
      "updated_at": "2025-10-22T11:00:00Z"
    }
  }
}
```

### **3. Create Card**

**Endpoint:** `POST /api/cards`

```http
POST /api/cards
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "New Card",
  "content": "This is a new card content"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "card": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "New Card",
      "content": "This is a new card content",
      "member_id": "member-uuid-from-token",
      "created_at": "2025-10-22T11:00:00Z",
      "updated_at": "2025-10-22T11:00:00Z"
    }
  }
}
```

### **4. Update Card**

**Endpoint:** `PUT /api/cards/:id`

```http
PUT /api/cards/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated Card",
  "content": "This is updated card content"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "card": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Updated Card",
      "content": "This is updated card content",
      "member_id": "member-uuid-from-token",
      "created_at": "2025-10-22T11:00:00Z",
      "updated_at": "2025-10-22T11:00:00Z"
    }
  }
}
```

### **5. Delete Card**

**Endpoint:** `DELETE /api/cards/:id`

```http
DELETE /api/cards/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <access_token>
```

**Success Response:**
```json
{
  "success": true,
  "message": "Xóa card thành công"
}
```

## 🛠️ Testing Tools

### **Using cURL**

```bash
# Test Member Registration
curl -X POST https://trflashcard-74k1a8rti-tientns-projects.vercel.app/api/members/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123",
    "full_name": "Test User"
  }'

# Test Login
curl -X POST https://trflashcard-74k1a8rti-tientns-projects.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'

# Test Card Creation (replace TOKEN with actual access token)
curl -X POST https://trflashcard-74k1a8rti-tientns-projects.vercel.app/api/cards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "Test Card",
    "content": "This is a test card content"
  }'
```

### **Using Postman**

1. **Create Collection**: "TR Flashcard API Tests"
2. **Set Base URL**: `https://trflashcard-74k1a8rti-tientns-projects.vercel.app`
3. **Add Environment Variables**:
   - `base_url`: `https://trflashcard-74k1a8rti-tientns-projects.vercel.app`
   - `access_token`: (will be set after login)
   - `refresh_token`: (will be set after login)

### **Using Thunder Client (VS Code)**

1. **Install Thunder Client** extension
2. **Create Collection**: "TR Flashcard API"
3. **Set Base URL**: `https://trflashcard-74k1a8rti-tientns-projects.vercel.app`
4. **Add Environment Variables**:
   - `base_url`: `https://trflashcard-74k1a8rti-tientns-projects.vercel.app`
   - `access_token`: (will be set after login)

## 🔍 Error Codes

### **Authentication Errors**
- `MISSING_TOKEN` - Access token is required
- `INVALID_TOKEN` - Access token is invalid or expired
- `INVALID_CREDENTIALS` - Username or password is incorrect
- `USERNAME_EXISTS` - Username already exists
- `MEMBER_NOT_FOUND` - Member not found

### **Card API Errors**
- `CARD_NOT_FOUND` - Card not found
- `UNAUTHORIZED` - Not authorized to access this card
- `MISSING_FIELDS` - Required fields are missing
- `TITLE_TOO_LONG` - Title exceeds maximum length
- `CONTENT_TOO_LONG` - Content exceeds maximum length

### **General Errors**
- `INTERNAL_ERROR` - Internal server error
- `VALIDATION_ERROR` - Request validation failed
- `RATE_LIMIT` - Too many requests

## 📝 Testing Workflow

### **1. Authentication Flow**
1. **Register** a new member
2. **Login** with credentials
3. **Save** access_token and refresh_token
4. **Test** token refresh
5. **Test** logout

### **2. Card Management Flow**
1. **Create** a new card
2. **List** all cards
3. **Get** card details
4. **Update** card
5. **Delete** card

### **3. Error Testing**
1. **Test** invalid credentials
2. **Test** expired tokens
3. **Test** missing fields
4. **Test** unauthorized access

## 🌐 Production URLs

- **Base URL**: `https://trflashcard-74k1a8rti-tientns-projects.vercel.app`
- **API Base**: `https://trflashcard-74k1a8rti-tientns-projects.vercel.app/api`

## 📚 Related Documentation

- **[Setup Guide](./SETUP.md)** - Project setup and configuration
- **[Authentication Guide](./authentication.md)** - Authentication system details
- **[Dev Log](./dev-log.md)** - Development issues and solutions
- **[README](../readme.MD)** - Project overview
