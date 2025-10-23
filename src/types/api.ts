// API Request/Response Types

// Authentication Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    member: {
      id: string;
      username: string;
      full_name: string;
    };
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: 'Bearer';
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface RefreshResponse {
  success: boolean;
  data?: {
    member: {
      id: string;
      username: string;
      full_name: string;
    };
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: 'Bearer';
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  data?: {
    message: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

// Member Types
export interface MemberProfile {
  id: string;
  username: string;
  full_name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface MemberProfileResponse {
  success: boolean;
  data?: MemberProfile;
  error?: {
    code: string;
    message: string;
  };
}

// Card Types
export interface Card {
  id: string;
  member_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CardCreateRequest {
  title: string;
  content: string;
}

export interface CardUpdateRequest {
  title?: string;
  content?: string;
}

export interface CardListResponse {
  success: boolean;
  data?: {
    cards: Card[];
    total: number;
    page: number;
    limit: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface CardResponse {
  success: boolean;
  data?: Card;
  error?: {
    code: string;
    message: string;
  };
}

// Common Error Types
export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
