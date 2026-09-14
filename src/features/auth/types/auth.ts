export interface User {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}