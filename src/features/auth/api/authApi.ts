import api from "@/lib/api";

import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/auth";

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post(
    "auth/login/",
    data
  );

  return response.data;
}

export async function register(
  data: RegisterRequest
) {
  const response = await api.post(
    "auth/register/",
    data
  );

  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await api.get(
    "auth/me/"
  );

  return response.data;
}

export async function refreshToken(
  refresh: string
) {
  const response = await api.post(
    "auth/token/refresh/",
    {
      refresh,
    }
  );

  return response.data;
}


export async function forgotPassword(
  email: string
) {
  const response = await api.post(
    "auth/forgot-password/",
    {
      email,
    }
  );

  return response.data;
}


export async function resetPassword(
  uid: string,
  token: string,
  password: string
) {
  const response = await api.post(
    "auth/reset-password/",
    {
      uid,
      token,
      password,
    }
  );

  return response.data;
}