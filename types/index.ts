// =====================================================
// TYPESCRIPT INTERFACES
// Định nghĩa các interface cho dự án trflashcard
// =====================================================

// Demo Member interface
export interface DemoMember {
  id: string;
  username: string;
  password?: string; // Không trả về trong API
  full_name?: string;
  status: number; // 1: hoạt động, 0: không hoạt động
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  deleted_by?: string;
}

// Demo Card interface
export interface DemoCard {
  id: string;
  member_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  deleted_by?: string;
}

// Demo System Config interface
export interface DemoSystemConfig {
  id: string;
  config_key: string;
  config_value: string;
  created_at: string;
}

// API Response interfaces
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginationInfo {
  page: number;
  size: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// Authentication interfaces
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  member: DemoMember;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  token: string;
  refresh_token: string;
}

// Dashboard interfaces
export interface DashboardStats {
  total_members: number;
  total_cards: number;
  recent_members: number;
  recent_cards: number;
}

// Form interfaces
export interface DemoMemberFormData {
  username: string;
  password?: string;
  full_name?: string;
  status: number;
}

export interface DemoCardFormData {
  title: string;
  content: string;
  member_id: string;
}

// Error interface
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Language interface
export interface Language {
  code: string;
  name: string;
  flag: string;
}

// Navigation interface
export interface NavItem {
  key: string;
  label: string;
  icon?: string;
  path: string;
  children?: NavItem[];
}
